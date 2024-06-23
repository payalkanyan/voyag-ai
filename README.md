
## Voyag-AI
Voyag-AI is a web application that leverages the Voyager API to fetch data related to blockchain transaction hashes and utilizes OpenAI's GPT model to provide useful insights about the retrieved data. This project is ideal for both blockchain enthusiasts and developers looking to integrate AI into their applications to gain deeper understanding of blockchain transactions.

### Features
#### Transaction Data Retrieval:
 Fetch detailed information about blockchain transactions using the Voyager API.
#### AI Insights: 
Use OpenAI's GPT model to analyze the retrieved transaction data and provide insightful summaries and explanations.
#### User-Friendly Interface: 
Simple and intuitive interface built with React and Chakra UI for easy interaction.
#### Error Handling:
 Clear error messages and informative feedback in case of issues.


### How it's made
It is built using Voyager API where we call [this method](https://docs.voyager.online/#get-/txns/-txnHash-) of the API & we then print it on frontend. We used OpenAI's chatgpt & finetuned it for understanding the parsed output & then printing the description of a transaction for anyone to understand.

background image
