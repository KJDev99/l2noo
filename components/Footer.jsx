"use client";

import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const RootContainer = styled(Container)(() => ({
  display: "flex",
}));

const CopyrightWrapper = styled(Box)(() => ({
  flex: 1,
}));

const CopyrightText = styled(Typography)(() => ({
  fontSize: "11px",
  color: "#8B8B8B",
}));

function Footer() {
  return (
    <RootContainer component="footer" maxWidth="lg" disableGutters>
      <CopyrightWrapper m={3}>
        <CopyrightText>© {new Date().getFullYear()} L2noo.ru</CopyrightText>
        <CopyrightText>
          Lineage II is a trademark of NCsoft Corporation. Copyright © NCsoft
          Corporation 2005-{new Date().getFullYear()}. All rights reserved.
        </CopyrightText>
      </CopyrightWrapper>
      {/* Agar Yandex Metrika kerak bo‘lsa, pastdagini oching */}
      {/* <Box m={3} sx={{ width: 88, height: 31 }} dangerouslySetInnerHTML={{ __html: counter }} /> */}
    </RootContainer>
  );
}

export default Footer;
