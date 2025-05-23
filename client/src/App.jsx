import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPaperclip } from "react-icons/fa";
function App() {
  const [messages, setMessages] = useState([
    { sender: "system", text: "You can start the chat now." },
  ]);
  const [input, setInput] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/messages", {
        message: input,
      });

      const botReply = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: "Error: Unable to get response." },
      ]);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const uploadPdf = async (e) => {
    e.preventDefault();
    if (!pdfFile) return alert("Please select a PDF file first.");

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("PDF uploaded successfully!");
      setPdfFile(null);
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to upload PDF.");
    }
  };

  const uploadPdfDirectly = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("pdf", file);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/upload-pdf",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("PDF uploaded successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to upload PDF.");
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4 gap-6">
      <div className="w-full max-w-md p-4 bg-white rounded-xl shadow-xl flex flex-col h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-xl text-indigo-600">DopaBot</span>
          </div>
        </div>

        {/* Chat messages */}
        <div className="overflow-y-auto flex-1 space-y-4 p-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end ${
                msg.sender === "user"
                  ? "justify-end"
                  : msg.sender === "bot"
                  ? "justify-start"
                  : "justify-center"
              }`}
            >
              {msg.sender !== "user" && msg.sender !== "system" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 flex items-center justify-center mr-2 shadow">
                  <span className="text-lg">🤖</span>
                </div>
              )}

              {msg.sender === "system" ? (
                <div className="text-center text-gray-500 w-full">
                  {msg.text}
                </div>
              ) : (
                <div
                  className={`p-3 rounded-lg text-sm max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-indigo-500 text-white ml-auto"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 via-teal-400 to-cyan-400 flex items-center justify-center ml-2 shadow">
                  <span className="text-lg">👤</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center mt-2">
          {/* Clip Icon to trigger hidden file input */}
          <label
            htmlFor="pdf-upload-hidden"
            className="p-3 cursor-pointer hover:bg-gray-200 rounded-l-md bg-white border border-r-0"
            title="Upload PDF"
          >
            <FaPaperclip />
          </label>

          {/* Hidden File Input */}
          <input
            id="pdf-upload-hidden"
            type="file"
            accept="application/pdf"
            onChange={uploadPdfDirectly}
            className="hidden"
          />

          {/* Message Input */}
          <textarea
            className="flex-1 p-2 border-t border-b border-gray-300 outline-none resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Send a message..."
            rows={1}
          />

          {/* Send Button */}
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-r-md"
            onClick={sendMessage}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </div>

      {/* PDF Upload */}
      {/* <form
        onSubmit={uploadPdf}
        className="flex flex-col items-start gap-2 bg-white p-4 rounded-xl shadow-xl"
      >
        <label className="font-semibold" htmlFor="pdf-upload">
          Upload PDF
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handlePdfChange}
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md"
        >
          Upload PDF
        </button>
      </form> */}
    </div>
  );
}

export default App;
