import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask the AI Assistant..."
          className="flex-grow"
        />
        <Button onClick={handleSend} className="ml-2">Send</Button>
      </div>
    </div>
  );
};