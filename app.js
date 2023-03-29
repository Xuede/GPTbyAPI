const apiKey = "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";
const chatbox = document.getElementById("chatbox");
const inputForm = document.getElementById("input-form");
const userInput = document.getElementById("user-input");

const conversationHistory = [
    {
        role: "system",
        content: "you are a super duper friend.",
    },
];

inputForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;
    userInput.value = "";

    conversationHistory.push({ role: "user", content: message });
    appendMessage("You", message);

    const requestBody = {
        model: "gpt-4",
        messages: conversationHistory,
    };

    const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;
    conversationHistory.push({ role: "assistant", content: assistantMessage });
    appendMessage("Super Duper Friend", assistantMessage);
});

function appendMessage(sender, message) {
    const messageContainer = document.createElement("div
