import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import clsx from "clsx";
import { rem } from "polished";

const Root = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: "10px 0",
  height: 17,
  color: "#2D2D2D",
  "&.blue": {
    background:
      "linear-gradient(to left, rgba(0, 186, 255, 1.0), rgba(0, 103, 194, 1.0))",
    height: 27,
    color: "#ffffff",
    margin: "5px -5px",
    padding: "0 5px",
    borderRadius: 3,
  },
}));

const Badge = styled("i")(({ theme }) => ({
  margin: "0 6px 0 0",
  display: "block",
  height: 17,
  width: 27,
  fontFamily: "'PT Sans', sans-serif",
  fontWeight: "bold",
  fontSize: rem(12),
  "&::before": {
    lineHeight: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "15px 3px",
    background: `url(${
      process.env.NEXT_PUBLIC_PUBLIC_URL + "/images/dots.svg"
    }) center center no-repeat`,
    content: "''",
  },
  "&.blue": {
    background: `url(${
      process.env.NEXT_PUBLIC_PUBLIC_URL + "/images/crown.svg"
    }) center center no-repeat`,
    backgroundSize: "17px 11px",
    "&::before": {
      content: "unset",
    },
  },
  "&.orange": {
    background: "#FF721C",
    borderRadius: 3,
    "&::before": {
      backgroundImage: "unset",
      backgroundSize: "unset",
      content: "'VIP'",
      color: "#ffffff",
    },
  },
  "&.obt": {
    background: "#ECF5F8",
    borderRadius: 3,
    "&::before": {
      backgroundImage: "unset",
      backgroundSize: "unset",
      content: "'ОБТ'",
    },
  },
}));

const NameWrapper = styled("span")(({ theme }) => ({
  margin: "0 6px 0 0",
  display: "flex",
  alignItems: "center",
  flex: 1,
  position: "relative",
}));

const Name = styled("span")(({ theme }) => ({
  margin: "0 6px 0 0",
  color: "unset",
  textTransform: "uppercase",
  fontFamily: "'PT Sans', sans-serif",
  fontWeight: "bold",
  fontSize: rem(15),
  "&:hover": {
    textDecoration: "underline",
  },
  zIndex: 1,
  cursor: "pointer",
}));

const Labels = styled("span")(({ theme }) => ({
  fontWeight: 600,
  fontSize: rem(10),
  lineHeight: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
}));

const PtsLabel = styled("span")(({ theme }) => ({
  color: "#00A1DD",
  "&.blue": {
    color: "#FFFFFF",
  },
  "&::before": {
    content: "'pts'",
  },
}));

const NewLabel = styled("span")(({ theme }) => ({
  color: "#FF721C",
  "&.blue": {
    color: "#FFFFFF",
  },
  "&::before": {
    content: "'new'",
  },
}));

const Icons = styled("span")(({ theme }) => ({
  display: "flex",
  position: "absolute",
  right: 0,
}));

const EngLabel = styled("span")(({ theme }) => ({
  display: "block",
  background: `url(${
    process.env.NEXT_PUBLIC_PUBLIC_URL + "/images/united-kingdom.svg"
  }) transparent no-repeat scroll 50% 0px`,
  width: 20,
  height: 13,
  marginLeft: theme.spacing(0.5),
}));

const EasyStartLabel = styled("span")(({ theme }) => ({
  display: "block",
  background: `url(${
    process.env.NEXT_PUBLIC_PUBLIC_URL + "/images/gift.svg"
  }) transparent no-repeat scroll 50% 0px`,
  width: 15,
  height: 14,
  marginLeft: theme.spacing(0.5),
}));

const PresentLabel = styled("span")(({ theme }) => ({
  display: "block",
  background: `url(${
    process.env.NEXT_PUBLIC_PUBLIC_URL + "/images/coins.svg"
  }) transparent no-repeat scroll 50% 0px`,
  width: 13,
  height: 15,
  marginLeft: theme.spacing(0.5),
}));

const BonusesLabel = styled("span")(({ theme }) => ({
  display: "block",
  background: `url(${
    process.env.NEXT_PUBLIC_PUBLIC_URL + "/images/coin.svg"
  }) transparent no-repeat scroll 50% 0px`,
  width: 14,
  height: 14,
  marginLeft: theme.spacing(0.5),
}));

const Rate = styled("i")(({ theme }) => ({
  fontWeight: 500,
  fontSize: rem(12),
  display: "block",
  margin: "0 6px 0 0",
  width: 58,
  "&.blue": {
    fontWeight: 600,
  },
}));

const Chronicle = styled("i")(({ theme }) => ({
  fontWeight: 500,
  fontSize: rem(12),
  display: "block",
  margin: "0 6px 0 0",
  width: 68,
  "&.blue": {
    fontWeight: 600,
  },
}));

const Date = styled("i")(({ theme }) => ({
  fontWeight: 500,
  fontSize: rem(12),
  display: "block",
  textAlign: "right",
  width: 55,
  "&.tag": {
    color: "#0086D8",
  },
  "&.blue": {
    color: "#FFFFFF",
    fontWeight: 600,
  },
}));

function World({ start }) {
  const labelSlugs = start.labels.map((label) => label.slug);

  return (
    <Root
      className={clsx({
        blue: start.feature && start.feature.type === "BLUE",
      })}
    >
      <Badge
        className={clsx({
          blue: start.feature && start.feature.type === "BLUE",
          orange: start.feature && start.feature.type === "ORANGE",
          obt: start.feature && start.feature.type === "OBT",
        })}
      />
      <NameWrapper>
        {start.worldId ? (
          <Link
            href={`/redirect/${encodeURIComponent(start.worldId)}`}
            passHref
          >
            <Name component="a" rel="nofollow" target="_blank">
              {start.name || start.host}
            </Name>
          </Link>
        ) : (
          <Name>{start.name || start.host}</Name>
        )}
        <Labels>
          {labelSlugs.includes("new") && (
            <NewLabel
              className={clsx({
                blue: start.feature && start.feature.type === "BLUE",
              })}
              title="Размещен впервые"
            />
          )}
          {labelSlugs.includes("pts") && (
            <PtsLabel
              className={clsx({
                blue: start.feature && start.feature.type === "BLUE",
              })}
              title="PTS платформа"
            />
          )}
        </Labels>
        <Icons>
          {labelSlugs.includes("eng") && <EngLabel title="Зарубежный" />}
          {labelSlugs.includes("easy-start") && (
            <EasyStartLabel title="Легкий старт" />
          )}
          {labelSlugs.includes("present") && <PresentLabel title="Розыгрыши" />}
          {labelSlugs.includes("bonuses") && <BonusesLabel title="Бонусы" />}
        </Icons>
      </NameWrapper>
      <Rate
        className={clsx({
          blue: start.feature && start.feature.type === "BLUE",
        })}
      >
        {start.rate.name}
      </Rate>
      <Chronicle
        className={clsx({
          blue: start.feature && start.feature.type === "BLUE",
        })}
      >
        {start.chronicle.name}
        {labelSlugs.includes("plus") && <>+</>}
      </Chronicle>
      <Date
        className={clsx({
          tag: start.dateTag,
          blue: start.feature && start.feature.type === "BLUE",
        })}
      >
        {start.dateTag || start.date}
      </Date>
    </Root>
  );
}

export default World;
