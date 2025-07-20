const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());

// Prompt-response pairs (as in your original code)
const promptResponses = [
  {
    prompts: ["hello", "hi", "namaste", "hey"],
    reply: "Namaste! Welcome to Legends of Bharat. Ask me about any famous Indian personality!"
  },
  {
    prompts: ["who is apj abdul kalam", "tell me about kalam", "missile man"],
    reply: "Dr. A.P.J. Abdul Kalam was the 11th President of India and a renowned scientist, known as the Missile Man of India."
  },
  {
    prompts: ["who is mahatma gandhi", "tell me about gandhi", "father of the nation"],
    reply: "Mahatma Gandhi led India's freedom movement with non-violence and is celebrated as the Father of the Nation."
  },
  {
    prompts: ["who is sachin tendulkar", "tell me about sachin", "god of cricket"],
    reply: "Sachin Tendulkar is regarded as one of the greatest cricketers in history, often called the God of Cricket."
  }
];

// Inspiring stories
const stories = [
  "As a child, Dr. APJ Abdul Kalam would wake up at 4am to deliver newspapers before school, showing his dedication and work ethic from a young age.",
  "When Mahatma Gandhi was thrown off a train in South Africa for being non-white, he decided to fight injustice with non-violence, which became his lifelong mission.",
  "Sachin Tendulkar played a World Cup match the day after his father's funeral, scoring a century and dedicating it to his late father.",
  "Rani Lakshmibai fought bravely against the British, even after being wounded, carrying her child on her back and inspiring generations.",
  "Homi Bhabha once famously convinced the Indian government to invest in nuclear research, laying the foundation for India's atomic energy program."
];

// Fun facts
const facts = [
  "Dr. Kalam never owned a television and preferred reading and writing in his free time.",
  "Mahatma Gandhi was nominated for the Nobel Peace Prize five times but never won.",
  "Sachin Tendulkar was a ball boy during the 1987 Cricket World Cup before he became a cricket legend.",
  "Rabindranath Tagore not only wrote India's national anthem but also composed the national anthem of Bangladesh.",
  "Mother Teresa’s birth name was Agnes Gonxha Bojaxhiu."
];

// Celebrity jokes/roasts (light-hearted)
const jokes = [
  "Sachin Tendulkar scored so many runs, even calculators get tired counting them!",
  "If APJ Abdul Kalam was the 'Missile Man', my exam results are definitely a failed launch.",
  "Mahatma Gandhi walked so much, even today’s fitness trackers would run out of battery.",
  "Rabindranath Tagore wrote so many poems, even Google Docs would ask him to upgrade storage.",
  "If Rani Lakshmibai had a LinkedIn, her skills would include 'Horse Riding' and 'Beating the British'."
];

// Fallback reply
const defaultReply = "Sorry, I don't have information on that. Please ask about another Indian personality, or try typing 'stories', 'facts', or 'jokes'!";

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

app.get("/", (req, res) => {
  res.send("BharatBot v2 backend is running!");
});

app.post("/chat", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.json({ reply: "Please type a message!" });
  }
  const userMsg = message.toLowerCase();

  // Check for stories
  if (userMsg.includes("story") || userMsg.includes("stories")) {
    return res.json({ reply: getRandom(stories) });
  }

  // Check for facts
  if (userMsg.includes("fact") || userMsg.includes("facts")) {
    return res.json({ reply: getRandom(facts) });
  }

  // Check for jokes
  if (userMsg.includes("joke") || userMsg.includes("jokes")) {
    return res.json({ reply: getRandom(jokes) });
  }

  // Otherwise, use prompt-response pairs
  let reply = defaultReply;
  for (const pair of promptResponses) {
    if (pair.prompts.some(p => userMsg.includes(p))) {
      reply = pair.reply;
      break;
    }
  }

  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Chatbot backend running on http://localhost:${PORT}`);
});