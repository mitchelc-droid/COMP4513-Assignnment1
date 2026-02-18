# COMP 4513 – Assignment #1

## Overview

This project is a REST API built with Node.js and Express that serves Spotify song data including songs, artists, genres, and playlists. Data is sourced from a Supabase cloud database and all responses are returned in JSON format.

## Built With

![Node.js](https://img.shields.io/badge/Node.js-Runtime-green)
![Express](https://img.shields.io/badge/Express-Routing-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-darkgreen)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)

## Hosting

> 🔗 **Live API:** [https://your-project.vercel.app](https://your-project.vercel.app)

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/artists` | Get all artists sorted by name |
| `/api/artists/:ref` | Get a specific artist by artist_id |
| `/api/artists/averages/:ref` | Get average song stats for a specific artist |
| `/api/genres` | Get all genres |
| `/api/songs` | Get all songs sorted by title |
| `/api/songs/sort/:order` | Get all songs sorted by a specified field |
| `/api/songs/:ref` | Get a specific song by song_id |
| `/api/songs/search/begin/:substring` | Get songs whose title begins with a substring |
| `/api/songs/search/any/:substring` | Get songs whose title contains a substring |
| `/api/songs/search/year/:substring` | Get songs from a specific year |
| `/api/songs/artist/:ref` | Get all songs for a specific artist |
| `/api/songs/genre/:ref` | Get all songs for a specific genre |
| `/api/playlists/:ref` | Get all songs in a specific playlist |
| `/api/mood/dancing/:ref` | Get top N songs by danceability (descending) |
| `/api/mood/happy/:ref` | Get top N songs by valence (descending) |
| `/api/mood/coffee/:ref` | Get top N songs by liveness/acousticness (descending) |
| `/api/mood/studying/:ref` | Get top N songs by energy × speechiness (ascending) |

> **Note:** For mood routes, if `ref` is missing, less than 1, or greater than 20, it defaults to 20.

## Example Requests & Responses

### Get a specific artist
**Request:** `/api/artists/129`

**Response:**
```json
{
  "artist_id": 129,
  "artist_name": "Ed Sheeran",
  "types": { "type_name": "Solo" },
  "artist_image_url": "https://...",
  "spotify_url": "https://...",
  "spotify_desc": "..."
}
```

### Get top 5 songs for dancing
**Request:** `/api/mood/dancing/5`

**Response:**
```json
[
  {
    "song_id": 204,
    "title": "Mi Gente",
    "danceability": 0.935,
    "artists": { "artist_id": 55, "artist_name": "J Balvin" },
    "genres": { "genre_id": 7, "genre_name": "Latin" }
  }
]
```

## Sort Options

The `/api/songs/sort/:order` endpoint accepts the following values:

| Value | Sorts By |
|-------|----------|
| `id` | song_id |
| `title` | Song title |
| `artist` | Artist name |
| `genre` | Genre name |
| `year` | Release year |
| `duration` | Song duration |

## Test Links: 

https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/artists              #           
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/artists/129          #
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/artists/sdfjkhsdf
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/artists/averages/129
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/genres
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/sort/artist
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/sort/year
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/sort/duration
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/1010
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/sjdkfhsdkjf
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/search/begin/love
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/search/begin/sdjfhs
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/search/any/love
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/search/year/2017
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/search/year/2027
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/artist/149
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/artist/7834562
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/songs/genre/115
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/playlists           #
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/playlists/3
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/playlists/35362
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/mood/dancing/5
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/mood/dancing/500
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/mood/dancing/ksdjf
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/mood/happy/8
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/mood/happy           #
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/mood/coffee/10
https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app/api/mood/studying/15