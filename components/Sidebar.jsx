"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";
import { rem } from "polished";
import clsx from "clsx";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import Global from "../contexts/global";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Carousel from "react-material-ui-carousel";

const drawerWidth = 240;

const Root = styled("nav")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: `calc(${drawerWidth}px + ${theme.spacing(3) * 2}px)`,
    flexShrink: 0,
    padding: theme.spacing(3),
  },
  backgroundColor: "#ECF5F8",
}));

const DrawerPaper = styled("div")(({ theme }) => ({
  width: `calc(${drawerWidth}px + ${theme.spacing(3) * 2}px)`,
  padding: theme.spacing(3),
}));

const ChronicleListRoot = styled("div")(({ theme }) => ({
  paddingBottom: theme.spacing(3),
}));

const ChronicleList = styled(List)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  padding: "unset",
}));

const ChronicleListItem = styled(ListItem)(({ theme }) => ({
  color: "inherit",
  width: `calc(100% / 2 - ${theme.spacing(1)}px)`,
  padding: "unset",
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  "&:hover": {
    color: "#0086D8",
  },
}));

const ChronicleListItemCurrent = styled(ChronicleListItem)({
  color: "#0086D8",
});

const ChronicleListItemTextRoot = styled(ListItemText)({
  margin: "unset",
});

const ChronicleListItemText = styled("span")({
  fontWeight: 500,
  fontSize: rem(14),
});

const BennerRoot = styled("div")(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  width: 240,
  height: 400,
  boxSizing: "unset",
}));

const ChipsRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  "& > *": {
    margin: theme.spacing(0.5),
  },
}));

const ChipRoot = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  fontSize: rem(12),
  backgroundColor: "#D9E8EC",
  height: 28,
  borderRadius: 3,
  "&:hover": {
    backgroundColor: "#C6D7DC",
  },
  "&:focus": {
    backgroundColor: "#0094E3",
    color: "#FFFFFF",
  },
}));

const ChipRootCurrent = styled(ChipRoot)({
  backgroundColor: "#0094E3",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#C6D7DC",
  },
  "&:focus": {
    backgroundColor: "#0094E3",
    color: "#FFFFFF",
  },
});

function Sidebar({ window, chronicles, labels }) {
  const router = useRouter();
  const { mobileOpen, setMobileOpen } = useContext(Global);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const chroniclesView = (
    <ChronicleListRoot>
      <ChronicleList>
        <Link href="/" passHref>
          <ChronicleListItem
            component="a"
            className={clsx(router.pathname === "/" && "current")}
            onClick={() => setMobileOpen(false)}
          >
            <ChronicleListItemTextRoot
              primary={
                <ChronicleListItemText>Все хроники</ChronicleListItemText>
              }
            />
          </ChronicleListItem>
        </Link>
        {chronicles.map((chronicle) => (
          <React.Fragment key={chronicle.chronicleId}>
            <Link href={"/" + chronicle.slug} passHref>
              <ChronicleListItem
                component="a"
                className={clsx(
                  router.query.slug === chronicle.slug &&
                    router.route === "/[slug]" &&
                    "current"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <ChronicleListItemTextRoot
                  primary={
                    <ChronicleListItemText>
                      {chronicle.name}
                    </ChronicleListItemText>
                  }
                />
              </ChronicleListItem>
            </Link>
            {chronicle.slug === "interlude" && (
              <Link href="/interlude/plus" passHref>
                <ChronicleListItem
                  component="a"
                  className={clsx(
                    router.query.slug === "interlude" &&
                      router.query.clarification === "plus" &&
                      "current"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <ChronicleListItemTextRoot
                    primary={
                      <ChronicleListItemText>Interlude+</ChronicleListItemText>
                    }
                  />
                </ChronicleListItem>
              </Link>
            )}
          </React.Fragment>
        ))}
      </ChronicleList>
    </ChronicleListRoot>
  );

  const benners = [
    {
      url: "https://l2noo.ru/redirect/9721be1a-0e15-4c2c-8fec-6e6f769305e9",
      image: "/images/benner/steephare2024.png",
      alt: "SteepHare",
    },
    {
      url: "https://l2noo.ru/redirect/71beff28-37ee-448f-9b74-aa22d96b8ada",
      image: "/images/benner/excellent.png",
      alt: "Excellent",
    },
  ];

  const bennerView = (
    <BennerRoot>
      <Link href="https://l2noo.ru/add-world" passHref>
        <Image
          src="/images/benner/mesto_svobodno.png"
          alt="Место свободно"
          width={240}
          height={400}
          style={{ width: "100%", height: "auto" }}
        />
      </Link>
    </BennerRoot>
  );

  const chipsView = (
    <ChipsRoot>
      {labels.map((label) => (
        <Link key={label.labelId} href={"/" + label.slug} passHref>
          <Chip
            className={clsx(router.query.slug === label.slug ? "current" : "")}
            label={label.name}
            component="a"
            clickable
            onClick={() => setMobileOpen(false)}
          />
        </Link>
      ))}
    </ChipsRoot>
  );

  const drawer = (
    <>
      {chronicles && chroniclesView}
      {bennerView}
      {labels && chipsView}
    </>
  );

  // useEffect(() => {
  //   setIsIOS(
  //     typeof window !== "undefined" &&
  //       /iPad|iPhone|iPod/.test(navigator.userAgent)
  //   );
  // }, []);
  // const iOS =
  //   typeof window !== "undefined" &&
  //   /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [isClient, setIsClient] = useState(false);
  const iOS =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  useEffect(() => {
    setIsClient(true); // Faqat clientda true bo‘ladi
  }, []);

  if (!isClient) return null; // SSR paytida hech narsa qaytarmaslik

  return (
    <Root aria-label="Навигация">
      {isMobile ? (
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          ModalProps={{ keepMounted: true }}
          onClose={() => setMobileOpen(false)}
          onOpen={() => setMobileOpen(true)}
        >
          <DrawerPaper>{drawer}</DrawerPaper>
        </SwipeableDrawer>
      ) : (
        <Grid container spacing={3}>
          <Grid item>{drawer}</Grid>
        </Grid>
      )}
    </Root>
  );
}

export default Sidebar;
