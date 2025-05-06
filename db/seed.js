import db from "#db/client";
import {createPlaylistTracks} from "#db/queries/playlist_track";
import { createPlaylists } from "#db/queries/playlists";
import { createTracks } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 10; i++) {
    await createPlaylists("Playlist " + i, "Description for playlist " + i);
  }
  for (let i = 1; i <= 20; i++) {
    const duration = 60000 + Math.floor(Math.random() * 240000);
    await createTracks("Track " + i, duration);
  }
  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(Math.random() * 10);
    const trackId = 1 + Math.floor(Math.random() * 20);
    await createPlaylistTracks(playlistId, trackId);
  }
}
