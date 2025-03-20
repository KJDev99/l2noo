import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const BgWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: -100,
  "&::after": {
    background: "linear-gradient(to bottom, transparent 0%, #171717 60%)",
    content: "''",
    position: "absolute",
    left: 0,
    top: 280,
    height: 320,
    right: 0,
    display: "block",
  },
}));

const Bg = styled("i")(({ theme }) => ({
  background: `url(${process.env.NEXT_PUBLIC_PUBLIC_URL}/images/background-top.png) transparent no-repeat scroll 50% 0px`,
  width: "100%",
  height: 600,
  display: "block",
  [theme.breakpoints.down("md")]: {
    background: "unset",
  },
}));

const MainLayout = ({ children, h1 }) => {
  return (
    <>
      <Header h1={h1} />
      {children}
      <Footer />

      <BgWrapper>
        <Link prefetch={false} href="/" passHref>
          <Bg aria-label="Фоновое изображение" />
        </Link>
      </BgWrapper>
    </>
  );
};

export default MainLayout;
