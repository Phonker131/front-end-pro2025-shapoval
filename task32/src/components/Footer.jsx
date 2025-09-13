import React from "react";
import { Box, Container, Stack, Typography, Button, Link as MUILink } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PlaceIcon from "@mui/icons-material/Place";

export default function Footer() {
    return (
        <Box component="footer" sx={{ mt: 6, py: 4, borderTop: "1px solid #eee" }}>
            <Container>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }}>
                    <Typography variant="body2">© {new Date().getFullYear()} Shapoval Tymur</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Button startIcon={<PlaceIcon />} disabled sx={{ cursor: "default" }}>
                            Prague, Czech Republic
                        </Button>
                        <Button component={MUILink} href="tel:+420775849270" startIcon={<PhoneIphoneIcon />}>
                            +420 775 849 270
                        </Button>
                        <Button component={MUILink} href="mailto:shapovaltim@gmail.com" startIcon={<MailOutlineIcon />}>
                            shapovaltim@gmail.com
                        </Button>
                        <Button component={MUILink} href="https://www.linkedin.com/in/tymur-shapoval-b0228b2bb/" target="_blank" startIcon={<LinkedInIcon />}>
                            LinkedIn
                        </Button>
                        <Button component={MUILink} href="https://github.com/Phonker131" target="_blank" startIcon={<GitHubIcon />}>
                            GitHub
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
