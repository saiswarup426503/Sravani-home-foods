import type { Order } from '../types';
import { ai } from './geminiService';

/**
 * Generates a simple HTML email body for the order.
 * @param order - The order details.
 * @returns A string HTML.
 */
const createEmailHtml = (order: Order): string => {
    const itemsListHtml = order.items
        .map(item => `
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${item.price}</td>
            </tr>
        `)
        .join('');

    return `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #fdfcf9; padding: 20px; border: 1px solid #ddd;">
            <h1 style="color: #d2691e; text-align: center;">You've Received a New Order!</h1>
            <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <h2 style="color: #333;">Order Details</h2>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Customer Name:</strong> ${order.customerDetails.name}</p>
                <p><strong>Customer Phone:</strong> ${order.customerDetails.phone}</p>
                <p><strong>Customer Email:</strong> ${order.customerDetails.email || 'Not provided'}</p>
                <p><strong>Order Type:</strong> ${order.customerDetails.type}</p>
                ${order.customerDetails.type === 'Delivery' ? `<p><strong>Delivery Address:</strong> ${order.customerDetails.address || 'Not provided'}</p>` : ''}
                <p><strong>Special Instructions:</strong> ${order.specialInstructions || 'None'}</p>
                <h3 style="color: #333; margin-top: 20px;">Items Ordered</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f4f4f4;">
                            <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Item</th>
                            <th style="padding: 8px; text-align: center; border-bottom: 1px solid #ddd;">Quantity</th>
                            <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsListHtml}
                    </tbody>
                </table>
                <p style="font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; color: #d2691e;">Total Amount: ${order.total}</p>
            </div>
            <p style="text-align: center; margin-top: 20px; color: #666;">Please start preparing the order at your earliest convenience.</p>
        </div>
    `;
};


/**
 * Generates and 'sends' a simulated email notification for a new order.
 * In a real application, this function would use a service like SendGrid, AWS SES,
 * or an internal backend API to dispatch the email. Here, we simulate it by
 * generating the email content with the Gemini API and logging it to the console.
 *
 * @param order The order object containing all necessary details.
 */
export const sendOrderConfirmationEmail = async (order: Order): Promise<void> => {
    console.log(`Preparing email for order ${order.id}...`);

    const emailHtml = createEmailHtml(order);

    console.groupCollapsed(`[Email Simulation] New Order: ${order.id}`);
    console.log(`From: pamminasujanasri@gmail.com`);
    console.log(`To: pamminasaiswarup@gmail.com`);
    console.log(`Subject: New Order Notification: ${order.id}`);
    console.log("--- Email Body (HTML) ---");
    console.log(emailHtml);
    console.groupEnd();

    // Simulate SMS to owner's phone
    console.groupCollapsed(`[SMS Simulation] New Order: ${order.id}`);
    console.log(`To: 7013434594`);
    console.log(`Message: New order received! Order ID: ${order.id}, Total: ${order.total}, Customer: ${order.customerDetails.name}`);
    console.groupEnd();

    alert("Order placed successfully! (Email and SMS notifications have been simulated in the developer console)");
};
