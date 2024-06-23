from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/transactionData")
async def transaction_data(block_hash: str = Query(...)):
    try:
        response = requests.post('https://free-rpc.nethermind.io/sepolia-juno/?apikey=s9xjKDnzjR1BaeLhdkE0gBhFlikNBGeQD4nACdDpJrzVuA0h', json={
            "jsonrpc": "2.0",
            "method": "starknet_getBlockWithTxHashes",
            "params": {
                "block_id": {
                    "block_hash": block_hash
                }
            },
            "id": 1
        })
        response.raise_for_status()  # Raise HTTPError for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
