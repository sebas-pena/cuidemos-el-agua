'use client'
import { Provider } from "react-redux";
import { store } from "./store";
import StoreInitializer from "@/components/utils/StoreInitializer";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <StoreInitializer />
      {children}
    </Provider>
  );
}
