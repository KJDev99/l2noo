import React from "react";
import World from "./World";
import { rem } from "polished";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Root = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const Header = styled(Typography)({
  fontWeight: 600,
  fontSize: rem(18),
  textTransform: "uppercase",
  marginBottom: 25,
});

const Hr = styled(Typography)({
  fontWeight: 500,
  fontSize: rem(14),
  display: "flex",
  alignItems: "center",
  height: 30,
  color: "#2D2D2D",
  background: "#ECF5F8",
  margin: "25px -5px 15px -5px",
  padding: "0 10px",
  borderRadius: 3,
});

function WorldsList({ worlds }) {
  let defaultColumns = {
    soon: {
      blocks: {
        vip: { blocks: { vip: { starts: [] }, top: { starts: [] } } },
        today: { starts: [] },
        tomorrow: { starts: [] },
        immediate: { starts: [] },
        late: { starts: [] },
      },
    },
    passed: {
      blocks: {
        vip: { blocks: { vip: { starts: [] }, top: { starts: [] } } },
        yesterday: { starts: [] },
        recent: { starts: [] },
        old: { starts: [] },
      },
    },
  };

  const { soon, passed } = { ...defaultColumns, ...worlds.columns };
  const { vip: soonVipBlocks, today, tomorrow, immediate, late } = soon.blocks;
  const { vip: passedVipBlocks, yesterday, recent, old } = passed.blocks;
  const { vip: soonVip, top: soonTop } = soonVipBlocks.blocks;
  const { vip: passedVip, top: passedTop } = passedVipBlocks.blocks;

  return (
    <Root container spacing={3}>
      {today.starts.length +
        tomorrow.starts.length +
        immediate.starts.length +
        late.starts.length >
        0 && (
        <Grid item sm>
          <Header component="p">{soon.name}</Header>
          {soonTop.starts.length + soonVip.starts.length > 0 && (
            <>
              {soonTop.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
              {soonVip.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
            </>
          )}
          {today.starts.length > 0 && (
            <>
              <Hr component="p">{today.name}</Hr>
              {today.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
            </>
          )}
          {tomorrow.starts.length > 0 && (
            <>
              <Hr component="p">{tomorrow.name}</Hr>
              {tomorrow.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
            </>
          )}
          {immediate.starts.length > 0 && (
            <>
              <Hr component="p">{immediate.name}</Hr>
              {immediate.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
            </>
          )}
          {late.starts.length > 0 && (
            <>
              <Hr component="p">{late.name}</Hr>
              {late.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
            </>
          )}
        </Grid>
      )}
      {yesterday.starts.length + recent.starts.length + old.starts.length >
        0 && (
        <Grid item sm>
          <Header component="p">{passed.name}</Header>
          {passedTop.starts.length + passedVip.starts.length > 0 && (
            <>
              {passedTop.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
              {passedVip.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
            </>
          )}
          {yesterday.starts.length > 0 && (
            <>
              <Hr component="p">{yesterday.name}</Hr>
              {yesterday.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
            </>
          )}
          {recent.starts.length > 0 && (
            <>
              <Hr component="p">{recent.name}</Hr>
              {recent.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
            </>
          )}
          {old.starts.length > 0 && (
            <>
              <Hr component="p">{old.name}</Hr>
              {old.starts.map((start) => (
                <World key={start.worldId} start={start} />
              ))}
            </>
          )}
        </Grid>
      )}
    </Root>
  );
}

export default WorldsList;
