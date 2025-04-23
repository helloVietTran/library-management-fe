import { Provider } from "react-redux";
import React, { useRef } from "react";
import { Persistor } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store, { RootState, AppDispatch, persistor } from "./store";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef(store);
  const persistorRef = useRef<Persistor>(persistor);
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>

  );
};

export default StoreProvider;
export type { RootState, AppDispatch };
