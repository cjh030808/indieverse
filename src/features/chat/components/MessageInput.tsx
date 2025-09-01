'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Send, Smile, Plus, X } from 'lucide-react';
import { ChatMessage } from '@/types/chat';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (content: string, type?: ChatMessage['type'], replyTo?: string) => void;
  canSendMessage: boolean;
  isSending: boolean;
  replyTo?: { id: string; senderName: string; content: string };
  onCancelReply?: () => void;
  placeholder?: string;
  className?: string;
}

export function MessageInput({
  onSendMessage,
  canSendMessage,
  isSending,
  replyTo,
  onCancelReply,
  placeholder = "메시지를 입력하세요...",
  className
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || !canSendMessage || isSending) return;

    onSendMessage(trimmedMessage, 'text', replyTo?.id);
    setMessage('');
    
    if (onCancelReply) {
      onCancelReply();
    }

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const commonEmojis = ['😀', '😂', '🥰', '😍', '🤔', '😢', '😭', '😡', '👍', '👎', '❤️', '🎵', '🎶', '🎸', '🥁', '🎤'];

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  return (
    <div className={cn('border-t border-gray-200 bg-white', className)}>
      {/* Reply indicator */}
      {replyTo && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">답장:</span>
              <span className="text-sm font-medium text-gray-900">
                {replyTo.senderName}
              </span>
              <span className="text-sm text-gray-500 truncate max-w-xs">
                {replyTo.content}
              </span>
            </div>
            {onCancelReply && (
              <button
                onClick={onCancelReply}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {commonEmojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                className="p-2 hover:bg-gray-200 rounded text-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4">
        <div className="flex items-end gap-3">
          {/* Additional options button */}
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            title="추가 옵션"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Message input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={canSendMessage ? placeholder : "연결 중..."}
              disabled={!canSendMessage}
              className={cn(
                "w-full resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
                "min-h-[40px] max-h-[120px]",
                !canSendMessage && "bg-gray-100 cursor-not-allowed"
              )}
              rows={1}
            />
            
            {/* Character count */}
            {message.length > 0 && (
              <div className="absolute bottom-1 right-2 text-xs text-gray-400">
                {message.length}/2000
              </div>
            )}
          </div>

          {/* Emoji button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={cn(
              "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0",
              showEmojiPicker && "bg-gray-100 text-gray-700"
            )}
            title="이모지"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSendMessage || !message.trim() || isSending}
            className={cn(
              "p-2 rounded-full transition-colors flex-shrink-0",
              canSendMessage && message.trim() && !isSending
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
            title="전송"
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>
            {canSendMessage ? (
              "Enter로 전송, Shift+Enter로 줄바꿈"
            ) : (
              "연결 중..."
            )}
          </span>
          
          {replyTo && (
            <span>답장 모드</span>
          )}
        </div>
      </div>
    </div>
  );
}