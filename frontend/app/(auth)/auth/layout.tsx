"use client";
import "styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { layoutProp } from "../../../types/intefaces";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store/store";
export default function RootLayout({ children }: layoutProp) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SessionProvider>
              {children}
            </SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
