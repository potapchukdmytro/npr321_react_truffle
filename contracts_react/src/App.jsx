import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./components/layouts/DefaultLayout";
import MainPage from "./pages/mainPage/MainPage";
import LotteryPage from "./pages/lotteryPage/LotteryPage";
import ElectionPage from "./pages/electionPage/ElectionPage";
import GreetingsPage from "./pages/greetingsPage/GreetingsPage";
import darkTheme from "./theme/darkTheme";
import { ThemeProvider } from "@mui/material";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { AccountContext } from "./providers/accountProvider/AccountProvider";

function App() {
    const { getAccount } = useContext(AccountContext);

    useEffect(() => {
        getAccount().catch(error => toast.error(error));
    }, []);

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route index element={<MainPage />} />
                        <Route path="lottery" element={<LotteryPage />} />
                        <Route path="election" element={<ElectionPage />} />
                        <Route path="greetings" element={<GreetingsPage />} />
                    </Route>
                </Routes>
            </ThemeProvider>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                transition={Bounce}
            />
        </>
    );
}

export default App;
