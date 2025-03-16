import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Root = styled(Container)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
  borderRadius: "0 0 5px 5px",
  overflow: "hidden",
}));

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: "white",
}));

const WithoutSidebarLayout = ({ children }) => {
  return (
    <Root maxWidth="lg">
      <Content>{children}</Content>
    </Root>
  );
};

export default WithoutSidebarLayout;
