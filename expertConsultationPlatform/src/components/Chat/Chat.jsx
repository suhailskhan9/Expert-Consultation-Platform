import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Emit the "user_connect" event to request chat history when the user connects
    socket.emit("user_connect_history", username , room);

    // Handle the "chat_history" event to display chat history
    socket.on("chat_history", (chatHistory) => {
      setMessageList(chatHistory);
    });

    // ... Other socket event handlers
  }, [socket, username]);

  const sendMessage = async () => {
    try {
      if (currentMessage !== "") {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          isUser: true,
          date: Date.now(),
        };

        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  const sendFile = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result;
        const fileName = selectedFile.name;

        socket.emit("send_file", {
          room,
          author: username,
          fileName,
          fileData,
          date: Date.now(),
        });
      };

      reader.readAsDataURL(selectedFile);
      // setSelectedFile(null);
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on("receive_file", (data) => {
      setMessageList((list) => [
        ...list,
        {
          room: data.room,
          author: data.author,
          message: data.message,
          fileName: data.fileName,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          isUser: false,
          date: Date.now(),
          isFile: true, // Add an "isFile" property to indicate it's a file
        },
      ]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("receive_file");
    };
  }, [socket]);

  const downloadFile = (fileData, fileName) => {
    const byteCharacters = atob(fileData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className={`message ${
                  username === messageContent.author ? "other" : "you"
                }`}
                key={messageContent.id}
              >
                <div>
                  <div className="message-content">
                    {messageContent.isFile ? (
                      <a
                        href="#"
                        onClick={() =>
                          downloadFile(messageContent.message, messageContent.fileName)
                        }                      >
                        {messageContent.fileName}
                      </a>
                    ) : (
                      <p>{messageContent.message}</p>
                    )}
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          className="chat-input"
          type="text"
          value={currentMessage}
          placeholder="message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <label htmlFor="fileInput" className="file-input-label">
          &#128206;
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".doc, .docx, .pdf, .ppt, .pptx, .key, .xls, .xlsx, .ods, .jpg, .jpeg, .png, .gif, .svg, .psd, .mp3, .wav, .aac, .mp4, .avi, .mov, .html, .xml, .css, .js, .py, .cpp"
          onChange={(event) => setSelectedFile(event.target.files[0])}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              sendFile();
            }
          }}
        />
        <button className="btn" onClick={() => { sendMessage(); sendFile(); }}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
