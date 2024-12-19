import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import AuthWrapper from "./components/Auth/AuthWrapper.jsx";
import { BrowserRouter } from "react-router-dom";
import store from './store/store.js'
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <BrowserRouter>
    {/* <AuthWrapper> */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    {/* </AuthWrapper> */}
  </BrowserRouter>
  </Provider>
);
