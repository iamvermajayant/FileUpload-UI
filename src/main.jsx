import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import AuthWrapper from "./components/Auth/AuthWrapper.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthWrapper>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthWrapper>
  </BrowserRouter>
);
