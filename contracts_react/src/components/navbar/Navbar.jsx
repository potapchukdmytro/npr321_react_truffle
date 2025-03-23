import { Box, AppBar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../../providers/accountProvider/AccountProvider";

const Navbar = () => {
    const { account, setAccount } = useContext(AccountContext);

    const logoutHanlder = () => {
        localStorage.removeItem("token");
        setAccount(null);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Box display="flex">
                    <Box
                        display="flex"
                        justifyContent="center"
                        sx={{ flexGrow: 1 }}
                    >
                        <Link to="/" style={{ color: "black" }}>
                            <Button
                                sx={{ fontSize: "1.3em", fontWeight: "bold" }}
                                color="inherit"
                            >
                                Головна
                            </Button>
                        </Link>
                        <Link to="/lottery" style={{ color: "black" }}>
                            <Button
                                sx={{ fontSize: "1.3em", fontWeight: "bold" }}
                                color="inherit"
                            >
                                Лотерея
                            </Button>
                        </Link>
                        <Link to="/election" style={{ color: "black" }}>
                            <Button
                                sx={{ fontSize: "1.3em", fontWeight: "bold" }}
                                color="inherit"
                            >
                                Вибори
                            </Button>
                        </Link>
                        <Link to="/greetings" style={{ color: "black" }}>
                            <Button
                                sx={{ fontSize: "1.3em", fontWeight: "bold" }}
                                color="inherit"
                            >
                                Привітання
                            </Button>
                        </Link>
                    </Box>
                    {account && (
                        <Box sx={{ mr: 2 }}>
                            <Button
                                onClick={logoutHanlder}
                                sx={{ fontSize: "1.3em", fontWeight: "bold" }}
                                color="inherit"
                            >
                                Вийти
                            </Button>
                        </Box>
                    )}
                </Box>
            </AppBar>
        </Box>
    );
};

export default Navbar;
