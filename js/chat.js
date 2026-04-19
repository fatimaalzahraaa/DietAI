const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getMockResponse(userMessage) {
    // Simple logic to vary responses
    const templates = [
        `How about making a healthy salad with ${userMessage}?`,
        `You can cook a tasty dish using ${userMessage}.`,
        `Try adding ${userMessage} to your breakfast bowl!`,
        `A smoothie with ${userMessage} would be perfect.`,
        `I suggest a light stir-fry using ${userMessage}.`
    ];
    // Pick random template
    return templates[Math.floor(Math.random() * templates.length)];
}

function simulateTyping(responseText) {
    return new Promise((resolve) => {
        const typingMsg = document.createElement("div");
        typingMsg.classList.add("message", "bot");
        chatBox.appendChild(typingMsg);

        let i = 0;
        const interval = setInterval(() => {
            typingMsg.textContent += responseText.charAt(i);
            i++;
            chatBox.scrollTop = chatBox.scrollHeight;
            if (i >= responseText.length) {
                clearInterval(interval);
                resolve();
            }
        }, 30);
    });
}

async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user"); 
    userInput.value = "";

    const botResponse = getMockResponse(text); 
    await simulateTyping(botResponse); 
}


sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
});
