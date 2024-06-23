// components/ChatGPT.tsx

import { useState } from 'react';
import { Box, Button, Input, Textarea, Text } from '@chakra-ui/react';
import styles from "../styles/Home.module.css";
import ErrorComponent from "../components/Error";
const ChatGPT = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch("/api/chatgpt", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.choices[0].text);
    } catch (err) {
      setError("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.ai}>
     
      <Button onClick={handleSubmit} colorScheme="purple" size="lg" isLoading={loading}>
        Explain the Transaction
      </Button>
      {response && (
        <Box className="mt-4">
          <Text fontSize="xl">Response:</Text>
          <Text>{response}</Text>
        </Box>
      )}
      {error && 
     (
        <Box className="mt-4">
           <Text color="red.500">{error}</Text>
       </Box>
      ) }
    </Box>
  );
};

export default ChatGPT;
