const express = require("express");
const supa = require("@supabase/supabase-js");
const app = express();

const supaUrl = "https://bhhccchqoqaxcdnwpsnp.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoaGNjY2hxb3FheGNkbndwc25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNDcxOTEsImV4cCI6MjA4NjkyMzE5MX0.kuYLW9HgAGIbJ0hqCgM9HX_lvzmvsGSQOEILckkSUwo";

const supabase = supa.createClient(supaUrl, supaAnonKey);

//Returns all data for all artists sorted by artist_name.
app.get("/api/artists", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select(
      "artist_id, artist_name, types(type_name), artist_image_url, spotify_url, spotify_desc",
    )
    .order("artist_name");

  res.json(data);
});

//Returns just the specified artist using the artist_id.
app.get("/api/artists/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select(
      "artist_id, artist_name, types(type_name), artist_image_url, spotify_url, spotify_desc",
    )
    .eq("artist_id", req.params.ref);

  //Error handling
  if (error) return res.status(500).json({ error: error.message });
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: "No artist with ID:" + req.params.ref });
  }
});

/*Returns the average values for bpm, energy,
danceability,loudness,liveness,valence,duration,
acousticness, speechineess, popularity for the specified
artist*/
app.get("/api/artists/averages/:ref", async (req, res) => {
  const { data, error } = await supabase.rpc("get_song_averages", {
    artist_id_param: req.params.ref,
  });

  //Error handling NEED TO REDO
  if (error) return res.status(500).json({ error: error.message });
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: "No artist with ID:" + req.params.ref });
  }
});

//Returns all the genres
app.get("/api/genres", async (req, res) => {
  const { data, error } = await supabase.from("genres").select();
  res.json(data);
});

//Returns all data for all the songs sorted by song title.
app.get("/api/songs", async (req, res) => {
  const { data, error } = await supabase
    .from("songs")
    .select("*, artists(artist_id, artist_name), genres(genre_id, genre_name)")
    .order("title", { ascending: true });
  res.json(data);
});

//Returns all the songs sorted by order field. Possible values are: (id, title, artist(name), genre(name), year, duration);
app.get("/api/songs/sort/:order", async (req, res) => {
  const orderMap = {
    id: "song_id",
    title: "title",
    artist: "artist_name",
    genre: "genre_name",
    year: "year",
    duration: "duration",
  };

  const sortColumn = orderMap[req.params.order];
  if (!sortColumn)
    return res.status(400).json({ error: "Invalid sorting value" });

  const { data, error } = await supabase
    .from("songs")
    .select("*, artists(artist_id, artist_name), genres(genre_id, genre_name)")
    .order(sortColumn, {
      ascending: true,
      referencedTable:
        req.params.order === "artist"
          ? "artists"
          : req.params.order === "genre"
            ? "genres"
            : undefined,
    });

  if (error) return res.status(500).json({ error: error.message });

  if (["artist", "genre"].includes(req.params.order)) {
    data.sort((a, b) => {
      const valA =
        req.params.order === "artist"
          ? a.artists.artist_name
          : a.genres.genre_name;
      const valB =
        req.params.order === "artist"
          ? b.artists.artist_name
          : b.genres.genre_name;
      return valA.localeCompare(valB);
    });
  }

  res.json(data);
});

//Returns just the specified song using the song_id field.
app.get("/api/songs/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("songs")
    .select()
    .eq("song_id", req.params.ref);
  res.json(data);
});

//Returns the songs whose title BEGINS with the provided substring
app.get("/api/songs/search/begin/:substring", async (req, res) => {
  const { data, error } = await supabase
    .from("songs")
    .select("*, artists (artist_name)")
    .ilike("title", `${req.params.substring}%`);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

//Returns the songs whose title contains the provided substring
app.get("/api/songs/search/any/:substring", async (req, res) => {
  const { data, error } = await supabase
    .from("songs")
    .select("*, artists(artist_id, artist_name), genres(genre_id, genre_name)")
    .ilike("title", `%${req.params.substring}%`);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

//Returns the songs whose year is equal to the provided substring
app.get("/api/songs/search/year/:substring", async (req, res) => {
  const { data, error } = await supabase
    .from("songs")
    .select("*, artists(artist_id, artist_name), genres(genre_id, genre_name)")
    .eq("year", req.params.substring);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

//Returns all the songs for the specified artist
app.get("/api/songs/artist/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("songs")
    .select("*, artists(artist_id, artist_name), genres(genre_id, genre_name)")
    .eq("artist_id", req.params.ref);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

//Returns all the songs for the specified genre
app.get("/api/songs/genre/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("songs")
    .select("*, artists(artist_id, artist_name), genres(genre_id, genre_name)")
    .eq("genre_id", req.params.ref);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

//Returns all the songs for the specified playlist
app.get("/api/playlists/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("playlists")
    .select(
      "*, songs(song_id, title, year, genres(genre_name), artists(artist_name))",
    )
    .eq("playlist_id", req.params.ref);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

//Returns the specified number of songs ranked from highest to lowest danceability.
app.get("/api/mood/dancing/:ref", async (req, res) => {
  let limit = parseInt(req.params.ref);

  if (!limit || limit < 1 || limit > 20) {
    limit = 20;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*, artists(artist_id, artist_name), genres(genre_id, genre_name)")
    .order("danceability", { ascending: false })
    .limit(limit);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

//Returns the specified number of songs ranked from highest to lowest valence.
app.get("/api/mood/happy/:ref", async (req, res) => {
  let limit = parseInt(req.params.ref);

  if (!limit || limit < 1 || limit > 20) {
    limit = 20;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*, artists(artist_id, artist_name), genres(genre_id, genre_name)")
    .order("valence", { ascending: false })
    .limit(limit);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

//Returns the specified number of songs sorted by liveness divided by acousticness in descending order.
app.get("/api/mood/coffee/:ref", async (req, res) => {
  let limit = parseInt(req.params.ref);
  if (!limit || limit < 1 || limit > 20) limit = 20;

  const { data, error } = await supabase
    .from("songs")
    .select("*, artists(artist_id, artist_name), genres(genre_id, genre_name)");

  if (error) return res.status(500).json({ error: error.message });

  const sorted = data
    .sort((a, b) => b.liveness / b.acousticness - a.liveness / a.acousticness)
    .slice(0, limit);

  res.json(sorted);
});

//Returns the specified number of songs sorted by energy times by speechiness in ascending order.
app.get("/api/mood/studying/:ref", async (req, res) => {
  let limit = parseInt(req.params.ref);
  if (!limit || limit < 1 || limit > 20) limit = 20;

  const { data, error } = await supabase
    .from("songs")
    .select("*, artists(artist_id, artist_name), genres(genre_id, genre_name)");

  if (error) return res.status(500).json({ error: error.message });

  const sorted = data
    .sort((a, b) => a.energy * a.speechiness - b.energy * b.speechiness)
    .slice(0, limit);

  res.json(sorted);
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
