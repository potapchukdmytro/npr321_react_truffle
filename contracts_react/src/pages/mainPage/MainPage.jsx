import { toast } from "react-toastify";
import { useContext } from "react";
import { ethers } from "ethers";
import { Box, Button } from "@mui/material";
import { AccountContext } from "../../providers/accountProvider/AccountProvider";

const MainPage = () => {
    const { account, setAccount } = useContext(AccountContext);

    const connectWallet = async () => {
        if (!window.ethereum) {
            toast.error("Встановіть metamask");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            localStorage.setItem("token", address);
        } catch (error) {
            toast.error("Помилка підключення");
            console.error("Connection error", error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            {account ? (
                <h1>{account}</h1>
            ) : (
                <Button onClick={connectWallet} variant="contained">
                    Підключити Metamask
                </Button>
            )}
        </Box>
    );
};

export default MainPage;
