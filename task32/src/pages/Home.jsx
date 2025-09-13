import React from "react";
import { Container, Card, CardContent, Avatar, Typography, Stack, Chip, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Grid, Link as MUILink } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import styled from "styled-components";

const Hero = styled.section`
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 24px;
    align-items: center;
    padding: 28px;
    border-radius: ${({ theme }) => theme.shape?.borderRadius || 16}px;
    background: ${({ theme }) => `linear-gradient(135deg, ${theme.palette.primary.light}22, ${theme.palette.primary.main}11)`};
`;

export default function HomePage() {
    return (
        <Container sx={{ py: 4 }}>
            <Card>
                <CardContent>
                    <Hero>
                        <Avatar sx={{ width: 140, height: 140, fontSize: 48, bgcolor: "primary.main" }}>TS</Avatar>
                        <Box>
                            <Typography variant="h2" sx={{ fontWeight: 800, letterSpacing: -1 }} gutterBottom>
                                Tymur Shapoval
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Ambitious front-end developer eager to join a fast-paced professional team. Proficient in web app development and actively learning new technologies; focused on growth, continuous improvement and meaningful contributions to project success.
                            </Typography>
                        </Box>
                    </Hero>

                    <Grid container spacing={4} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ p: 2, borderRadius: 2, border: "1px solid #eee", background: "#fff" }}>
                                <Typography variant="overline" color="text.secondary">
                                    CONTACT DETAILS
                                </Typography>
                                <Stack spacing={1.2} sx={{ mt: 1.5 }}>
                                    <Typography>Prague, Czech Republic</Typography>
                                    <MUILink href="tel:+420775849270" underline="hover">
                                        +420 775 849 270
                                    </MUILink>
                                    <MUILink href="https://www.linkedin.com/in/tymur-shapoval-b0228b2bb/" target="_blank" underline="hover">
                                        LinkedIn
                                    </MUILink>
                                    <MUILink href="https://github.com/Phonker131" target="_blank" underline="hover">
                                        GitHub
                                    </MUILink>
                                    <MUILink href="mailto:shapovaltim@gmail.com" underline="hover">
                                        shapovaltim@gmail.com
                                    </MUILink>
                                </Stack>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="overline" color="text.secondary">
                                    LANGUAGES
                                </Typography>
                                <List dense sx={{ mt: 1 }}>
                                    {[
                                        { name: "Czech", level: "Upper Intermediate" },
                                        { name: "English", level: "Upper Intermediate" },
                                        { name: "Ukrainian", level: "Native" },
                                        { name: "Russian", level: "Native" },
                                    ].map((l) => (
                                        <ListItem key={l.name} sx={{ py: 0.3 }}>
                                            <ListItemIcon sx={{ minWidth: 28 }}>
                                                <CircleIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary={`${l.name} — ${l.level}`} />
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="overline" color="text.secondary">
                                    HOBBY
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                                    {["Travel", "Music", "Drumming"].map((h) => (
                                        <Chip key={h} label={h} variant="outlined" />
                                    ))}
                                </Stack>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Box>
                                <Typography variant="h5" gutterBottom>
                                    EDUCATION
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary="CHARLES UNIVERSITY (UNIVERZITA KARLOVA), PRAGUE" secondary="June 2022 — Computer Science, Programming and Software Development" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary="ODESSA NATIONAL UNIVERSITY, ODESA, UKRAINE" secondary="September 2021 — Computer Technology" />
                                    </ListItem>
                                </List>
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h5" gutterBottom>
                                    WORK EXPERIENCE
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <List>
                                    <ListItem sx={{ alignItems: "flex-start" }}>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary="Freelancer — September 2024 – present" secondary="Web development, technical support, technical specifications" />
                                    </ListItem>

                                    <ListItem sx={{ alignItems: "flex-start" }}>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <>
                                                    Development of website for chain of stores <strong>Galya Baluvana Odesa</strong>{" "}
                                                    <MUILink href="https://galyabaluvanaod.com/" target="_blank" underline="hover">
                                                        (link)
                                                    </MUILink>
                                                </>
                                            }
                                            secondary="Technologies: HTML, CSS, PHP8, MySQL, JavaScript, API"
                                        />
                                    </ListItem>

                                    <ListItem sx={{ alignItems: "flex-start" }}>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <>
                                                    Development of Telegram bot <strong>PivasovBot</strong>{" "}
                                                    <MUILink href="https://t.me/PivasovBeer_Bot" target="_blank" underline="hover">
                                                        (link)
                                                    </MUILink>
                                                </>
                                            }
                                            secondary="Technologies: Python 3, TeleBot, Requests"
                                        />
                                    </ListItem>
                                                                        <ListItem sx={{ alignItems: "flex-start" }}>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <>
                                                    Development of Telegram bot <strong>GalyaBot</strong>{" "}
                                                    <MUILink href="https://t.me/gb_odesa_bot" target="_blank" underline="hover">
                                                        (link)
                                                    </MUILink>
                                                </>
                                            }
                                            secondary="Technologies: Python 3, TeleBot, Requests"
                                        />
                                    </ListItem>



                                    <ListItem sx={{ alignItems: "flex-start" }}>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary="STUDY PROJECT 3 — Univerzita Karlova, Prague (Dec 2023 – Jan 2024)" secondary="Web development: Simple Forum. Stack: PHP, HTML, CSS, MySQL, JavaScript" />
                                    </ListItem>

                                    <ListItem sx={{ alignItems: "flex-start" }}>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary="STUDY PROJECT 2 — Univerzita Karlova, Prague (May 2023 – Sep 2023)" secondary="SoundIslands — streaming service. Stack: C#, .NET 6, Windows Forms, Python, Deezer API, WMPLib, pydeezer" />
                                    </ListItem>

                                    <ListItem sx={{ alignItems: "flex-start" }}>
                                        <ListItemIcon>
                                            <CheckCircleIcon color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary="STUDY PROJECT 1 — Univerzita Karlova, Prague (Dec 2022 – Feb 2023)" secondary="Music bot for Discord — Korn Bot. Stack: Python, Discord, Ffmpeg" />
                                    </ListItem>
                                </List>
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h5" gutterBottom>
                                    SKILLS
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                                    {["HTML/CSS + SCSS/SASS", "REST API", "AJAX", "React.js (Hooks, Routers, Electron)", "Tailwind CSS", "TypeScript", "JavaScript / C# / PHP", "MySQL", "ASP.NET", "Figma", ".NET", "GIT"].map((s) => (
                                        <Chip key={s} label={s} sx={{ mb: 1 }} />
                                    ))}
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}
