
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai"; // Only type import for response
import { ChatMessageData, MessageRole } from './types';
import ChatMessageItem from './components/ChatMessageItem';
import ChatInput from './components/ChatInput';
import SparkleIcon from './components/icons/SparkleIcon';
// LoadingDots is imported by ChatMessageItem and ChatInput if needed

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true until init attempt
  const [error, setError] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [activeAiMessageId, setActiveAiMessageId] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    if (!apiKey) {
      const keyErrorMsg = "CRITICAL: API Key is not configured. Please check index.html.";
      console.error(keyErrorMsg);
      setError(keyErrorMsg);
      setMessages([{
        id: Date.now(),
        role: MessageRole.AI,
        text: "Configuration Error: The API Key is missing. The application cannot contact the AI service. Please ensure the API key is correctly set in index.html.",
        timestamp: new Date()
      }]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash-preview-04-17',
      });
      setChatSession(newChat);
      setMessages([{
        id: Date.now(),
        role: MessageRole.AI,
        text: "Hello! I'm your Gemini-powered assistant. How can I help you today?",
        timestamp: new Date()
      }]);
      setError(null); 
    } catch (e: any) {
      const initErrorMsg = `Failed to initialize AI. Please check your API key's validity, model access, and network connection. Details: ${e.message || 'Unknown error'}`;
      console.error("Failed to initialize Gemini AI:", e);
      setError(initErrorMsg);
       setMessages([{
        id: Date.now(),
        role: MessageRole.AI,
        text: `Error initializing AI: ${e.message || 'Unknown error'}. This could be due to an invalid API key, network issues, or service misconfiguration. Please check the browser console for more details.`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]); 

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (prompt: string) => {
    if (!prompt.trim() || isLoading || !chatSession) return;

    setIsLoading(true);
    // Keep previous general error until successful send, or let new error overwrite
    // setError(null); // Clear previous general error if you want a clean slate for each send

    const userMessage: ChatMessageData = {
      id: Date.now(),
      role: MessageRole.USER,
      text: prompt,
      timestamp: new Date(),
    };
    
    const newAiMessageId = Date.now() + 1; 
    setActiveAiMessageId(newAiMessageId);

    setMessages(prevMessages => [
      ...prevMessages, 
      userMessage,
      { id: newAiMessageId, role: MessageRole.AI, text: '', timestamp: new Date() } 
    ]);
    
    let accumulatedResponseText = '';

    try {
      const stream: AsyncIterable<GenerateContentResponse> = await chatSession.sendMessageStream({ message: prompt });
      setError(null); // Clear error if stream starts successfully
      for await (const chunk of stream) {
        if (chunk.text) {
          accumulatedResponseText += chunk.text;
          setMessages(prevMessages =>
            prevMessages.map(msg =>
              msg.id === newAiMessageId ? { ...msg, text: accumulatedResponseText } : msg
            )
          );
        }
      }
    } catch (e: any) {
      console.error("Error sending message to Gemini:", e);
      const errorMessage = `Sorry, I encountered an error: ${e.message || 'Unknown API error'}`;
      setError(errorMessage); 
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === newAiMessageId ? { ...msg, text: errorMessage, role: MessageRole.AI } : msg
        )
      );
    } finally {
      setIsLoading(false);
      setActiveAiMessageId(null);
    }
  }, [isLoading, chatSession]); // `setError` is stable from useState

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  const errorAlreadyInLastMessage = error && lastMessage && lastMessage.role === MessageRole.AI && lastMessage.text.includes(error);
  const showBannerError = error && !errorAlreadyInLastMessage;


  return (
    <div className="flex flex-col h-screen bg-slate-800 text-slate-100">
      <header className="bg-slate-900 p-4 shadow-md flex items-center space-x-2 fixed top-0 left-0 right-0 z-20">
        <SparkleIcon className="w-8 h-8 text-pink-400" />
        <h1 className="text-xl font-semibold text-slate-50">Gemini Simple Chat</h1>
      </header>

      {showBannerError && (
        <div className="bg-red-500 text-white p-3 text-center fixed top-16 left-0 right-0 z-10 flex justify-between items-center">
          <p>{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="ml-2 p-1 px-2 text-xs bg-red-700 hover:bg-red-800 rounded"
            aria-label="Dismiss error"
          >
            Dismiss
          </button>
        </div>
      )}

      <div 
        ref={chatContainerRef} 
        className={`flex-grow p-6 overflow-y-auto space-y-4 bg-slate-700 mt-16 ${showBannerError ? 'pt-12' : ''}`} // Adjusted padding for fixed header and potential banner
      >
        {messages.map((msg) => (
          <ChatMessageItem 
            key={msg.id} 
            message={msg} 
            isActiveStreamTarget={msg.id === activeAiMessageId}
          />
        ))}
        {/* If initial loading is true and no messages yet, you could show a full page loader */}
        {isLoading && messages.length === 0 && !error && (
             <div className="flex justify-center items-center h-full">
                <p>Initializing AI, please wait...</p> {/* Or a spinner component */}
             </div>
        )}
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
