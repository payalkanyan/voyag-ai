import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "f5a94aa7-1576-438f-9148-66230d42ae09",
        eventsCallbacks: {
          onAuthSuccess: async (args) => {
            console.log("onAuthSuccess was called", args);
          },
        },
      }}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </DynamicContextProvider>
  );
}
