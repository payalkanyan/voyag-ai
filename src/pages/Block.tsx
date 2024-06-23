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
        // <Box className={styles.data}>
        // <Text fontSize="2xl" className="mb-4">Transaction Data:</Text>
        // <UnorderedList>
        //   <ListItem>Block Number: 29416</ListItem>
        //   <ListItem>Index : 127</ListItem>
        //   <ListItem>Type : Invoke</ListItem>
        //   <ListItem>Contract Address : 0x025b74dbfb6aec63a080b2477e03a4920fbd89c3ba6adab7cea1afd25f8685f9</ListItem>
        //   <ListItem>Sender Address : 0x025b74dbfb6aec63a080b2477e03a4920fbd89c3ba6adab7cea1afd25f8685f9</ListItem>
        //   <ListItem>Time stamp: 29416</ListItem>
        //   <ListItem> Signature: 0x3aea73a0d8b4d2e780ff235223a290178570147f5910086ea0976a2c302d5d0</ListItem>
        //   <ListItem>Status: Accepted on L1</ListItem>
        //   <ListItem>Nonce: 0x1</ListItem>
          
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
