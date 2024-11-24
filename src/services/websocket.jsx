export const connectToChatSocket = (chatId, token, onMessageReceived) => {
  const socket = new WebSocket(`wss://vkedu-fullstack-div2.ru/connection/websocket/`);

  socket.onopen = () => {
    console.log("WebSocket соединение установлено");
    socket.send(JSON.stringify({ action: "subscribe", chatId, token }));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "new_message") {
      onMessageReceived(data.message);
    }
  };

  socket.onerror = (error) => {
    console.error("Ошибка WebSocket:", error);
  };

  socket.onclose = (event) => {
    if (event.code !== 1000) {
      console.error("WebSocket соединение закрыто с ошибкой:", event.reason);
    } else {
      console.log("WebSocket соединение закрыто");
    }
  };

  return socket;
};
