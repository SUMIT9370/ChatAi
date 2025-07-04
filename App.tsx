import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai"; // Only type import for response
import { ChatMessageData, MessageRole } from './types';
import ChatMessageItem from './components/ChatMessageItem';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import AboutPage from './components/AboutPage';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// LoadingDots is imported by ChatMessageItem and ChatInput if needed

const BACKGROUND_IMAGE = '/brain-bg.jpg'; // Place the image in the public folder as brain-bg.jpg

const FONT_OPTIONS = [
  { label: 'Orbitron', value: 'Orbitron, sans-serif' },
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Default', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif' },
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true until init attempt
  const [error, setError] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [activeAiMessageId, setActiveAiMessageId] = useState<number | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.API_KEY;
  const [font, setFont] = useState(FONT_OPTIONS[0].value);
  const navigate = useNavigate();
  const location = useLocation();

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
        text: "Hello, I am ChatAi\nHow can I help you?",
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

  // Sidebar handlers
  const handleHome = () => navigate('/');
  const handleNewChat = () => {
    navigate('/');
    setMessages([
      {
        id: Date.now(),
        role: MessageRole.AI,
        text: "Hello, I am ChatAi\nHow can I help you?",
        timestamp: new Date()
      }
    ]);
  };
  const handleAbout = () => navigate('/about');
  const handleToggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <div className="flex h-screen text-slate-100 font-sans relative" style={{
      backgroundImage: `linear-gradient(rgba(19,19,20,0.92), rgba(19,19,20,0.92)), url('/brain-bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <Sidebar onHome={handleHome} onNewChat={handleNewChat} onAbout={handleAbout} collapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />
      <div className="flex flex-col flex-1 h-full">
        <Routes>
          <Route path="/" element={
            <>
              {/* Topbar */}
              <div className={`fixed ${sidebarCollapsed ? 'left-16' : 'left-56'} right-0 top-0 z-20 h-14 flex items-center justify-center bg-[#18181b]/80 backdrop-blur-md shadow-md transition-all duration-300`}>
                <span className="text-2xl font-bold tracking-wide text-white">ChatAi</span>
              </div>
              {showBannerError && (
                <div className={`bg-red-500 text-white p-3 text-center fixed ${sidebarCollapsed ? 'left-16' : 'left-56'} right-0 top-14 z-30 flex justify-between items-center transition-all duration-300`}>
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
                className={`flex-grow p-6 overflow-y-auto space-y-4 pt-8 ${showBannerError ? (sidebarCollapsed ? 'mt-24' : 'mt-24') : (sidebarCollapsed ? 'mt-14' : 'mt-14')}`}
              >
                {messages.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <h1 className="text-4xl font-medium text-slate-100">Hello, I am ChatAi</h1>
                    <p className="text-lg">How can I help you?</p>
                  </div>
                )}
                {messages.map((msg) => (
                  <ChatMessageItem 
                    key={msg.id} 
                    message={msg} 
                    isActiveStreamTarget={msg.id === activeAiMessageId}
                  />
                ))}
                {isLoading && messages.length === 0 && !error && (
                     <div className="flex justify-center items-center h-full">
                        <p>Initializing AI, please wait...</p>
                     </div>
                )}
              </div>
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
              <div className="w-full flex justify-center items-center pb-2">
                <span className="text-xs text-slate-400 text-center">developed by SUMit</span>
              </div>
              {/* Floating open sidebar button */}
              {sidebarCollapsed && (
                <button
                  className="fixed left-2 top-4 z-50 bg-[#23232a] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-[#23232a] hover:bg-[#18181b] transition-colors"
                  onClick={handleToggleSidebar}
                  aria-label="Open sidebar"
                >
                  <span className="text-2xl">≡</span>
                </button>
              )}
            </>
          } />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
