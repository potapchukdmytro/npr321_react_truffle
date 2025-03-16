import { ethers } from "ethers";
import {
    LOTTERY_ABI,
    LOTTERY_ADDRESS,
} from "../../contractsConfig/lottery/config";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../providers/accountProvider/AccountProvider";
import { Typography, Box, Button } from "@mui/material";

const LotteryPage = () => {
    const [contract, setContract] = useState(null);
    const [balance, setBalance] = useState(0);
    const [joined, setJoined] = useState(false);
    const [manager, setManager] = useState(null);

    const { account, setAccount } = useContext(AccountContext);
    const navigate = useNavigate();

    const getAccount = () => {
        if (!account) {
            const address = localStorage.getItem("token");
            if (address) {
                setAccount(address);
            } else {
                navigate("/");
            }
        }
    }

    const getJoined = () => {
        const localJoined = localStorage.getItem("joined");
        if (localJoined) {
            setJoined(JSON.parse(localJoined));
        }
    }

    useEffect(() => {
        getAccount();
        getJoined();

        const initContract = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(
                        window.ethereum
                    );
                    const signer = await provider.getSigner();
                    const lotteryContract = new ethers.Contract(
                        LOTTERY_ADDRESS,
                        LOTTERY_ABI,
                        signer
                    );
                    const mng = await lotteryContract.manager();
                    setManager(mng);
                    setContract(lotteryContract);
                    fetchBalance(lotteryContract);
                    setInterval(fetchBalance, 2000, lotteryContract);
                } catch (error) {
                    toast.error("Помилка для отримання контракту");
                    localStorage.removeItem("token");
                    setAccount(null);
                    navigate("/");
                }
            }
        };

        initContract();
    }, []);

    const fetchBalance = async (lotteryContract) => {
        if (!lotteryContract) {
            return;
        }

        try {
            const balance = await lotteryContract.getBalance();
            const eth = ethers.formatEther(balance);
            setBalance(eth);
            if (eth == 0) {
                setJoined(false);
                localStorage.removeItem("joined");
            }
        } catch (error) {
            console.error("Fetch balance", error);
        }
    };

    const rollLottery = async () => {
        if (!contract) {
            return;
        }

        try {
            const tx = await contract.roll();
            await tx.wait();
            fetchBalance(contract);
            const winner = await contract.getWinner();
            toast.success(`Жеребкування проведено. Переміг '${winner}'`);
        } catch (error) {
            console.error("Roll", error);
            toast.error("Не вдалося провести жеребкування");
        }
    };

    const joinLottery = async () => {
        if (!contract) {
            return;
        }

        try {
            const tx = await contract.join({ value: ethers.parseEther("1") });
            await tx.wait();
            fetchBalance(contract);
            toast.success("Ви успішно взяли участь у лотереї");
            setJoined(true);
            localStorage.setItem("joined", JSON.stringify(true));
        } catch (error) {
            console.error("Join error", error);
            toast.error("Не вдалося взяти участь у лотереї");
        }
    };

    return (
        <Box>
            <Typography sx={{ my: 3 }} variant="h1" textAlign="center">
                🎰 Лотерея 🎰
            </Typography>
            <Typography sx={{ my: 3 }} variant="h3" textAlign="center">
                Баланс лотереї: {balance}{" "}
            </Typography>
            <Box sx={{ my: 3 }} textAlign="center">
                {joined ? (
                    <Button
                        color="success"
                        onClick={joinLottery}
                        variant="contained"
                    >
                        Збільшити шанс на перемогу (1 ETH)
                    </Button>
                ) : (
                    <Button
                        color="success"
                        onClick={joinLottery}
                        variant="contained"
                    >
                        Приєднатися (1 ETH)
                    </Button>
                )}
            </Box>
            <Box sx={{ my: 3 }} textAlign="center">
                {manager === account && balance > 0 && (
                    <Button
                        onClick={rollLottery}
                        variant="contained"
                        color="warning"
                    >
                        Провести жеребкування
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default LotteryPage;
