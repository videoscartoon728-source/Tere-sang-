async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = inputField.value;

  if (!userMessage) return;

  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.innerText = userMessage;
  chatBox.appendChild(userDiv);
  inputField.value = "";

  const responseDiv = document.createElement("div");
  responseDiv.className = "message bot";
  responseDiv.innerText = "Typing...";
  chatBox.appendChild(responseDiv);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    responseDiv.innerText = data.choices[0].message.content;
  } catch (error) {
    responseDiv.innerText = "Error: " + error.message;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
      }
