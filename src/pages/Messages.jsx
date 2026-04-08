import { useState } from 'react';
import { Send, Search, Calendar, Video, MoreVertical } from 'lucide-react';
import { conversations } from '../data/messages';

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState({});

  const getMessages = (convo) => {
    return [...convo.messages, ...(localMessages[convo.id] || [])];
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      sender: "Sarah Chen",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      isMe: true
    };
    setLocalMessages(prev => ({
      ...prev,
      [activeConvo.id]: [...(prev[activeConvo.id] || []), msg]
    }));
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-3xl font-bold text-sbu-black mb-6">Messages</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex h-[600px] overflow-hidden">
        {/* Conversation List */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sbu-medium-gray" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:ring-2 focus:ring-sbu-red/20 focus:bg-white border border-transparent focus:border-sbu-red"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map(convo => (
              <div
                key={convo.id}
                onClick={() => setActiveConvo(convo)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                  activeConvo.id === convo.id ? 'bg-sbu-red/5 border-l-3 border-sbu-red' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <img src={convo.participant.avatar} alt={convo.participant.name} className="w-10 h-10 rounded-full bg-gray-100" />
                  {convo.participant.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-sbu-black truncate">{convo.participant.name}</span>
                    <span className="text-xs text-sbu-medium-gray">{convo.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-sbu-dark-gray truncate">{convo.lastMessage}</p>
                    {convo.unread > 0 && (
                      <span className="ml-2 w-5 h-5 bg-sbu-bright-red text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {convo.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img src={activeConvo.participant.avatar} alt="" className="w-9 h-9 rounded-full bg-gray-100" />
              <div>
                <h3 className="font-semibold text-sbu-black text-sm">{activeConvo.participant.name}</h3>
                <p className="text-xs text-sbu-medium-gray">
                  {activeConvo.participant.role} {activeConvo.participant.online ? '· Online' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Schedule Meeting">
                <Calendar className="w-4 h-4 text-sbu-dark-gray" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Video Call">
                <Video className="w-4 h-4 text-sbu-dark-gray" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-sbu-dark-gray" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {getMessages(activeConvo).map(msg => (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.isMe ? 'order-2' : ''}`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isMe
                      ? 'bg-sbu-red text-white rounded-br-md'
                      : 'bg-gray-100 text-sbu-black rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-xs text-sbu-medium-gray mt-1 ${msg.isMe ? 'text-right' : ''}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-sbu-red/20 focus:border-sbu-red"
              />
              <button
                onClick={handleSend}
                className="bg-sbu-red text-white p-2.5 rounded-xl hover:bg-sbu-bright-red transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
