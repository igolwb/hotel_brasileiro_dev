import { generateAPIUrl } from '@/utils/utils';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { useState } from 'react';
import { View, TextInput, ScrollView, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/header';

export default function App() {
  const [input, setInput] = useState('');
  const { messages, error, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl('/api/chat'),
    }),
    onError: error => console.error(error, 'ERROR'),
  });

  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.chatContainer}>
        <ScrollView style={styles.messagesContainer}>
          {messages.map(m => (
            <View key={m.id} style={styles.messageWrapper}>
              <View>
                <Text style={styles.messageRole}>{m.role}</Text>
                {m.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return <Text key={`${m.id}-${i}`} style={styles.messageText}>{part.text}</Text>;
                  }
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem...."
            value={input}
            onChange={e => setInput(e.nativeEvent.text)}
            onSubmitEditing={e => {
              e.preventDefault();
              sendMessage({ text: input });
              setInput('');
            }}
            autoFocus={true}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => {
            sendMessage({ text: input });
            setInput('');
          }}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13293D',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 8,
  },
  messageWrapper: {
    marginVertical: 8,
  },
  messageRole: {
    fontWeight: '700',
    color: '#fff',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#142c42',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#006494',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});