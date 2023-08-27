"use client";
import "styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { layoutProp } from "../../../types/intefaces";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store/store";
import Navbar from "components/navbar/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "Context/ChatProvider";
export default function RootLayout({ children }: layoutProp) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ChakraProvider>
              <ChatProvider>
                <SessionProvider>
                  <Navbar />
                  {children}
                </SessionProvider>
              </ChatProvider>
            </ChakraProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
