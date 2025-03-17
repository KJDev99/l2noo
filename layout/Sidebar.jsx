import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Sidebar from "../components/Sidebar";

const drawerWidth = 240;

const Root = styled(Container)(({ theme }) => ({
  display: "flex",
  paddingLeft: 0,
  paddingRight: 0,
  borderRadius: "0 0 5px 5px",
  overflow: "hidden",
}));

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: "white",
  [theme.breakpoints.up("md")]: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
}));

const SidebarLayout = ({ window, children }) => {
  const chronicles = children?.props?.chronicles || [];
  const labels = children?.props?.labels || [];

  console.log("chroniclesparets", chronicles);

  return (
    <Root maxWidth="lg" disableGutters>
      <Content>{children}</Content>
      <Sidebar window={window} chronicles={chronicles} labels={labels} />
    </Root>
  );
};

export default SidebarLayout;
