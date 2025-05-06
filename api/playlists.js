import express from "express";
const router = express.Router();
export default router;

import {
  createPlaylists,
  getPlaylistbyId,
  getPlaylists,
} from "#db/queries/playlists";
import { getTrackById, getTracksByPlaylistId } from "#db/queries/tracks";
import { createPlaylistTracks } from "#db/queries/playlist_track";

router.route("/").get(async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.route("/").post(async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request must have a body.");
  }
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send("Missing name or description.");
  }
  const playlist = await createPlaylists(name, description);
  res.status(201).send(playlist);
});

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("Playlist ID must be a positive integer.");
  }

  const playlist = await getPlaylistbyId(id);
  if (!playlist) {
    return res.status(404).send("Playlist not found");
  }

  req.playlist = playlist;
  next();
});

router.route("/:id").get((req, res) => {
  res.status(200).send(req.playlist);
});

router.route("/:id/tracks").get(async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.status(200).send(tracks);
});

router.route("/:id/tracks").post(async (req, res) => {
    if(!req.body) {
        return res.status(400).send("Request must have a body.");  
    }
    const {trackId} = req.body;
    if (!trackId || isNaN(Number(trackId))) {
        return res.status(400).send("Request body must include trackId.")
    }
    const track = await getTrackById(trackId);
    if(!track) {
        return res.status(400).send("Track does not exist.")
    }

    const playlistTrack = await createPlaylistTracks(req.playlist.id, trackId);
    res.status(201).send(playlistTrack);
  });
