import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const DefaultLayout = () => {
    return (
        <Box>
            <Navbar />
            <Container>
                <Outlet />
            </Container>
        </Box>
    );
};

export default DefaultLayout;
