import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function Sidebar() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "270px",
                    backgroundColor: "#f0f0f0",
                    paddingLeft: 1.5
                }}
            >
                Hello
            </Box>
            <Outlet />
        </Box>
    )
}

export default Sidebar;