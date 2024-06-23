import { useEffect, useState } from 'react';
import { RpcProvider } from 'starknet';

// Assuming BlockWithTxHashes is the type returned by getBlockWithTxHashes
type BlockWithTxHashes = {
  // Define the structure of the BlockWithTxHashes object here
};

const StarkNetComponent = () => {
  // Declare the state to accept either BlockWithTxHashes or null
  const [block, setBlock] = useState<BlockWithTxHashes | null>(null);

  // Define fetchBlock function outside of useEffect to make it accessible throughout the component
  const fetchBlock = async () => {
    try {
      const provider = new RpcProvider({
        nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/?apikey=s9xjKDnzjR1BaeLhdkE0gBhFlikNBGeQD4nACdDpJrzVuA0h"
      });
      const result = await provider.getBlockWithTxHashes("0x1926fe58c6750d786c352d448f3318e675ab1e866a9a728c66fa873675eb9fd");
      setBlock(result);
    } catch (error) {
      console.error('Failed to fetch block:', error);
    }
  };

  useEffect(() => {
    // Call fetchBlock immediately if the component mounts
    fetchBlock();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <button onClick={fetchBlock}>Fetch Block Data</button>
      {block? (
        <pre>{JSON.stringify(block, null, 2)}</pre>
      ) : (
        <p>Loading block data...</p>
      )}
    </div>
  );
};

export default StarkNetComponent;
