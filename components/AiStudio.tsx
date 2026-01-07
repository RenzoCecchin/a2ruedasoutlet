import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage, generateMotoImage } from '../services/geminiService';
import { ChatMessage, ChatRole, ImageSize } from '../types';

const AiStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'design'>('chat');

  return (
    <section id="ai-studio" className="py-20 bg-black text-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-moto-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4">MotoElite AI Studio</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Utiliza nuestra inteligencia artificial para consultar sobre repuestos o visualizar tu próximo estilo.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl min-h-[600px] flex flex-col md:flex-row">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 bg-zinc-950 p-6 border-r border-zinc-800 flex flex-row md:flex-col gap-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 md:flex-none flex items-center p-3 rounded-lg transition-all ${
                activeTab === 'chat' ? 'bg-moto-green text-white font-bold' : 'text-gray-400 hover:bg-zinc-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              Asistente
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`flex-1 md:flex-none flex items-center p-3 rounded-lg transition-all ${
                activeTab === 'design' ? 'bg-moto-green text-white font-bold' : 'text-gray-400 hover:bg-zinc-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Diseñador
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6">
            {activeTab === 'chat' ? <ChatInterface /> : <ImageGenInterface />}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Sub Components ---

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: ChatRole.MODEL, text: '¡Hola! Soy tu asistente de MotoElite. ¿Buscás repuestos para Voge, Benelli o indumentaria técnica?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: ChatRole.USER, text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    history.push({ role: ChatRole.USER, text: userMsg.text });

    const replyText = await sendChatMessage(userMsg.text, history);
    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: ChatRole.MODEL, text: replyText, timestamp: new Date() };
    
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === ChatRole.USER 
                ? 'bg-moto-green text-white rounded-br-none' 
                : 'bg-zinc-800 text-gray-200 rounded-bl-none'
            }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-zinc-800 rounded-2xl px-4 py-3 rounded-bl-none flex space-x-2 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribí tu consulta..."
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-moto-green focus:ring-1 focus:ring-moto-green"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-moto-green hover:bg-moto-greenDark text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ImageGenInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const img = await generateMotoImage(prompt, size);
      setGeneratedImage(img);
    } catch (error) {
      alert("Error generating image. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {!generatedImage && !isGenerating && (
        <div className="w-full max-w-md space-y-6">
           <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto text-moto-green mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Diseña tu Estilo</h3>
              <p className="text-gray-400 text-sm">Visualiza gráficas, combinaciones de colores o accesorios en tu moto.</p>
           </div>

           <div className="space-y-4">
             <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Una moto deportiva negra con lineas verdes neón estilo futurista..."
                className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white resize-none focus:border-moto-green focus:ring-1 focus:ring-moto-green"
             />
             
             <div className="flex gap-4 items-center">
               <select 
                 value={size} 
                 onChange={(e) => setSize(e.target.value as ImageSize)}
                 className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white"
               >
                 <option value="1K">1K (Standard)</option>
                 <option value="2K">2K (High Res)</option>
                 <option value="4K">4K (Ultra)</option>
               </select>

               <button 
                onClick={handleGenerate}
                className="flex-1 bg-moto-green hover:bg-moto-greenDark text-white font-bold py-3 px-6 rounded-lg transition-colors"
               >
                 Generar Visualización
               </button>
             </div>
           </div>
        </div>
      )}

      {isGenerating && (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-moto-green border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300 animate-pulse">Creando tu diseño...</p>
        </div>
      )}

      {generatedImage && (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <div className="relative max-h-[400px] w-auto overflow-hidden rounded-xl shadow-2xl border border-zinc-700 mb-6 group">
            <img src={generatedImage} alt="Generated Moto" className="w-full h-full object-contain" />
            <a href={generatedImage} download="moto_design.png" className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </a>
          </div>
          <button 
            onClick={() => { setGeneratedImage(null); setPrompt(''); }}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            Crear otro diseño
          </button>
        </div>
      )}
    </div>
  );
};

export default AiStudio;