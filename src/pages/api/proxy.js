// pages/api/proxy.js

export default async function handler(req, res) {
    const url = 'https://free-rpc.nethermind.io/sepolia-juno/?apikey=s9xjKDnzjR1BaeLhdkE0gBhFlikNBGeQD4nACdDpJrzVuA0h'; // Replace with your actual API endpoint
    const response = await fetch(url, {
      method: req.method,
      headers: {
       ...req.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
  
    const data = await response.json();
  
    res.status(response.status).json(data);
  }
  