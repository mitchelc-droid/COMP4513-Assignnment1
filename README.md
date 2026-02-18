# COMP 4513 – Spotify API

## Overview

This project is a REST API built with Node.js and Express that serves Spotify song data (2016-2019) including songs, artists, genres, and playlists. Data is sourced from a Supabase cloud database and all responses are returned in JSON format.

## Built With

![Node.js](https://img.shields.io/badge/Node.js-Runtime-green)
![Express](https://img.shields.io/badge/Express-Routing-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-darkgreen)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)

## Hosting

> 🔗 **Live API:** [https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app](https://spotifydata-fw7wd2cm9-mitchelc-droids-projects.vercel.app) 

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
[
  {
    "artist_id": 129,
    "artist_name": "Post Malone",
    "artist_image_url": "https://i.scdn.co/image/ab6761610000f178b894ef9fa437b0389c5567cc",
    "spotify_url": "https://open.spotify.com/artist/246dkjvS1zLTtiykXe5h60",
    "spotify_desc": "Diamond-certified American hitmaker Post Malone bridges the gap between the worlds of rap and the pop mainstream. Within five years of his debut, he went from underground genre novelty to certified superstar, amassing a string of Top Ten singles with a hybrid style that combined his unique vocal delivery, pained lyrics, and hip-hop production inspired as much by Tim McGraw as Kanye West.",
    "types": {
      "type_name": "Solo"
    }
  }
]
```

### Get top 3 songs for dancing
**Request:** `/api/mood/dancing/3`

**Response:**
```json
[
  {
    "song_id": 1052,
    "title": "Yes Indeed",
    "artist_id": 80,
    "genre_id": 104,
    "year": 2018,
    "bpm": 120,
    "energy": 35,
    "danceability": 96,
    "loudness": -9,
    "liveness": 11,
    "valence": 56,
    "duration": 142,
    "acousticness": 4,
    "speechiness": 53,
    "popularity": 84,
    "artists": {
      "artist_id": 80,
      "artist_name": "Lil Baby"
    },
    "genres": {
      "genre_id": 104,
      "genre_name": "atl hip hop"
    }
  },
  {
    "song_id": 1023,
    "title": "Money",
    "artist_id": 27,
    "genre_id": 110,
    "year": 2018,
    "bpm": 130,
    "energy": 59,
    "danceability": 95,
    "loudness": -7,
    "liveness": 11,
    "valence": 22,
    "duration": 184,
    "acousticness": 1,
    "speechiness": 29,
    "popularity": 78,
    "artists": {
      "artist_id": 27,
      "artist_name": "Cardi B"
    },
    "genres": {
      "genre_id": 110,
      "genre_name": "dance pop"
    }
  },
  {
    "song_id": 1281,
    "title": "Gucci Gang",
    "artist_id": 83,
    "genre_id": 112,
    "year": 2017,
    "bpm": 120,
    "energy": 52,
    "danceability": 94,
    "loudness": -7,
    "liveness": 12,
    "valence": 70,
    "duration": 124,
    "acousticness": 24,
    "speechiness": 6,
    "popularity": 69,
    "artists": {
      "artist_id": 83,
      "artist_name": "Lil Pump"
    },
    "genres": {
      "genre_id": 112,
      "genre_name": "emo rap"
    }
  }
]
```

## Sort Options (ascending)

The `/api/songs/sort/:order` endpoint accepts the following values:

| Value | Sorts By |
|-------|----------|
| `id` | song_id |
| `title` | title |
| `artist` | artist_name |
| `genre` | genre_name |
| `year` | year |
| `duration` | duration |

## Test Links: 

https://comp-4513-assignnment1.vercel.app/api/artists

https://comp-4513-assignnment1.vercel.app/api/artists/129

https://comp-4513-assignnment1.vercel.app/api/artists/sdfjkhsdf

https://comp-4513-assignnment1.vercel.app/api/artists/averages/129

https://comp-4513-assignnment1.vercel.app/api/genres

https://comp-4513-assignnment1.vercel.app/api/songs

https://comp-4513-assignnment1.vercel.app/api/songs/sort/artist

https://comp-4513-assignnment1.vercel.app/api/songs/sort/year

https://comp-4513-assignnment1.vercel.app/api/songs/sort/duration

https://comp-4513-assignnment1.vercel.app/api/songs/1010

https://comp-4513-assignnment1.vercel.app/api/songs/sjdkfhsdkjf

https://comp-4513-assignnment1.vercel.app/api/songs/search/begin/love

https://comp-4513-assignnment1.vercel.app/api/songs/search/begin/sdjfhs

https://comp-4513-assignnment1.vercel.app/api/songs/search/any/love

https://comp-4513-assignnment1.vercel.app/api/songs/search/year/2017

https://comp-4513-assignnment1.vercel.app/api/songs/search/year/2027

https://comp-4513-assignnment1.vercel.app/api/songs/artist/149

https://comp-4513-assignnment1.vercel.app/api/songs/artist/7834562

https://comp-4513-assignnment1.vercel.app/api/songs/genre/115

https://comp-4513-assignnment1.vercel.app/api/playlists

https://comp-4513-assignnment1.vercel.app/api/playlists/3

https://comp-4513-assignnment1.vercel.app/api/playlists/35362

https://comp-4513-assignnment1.vercel.app/api/mood/dancing/5

https://comp-4513-assignnment1.vercel.app/api/mood/dancing/500

https://comp-4513-assignnment1.vercel.app/api/mood/dancing/ksdjf

https://comp-4513-assignnment1.vercel.app/api/mood/happy/8

https://comp-4513-assignnment1.vercel.app/api/mood/happy

https://comp-4513-assignnment1.vercel.app/api/mood/coffee/10

https://comp-4513-assignnment1.vercel.app/api/mood/studying/15