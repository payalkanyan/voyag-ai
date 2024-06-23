import axios from "axios";
import { useState } from "react";
import { Box, Button, Input, Text, UnorderedList, ListItem, StylesProvider } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
interface TransactionData {
  jsonrpc: string;
  errorCode?: number;
  errorMessage?: string;
  id: number;
}

export default function Block() {
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [blockHash, setBlockHash] = useState<string>(''); // State for block hash input

  const handleClick = async () => {
    try {
      const response = await axios.get<TransactionData>(`http://localhost:8000/transactionData?block_hash=${blockHash}`);
      const responseData = response.data;

      setTransactionData(responseData);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      setErrorMessage('Error fetching transaction data. See console for details.');
    }
  };

  return (
    <main className="p-8 font-sans">
      <Box className="mb-6">
        <Input
          placeholder="Enter block hash"
          size="lg"
          className="mb-4"
          value={blockHash} // Bind input value to blockHash state
          onChange={(e) => setBlockHash(e.target.value)}
        />
        <Button onClick={handleClick} colorScheme="teal" className={styles.fetchData} size="lg">Fetch Transaction Data</Button>
      </Box>
      {transactionData && (
        <Box className="mt-6">
          <Text fontSize="2xl" className="mb-4">Transaction Data:</Text>
          <UnorderedList>
            <ListItem><strong>Block Nmber:</strong> {transactionData.block_number}</ListItem>
            <ListItem><strong>Index:</strong> {transactionData.index}</ListItem>
            <ListItem><strong>Type:</strong> {transactionData.type}</ListItem>
            <ListItem><strong>Contract Address:</strong> {transactionData.contract_address}</ListItem>
          </UnorderedList>
        </Box>
        
        </UnorderedList>
      </Box>
      )}
      {errorMessage && (
        <Box className="mt-4">
          <Text color="red.500">{errorMessage}</Text>
        </Box>
      )}
    </main>
  );
}
