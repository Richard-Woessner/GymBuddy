import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Text, View } from '../../components/Themed';

export default function Profile() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://it3049c-chat.fly.dev/messages');
      const data = await response.json();

      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSend = () => {
    if (text.trim() !== '') {
      const newMessage: Message = {
        id: messages.length + 1,
        text: text,
        timestamp: new Date(),
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Display Messages */}
      <ScrollView ref={scrollViewRef} style={styles.messageContainer}>
        {messages.map((message) => (
          <View key={message.id} style={message.isUser ? styles.userMessageContainer : styles.otherMessageContainer}>
            <View style={message.isUser ? styles.userMessage : styles.otherMessage}>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
            <Text style={styles.timestamp}>{formatTimestamp(message.timestamp)}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input for typing messages */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={text}
          onChangeText={(value) => setText(value)}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface Message {
  id: number;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

const formatTimestamp = (timestamp: Date) => {
  if (!(timestamp instanceof Date)) {
    return '';
  }
  
  return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
  messageContainer: {
    flex: 1,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginVertical: 4,
    maxWidth: '70%',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 4,
    maxWidth: '70%',
  },
  userMessage: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  otherMessage: {
    backgroundColor: '#d8d8d8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
