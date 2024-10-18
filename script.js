/* script.js */
const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const messages = document.getElementById('messages');

// Evento para el botón de enviar
sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (userMessage) {
        addMessage('Usuario: ' + userMessage);
        userInput.value = '';
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": userMessage }]
            })
        });
        const data = await response.json();
        addMessage('ChatBot: ' + data.choices[0].message.content);
    }
});

// Función para agregar un mensaje al chat
function addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messages.appendChild(messageElement);
}

// Stripe payment function
async function makePayment() {
    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
    const response = await fetch('/create-checkout-session', {
        method: 'POST',
    });
    const session = await response.json();
    
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
        alert(result.error.message);
    }
}
