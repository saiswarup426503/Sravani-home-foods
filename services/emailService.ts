import type { Order } from '../types';
import { ai } from './geminiService';

/**
 * Generates a prompt for the Gemini API to create an HTML email body.
 * @param order - The order details.
 * @returns A string prompt.
 */
const createEmailPrompt = (order: Order): string => {
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
        Subject: New Order Notification: ${order.id}

        Generate a professional and clean HTML email body for a restaurant owner notifying them of a new order.
        Do not include the subject line in the output, only the HTML body.
        
        The email should be styled with inline CSS for maximum compatibility. 
        Use a warm, food-themed color palette (e.g., oranges, browns, creams).
        The main content area should have a max-width of 600px and be centered.

        Here are the order details to include:
        - Order ID: ${order.id}
        - Date: ${order.date}
        - Customer Name: ${order.customerDetails.name}
        - Customer Phone: ${order.customerDetails.phone}
        - Customer Email: ${order.customerDetails.email || 'Not provided'}
        - Order Type: ${order.customerDetails.type}
        - Special Instructions: ${order.specialInstructions || 'None'}
        - Total Amount: ${order.total}
        
        The items ordered are:
        ${itemsListHtml}
        
        The structure should be:
        1. A welcoming header like "You've Received a New Order!".
        2. A clear summary of the order details.
        3. A table for the items list with columns: "Item", "Quantity", and "Price".
        4. The total amount displayed prominently at the end.
        5. A concluding sentence, for example, "Please start preparing the order at your earliest convenience."
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

    const prompt = createEmailPrompt(order);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const emailHtml = response.text;
        
        console.groupCollapsed(`[Email Simulation] New Order: ${order.id}`);
        console.log(`From: system@sravanihomefoods.com`);
        console.log(`To: pamminasaiswarup@gmail.com`);
        console.log(`Subject: New Order Notification: ${order.id}`);
        console.log("--- Email Body (HTML) ---");
        console.log(emailHtml);
        console.groupEnd();
        
        alert("Order placed successfully! (Email notification has been simulated in the developer console)");

    } catch (error) {
        console.error("Gemini API error while generating email:", error);
        // Fallback to a plain text log if Gemini fails
        console.groupCollapsed(`[Email Simulation - FALLBACK] New Order: ${order.id}`);
        console.log("The AI email generator failed. Here are the raw order details:");
        console.log(JSON.stringify(order, null, 2));
        console.groupEnd();
        alert("Order placed successfully! (AI email generation failed, check console for details)");
    }
};
