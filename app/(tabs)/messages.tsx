import Loading from '@components/Loading';
import { hashObject } from '@helpers/func';
import { Conversation, Message } from '@models/Messages';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { db } from '../../firebaseConfig';
import { useAuth } from '../../providers/authProvider';
import { useFireStore } from '../../providers/fireStoreProvider';

export default function Profile() {
  const fire = useFireStore();
  const { conversation } = fire;
  const authProvider = useAuth();
  const _FILE = 'profile.tsx';

  const { user } = authProvider;
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(conversation?.messages ?? []);

  const init = async () => {
    if (!conversation) {
      const c = await fire.getMessages(authProvider.user!);
      setMessages([...c!.messages!]);
      return;
    }

    setMessages([...conversation?.messages!]);
  };

  const handleSend = () => {
    if (text.trim() !== '') {
      setText('');
      setMessages([
        ...messages,
        { message: text, senderUid: authProvider.user!.uid, timestamp: new Date() },
      ]);
      fire.sendMessage(text, authProvider.user!, [fire.trainer?.uid!, user?.uid!]);
    }
  };

  const ChatBubble = ({ message }: { message: Message }) => {
    const userSent = message.senderUid === authProvider.user?.uid;

    if (userSent) {
      return (
        <View style={styles.chatBubble}>
          <Text>{message.message}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.chatBubbleLeft}>
          <Text style={styles.blackText}>{message.message}</Text>
        </View>
      );
    }
  };

  useMemo(() => {
    init();
  }, []);

  useEffect(() => {
    if (conversation?.id) {
      onSnapshot(doc(db, 'Messages', conversation.id!), (doc) => {
        console.log(`Conversation updated at ${new Date().toString()}`);
        setMessages([...(doc.data()!.messages as Message[])]);
        return doc.data() as Conversation;
      });
    }
  }, []);

  if (!user || !messages || !conversation) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <FlatList
        style={styles.messageContainer}
        data={messages}
        keyExtractor={(message) => hashObject(message).toString()}
        renderItem={({ item }) => <ChatBubble message={item} />}
      />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  messageContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    color: 'white',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    color: 'white',
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
  },
  chatBubble: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    maxWidth: '80%',
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  chatBubbleLeft: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  chatBubbleText: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
});
