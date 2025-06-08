
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Messages = () => {
  // Mock data - TODO: Replace with API calls
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  
  const chatThreads = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      lastMessage: 'Thanks for the tutoring session!',
      timestamp: '2 hours ago',
      unread: 2,
      relatedService: 'Python Debugging Help'
    },
    {
      id: 2,
      name: 'Marcus Williams',
      avatar: 'MW',
      lastMessage: 'When would be a good time to meet?',
      timestamp: '1 day ago',
      unread: 0,
      relatedService: 'Essay Editing'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      avatar: 'ER',
      lastMessage: 'Perfect! See you at the library.',
      timestamp: '2 days ago',
      unread: 1,
      relatedService: 'Study Group - Chemistry'
    }
  ];

  const messages = {
    1: [
      {
        id: 1,
        senderId: 2,
        senderName: 'Sarah Chen',
        content: 'Hi! I saw your Python tutoring listing. Could you help me with debugging my project?',
        timestamp: '10:30 AM',
        isOwn: false
      },
      {
        id: 2,
        senderId: 1,
        senderName: 'You',
        content: 'Sure! I\'d be happy to help. What kind of issues are you running into?',
        timestamp: '10:35 AM',
        isOwn: true
      },
      {
        id: 3,
        senderId: 2,
        senderName: 'Sarah Chen',
        content: 'I\'m getting a weird error with my loops and I can\'t figure out what\'s wrong.',
        timestamp: '10:37 AM',
        isOwn: false
      },
      {
        id: 4,
        senderId: 1,
        senderName: 'You',
        content: 'No problem! Let\'s meet at the library tomorrow at 3 PM and I can take a look.',
        timestamp: '10:40 AM',
        isOwn: true
      },
      {
        id: 5,
        senderId: 2,
        senderName: 'Sarah Chen',
        content: 'Thanks for the tutoring session!',
        timestamp: '2 hours ago',
        isOwn: false
      }
    ]
  };

  const selectedThread = chatThreads.find(thread => thread.id === selectedChat);
  const currentMessages = selectedChat ? messages[selectedChat as keyof typeof messages] || [] : [];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // TODO: API call to send message
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-2">
            Chat with other students about your services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {chatThreads.map((thread) => (
                    <div
                      key={thread.id}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedChat === thread.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedChat(thread.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" />
                          <AvatarFallback>{thread.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{thread.name}</p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">{thread.timestamp}</span>
                              {thread.unread > 0 && (
                                <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                                  {thread.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{thread.lastMessage}</p>
                          <p className="text-xs text-primary mt-1">{thread.relatedService}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Conversation */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {selectedThread ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{selectedThread.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{selectedThread.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{selectedThread.relatedService}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {currentMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Message Input */}
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 min-h-[60px] resize-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button onClick={handleSendMessage} className="self-end">
                          Send
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="text-4xl mb-4">💬</div>
                    <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                    <p>Choose a chat from the list to start messaging</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
