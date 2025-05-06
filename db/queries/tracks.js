import db from "#db/client";
export async function createTracks(name, duration_ms) {
  const sql = `
    INSERT INTO tracks
      (name, duration_ms)
    VALUES
      ($1, $2)
    RETURNING *
    `;
  const {
    rows: [track],
  } = await db.query(sql, [name, duration_ms]);
  return track;
}

export async function getTracks() {
  const sql = `
    SELECT *
    FROM tracks
    `;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}
export async function getTrackById(id) {
  const sql = `
    SELECT *
    FROM tracks 
    WHERE id = $1`;
  const {
    rows: [track],
  } = await db.query(sql, [id]);
  return track;
}

export async function getTracksByPlaylistId(id) {
  const sql = `
    SELECT tracks.*
    FROM
      playlists_tracks
      JOIN tracks ON playlists_tracks.track_id = tracks.id
    WHERE
      playlists_tracks.playlist_id = $1
    `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}
