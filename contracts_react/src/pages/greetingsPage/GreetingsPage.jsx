import { useContext, useState, useEffect } from "react";
import {
    GREETINGS_ABI,
    GREETINGS_ADDRESS,
} from "../../contractsConfig/cryptoGreetings/config";
import { AccountContext } from "../../providers/accountProvider/AccountProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import {
    Box,
    Button,
    TextField,
    Typography,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";

const GreetingsPage = () => {
    const [contract, setContract] = useState(null);
    const [greetings, setGreetings] = useState([]);
    const [owner, setOwner] = useState(null);

    const { account, setAccount, getAccount } = useContext(AccountContext);
    const navigate = useNavigate();

    const fetchGreetings = async (contractInstance) => {
        if (!contractInstance) {
            return;
        }
        const data = await contractInstance.getGreetings();
        setGreetings(data);
    };

    const sendHandler = () => {
        const message = document.getElementById("message");
        const amount = document.getElementById("amount");
        sendGreeting(message.value, amount.value);
        message.value = "";
        amount.value = "";
    };

    const sendGreeting = async (message, value) => {
        if (!contract || message.trim().length === 0) {
            return;
        }

        try {
            const tx = await contract.sendGreeting(message, {
                value: ethers.parseEther(value),
            });

            await tx.wait();
            fetchGreetings(contract);
            toast.success("Повідомлення відправлено");
        } catch (error) {
            console.error(error);
            toast.error("Помилка відправлення повідомлення");
        }
    };

    const getGreetingDate = (time) => {
        const date = new Date(parseInt(time) * 1000);
        const result = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return result;
    };

    const checkAccount = () => {
        getAccount().catch((error) => console.error(error));
    };

    useEffect(() => {
        checkAccount();

        const initContract = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(
                        window.ethereum
                    );
                    const signer = await provider.getSigner();
                    const greetingsContract = new ethers.Contract(
                        GREETINGS_ADDRESS,
                        GREETINGS_ABI,
                        signer
                    );
                    setOwner(await greetingsContract.owner());
                    setContract(greetingsContract);
                    fetchGreetings(greetingsContract);
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

    return (
        <Box>
            <Box
                display="flex"
                flexDirection="column"
                width="30%"
                alignContent="center"
                margin="30px auto 0px"
                boxShadow="1px 1px 4px white"
                padding="20px"
            >
                <Typography variant="h5" textAlign="center">
                    Текст повідомлення
                </Typography>
                <TextField id="message" sx={{ border: "1px solid white" }} />
                <Typography variant="h5" textAlign="center">
                    Сума
                </Typography>
                <TextField
                    id="amount"
                    type="number"
                    sx={{ border: "1px solid white" }}
                />
                <Button onClick={sendHandler} variant="solid">
                    Відправити
                </Button>
            </Box>
            {owner === account && (
                <Box>
                    <Typography variant="h3" textAlign="center" margin="15px">
                        Вітання
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 650, backgroundColor: "black" }}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        Відправник
                                    </TableCell>
                                    <TableCell align="center">
                                        Повідомлення
                                    </TableCell>
                                    <TableCell align="center">Час</TableCell>
                                    <TableCell align="center">Сума</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {greetings.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            {item[0]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item[1]}
                                        </TableCell>
                                        <TableCell align="center">
                                            {getGreetingDate(item[2])}
                                        </TableCell>
                                        <TableCell align="center">
                                            {ethers.formatEther(item[3])}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
};

export default GreetingsPage;
