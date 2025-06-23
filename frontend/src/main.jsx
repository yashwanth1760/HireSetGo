import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      <Toaster
        theme="light" // or "dark" if you prefer
        toastOptions={{
          classNames: {
            toast: "bg-white text-black border border-gray-300 shadow-md",
            success: "bg-green-100 text-green-800",
            error: "bg-red-100 text-red-800",
          },
        }}
      />
    </Provider>
  </StrictMode>
);
