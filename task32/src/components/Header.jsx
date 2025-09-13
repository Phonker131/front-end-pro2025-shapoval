import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PeopleIcon from "@mui/icons-material/People";

export default function Header() {
    const theme = useTheme();
    const location = useLocation();
    const links = [
        { to: "/", label: "Main page", icon: <HomeIcon /> },
        { to: "/todo", label: "TODO", icon: <AssignmentTurnedInIcon /> },
        { to: "/swapi", label: "SWAPI", icon: <PeopleIcon /> },
    ];

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backdropFilter: "blur(6px)",
                background: "rgba(255,255,255,0.8)",
                color: "text.primary",
                borderBottom: "1px solid #eee",
            }}
        >
            <Toolbar sx={{ gap: 2 }}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.primary.main }}>
                    Tymur Shapoval
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Stack direction="row" spacing={1}>
                    {links.map(({ to, label, icon }) => (
                        <Button
                            key={to}
                            component={NavLink}
                            to={to}
                            color="primary"
                            startIcon={icon}
                            sx={{
                                textTransform: "none",
                                borderRadius: 999,
                                backgroundColor: location.pathname === to ? `${theme.palette.primary.main}15` : "transparent",
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
