// Handles chatbot toggle, messaging UI, and backend communication

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const chatMessages = document.getElementById("chat-messages");

  toggleBtn.addEventListener("click", () => {
    chatbox.classList.toggle("hidden");
  });

  sendBtn.addEventListener("click", sendChat);
  chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendChat();
  });

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.style.margin = "5px 0";
    msg.style.textAlign = sender === "user" ? "right" : "left";
    msg.innerHTML = `<b>${sender === "user" ? "You" : "BharatGPT"}:</b> ${text}`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendChat() {
    const question = chatInput.value.trim();
    if (!question) return;

    addMessage(question, "user");
    chatInput.value = "";

    try {
      const res = await fetch("http://localhost:4001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      });
      const data = await res.json();
      addMessage(data.reply, "bot");
    } catch (err) {
      addMessage("⚠️ Error reaching the assistant.", "bot");
    }
  }
});