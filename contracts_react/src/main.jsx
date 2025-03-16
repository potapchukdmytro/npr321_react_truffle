import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AccountProvider } from "./providers/accountProvider/AccountProvider.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AccountProvider>
            <App />
        </AccountProvider>
    </BrowserRouter>
);
