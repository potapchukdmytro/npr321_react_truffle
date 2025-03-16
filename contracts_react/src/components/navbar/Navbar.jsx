import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
                <Link to="/" style={{color: "black"}}>
                        <Button sx={{fontSize: "1.3em", fontWeight: "bold"}} color="inherit">Головна</Button>
                    </Link>
                    <Link to="/lottery" style={{color: "black"}}>
                        <Button sx={{fontSize: "1.3em", fontWeight: "bold"}} color="inherit">Лотерея</Button>
                    </Link>
                    <Link to="/election" style={{color: "black"}}>
                        <Button sx={{fontSize: "1.3em", fontWeight: "bold"}} color="inherit">Вибори</Button>
                    </Link>
                    <Link to="/greetings" style={{color: "black"}}>
                        <Button sx={{fontSize: "1.3em", fontWeight: "bold"}} color="inherit">Привітання</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
