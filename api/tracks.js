import express from "express";
const router = express.Router();
export default router;

import { getTrackById, getTracks } from "#db/queries/tracks";

router
.route("/")
.get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});
router
.route("/:id")
.get(async(req, res) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        return res.status(400).send("Track ID must be a positive integer.");
      }
    const track = await getTrackById(id);
    if (!track) {
        return res.status(404).send("Track not found");
    }
    res.status(200).send(track);
})