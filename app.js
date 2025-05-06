import express from "express";
const app = express();
export default app;

import playlistsRouter from "#api/playlists";
import tracksRouter from "#api/tracks";

app.use(express.json());

app.use("/playlists", playlistsRouter);
app.use("/tracks", tracksRouter);

app.use((err, req, res, next) => {
  if (err.code === "23505") {
    return res.status(400).send(err.detail);
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
