import ChatGPT from "@/components/chatgpt";
import {
  Button,
  Center,
  HStack,
  Link,
  Spinner,
  StylesProvider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Block from "./Block";
import styles from "../styles/Home.module.css";

// @ts-expect-error no type info
const UserInformation = ({ user, logout }) => (
  <HStack>
    <Text>You have logged in as {user.email} </Text>
    <Button variant='link' colorScheme='red' onClick={logout}>
      Log Out
    </Button>
  </HStack>
);


const LoadingSpinner = ({
  coCreateWalletLoading,
}: {
  coCreateWalletLoading: boolean;
}) => coCreateWalletLoading && <Spinner size='xl' />;

export default function Home() {
  const [coCreateWalletCreated, setCoCreateWalletCreated] = useState(false);
  const [coCreateWalletAddress, setCoCreateWalletAddress] = useState("");
  const [coCreateWalletCreating, setCoCreateWalletCreating] = useState(false);
  const [coCreateWalletLoading, setCoCreateWalletLoading] = useState(false);

  const { authToken, handleLogOut, user, isAuthenticated, setShowAuthFlow } =
    useDynamicContext();

  const logout = async () => {
    setCoCreateWalletCreated(false);
    setCoCreateWalletAddress("");
    await handleLogOut();
  };

 


  return (
    <>
      <Head>
        <title>VOYAGE-AI</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main>
        <VStack spacing={5} mt={50}>
       <div className={styles.title}>VOYAG-AI</div>
          {!isAuthenticated && (
            <Text mt={1}>Get Started by logging in with your email 👇</Text>
          )}
          {!isAuthenticated && (
            <Button colorScheme='purple' className={styles.connect} onClick={() => setShowAuthFlow(true)}>
              Connect
            </Button>
          )}
          {user && (
            <>
              <UserInformation user={user} logout={logout} />
           
              <LoadingSpinner coCreateWalletLoading={coCreateWalletLoading} />
            </>
          )}
        </VStack>
      </main>
      <Block/>
   
<ChatGPT/>
    </>
  );
}