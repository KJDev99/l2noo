"use client";

import React, { useContext } from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden";
import MenuIcon from "@mui/icons-material/Menu";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/material/styles";
import Global from "@/contexts/global";

const RootContainer = styled(Container)(() => ({
  paddingLeft: 0,
  paddingRight: 0,
  borderRadius: "5px 5px 0 0",
  overflow: "hidden",
}));

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#2D2D2D",
}));

const LogoLink = styled("a")(({ theme }) => ({
  fontWeight: 800,
  fontSize: "28px",
  textTransform: "uppercase",
  color: "inherit",
  marginRight: theme.spacing(3),
  textDecoration: "none",
}));

const LogoLinkBlue = styled("span")(() => ({
  color: "#01BAFF",
}));

const LogoLinkMini = styled("i")(() => ({
  fontSize: "14px",
  verticalAlign: "baseline",
}));

const HeaderButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  color: "inherit",
  textTransform: "unset",
  backgroundColor: "rgba(255, 255, 255, 0.075)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.125)",
  },
}));

function Header({ h1 = "Анонсы Lineage 2 серверов" }) {
  const { mobileOpen, setMobileOpen } = useContext(Global);

  return (
    <RootContainer maxWidth="lg" disableGutters>
      <StyledAppBar position="relative">
        <Toolbar>
          <Hidden smDown>
            <Link prefetch={false} href="/" passHref>
              <LogoLink>
                <LogoLinkBlue>L2</LogoLinkBlue>Noo
                <LogoLinkMini>.ru</LogoLinkMini>
              </LogoLink>
            </Link>
          </Hidden>
          <Typography
            component="h1"
            noWrap
            sx={{
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "uppercase",
              flexGrow: 1,
            }}
          >
            {h1}
          </Typography>
          <Hidden smDown>
            <Link prefetch={false} href="/add-world" passHref>
              <HeaderButton
                variant="contained"
                startIcon={
                  <AddCircleIcon sx={{ fontSize: "18px", color: "#01BAFF" }} />
                }
              >
                Добавить проект
              </HeaderButton>
            </Link>
          </Hidden>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ marginLeft: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
    </RootContainer>
  );
}

export default Header;
