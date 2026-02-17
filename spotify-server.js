const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supaUrl = 'https://bhhccchqoqaxcdnwpsnp.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoaGNjY2hxb3FheGNkbndwc25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNDcxOTEsImV4cCI6MjA4NjkyMzE5MX0.kuYLW9HgAGIbJ0hqCgM9HX_lvzmvsGSQOEILckkSUwo';

const supabase = supa.createClient(supaUrl, supaAnonKey);

app.get('/artists', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select();
    res.json(data);
});

app.get('/artists/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select()
        .eq('artist_id', (req.params.ref))

    //Error handling
    if (error) return res.status(500).json({ error: error.message });
    if (data) { res.json(data); }
    else { res.status(404).json({ error: "No artist with ID:" + req.params.ref }) }
});

app.get('/artists/averages/:ref', async (req, res) => {
    const { data, error } = await supabase
        .rpc('get_song_averages', { artist_id_param: req.params.ref });

    //Error handling NEED TO REDO
    if (error) return res.status(500).json({ error: error.message });
    if (data) { res.json(data); }
    else { res.status(404).json({ error: "No artist with ID:" + req.params.ref }) }
})

app.get('/genres', async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select();
    res.json(data);
});

app.get('/songs', async (req, res) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*, artists(artist_id, artist_name), genres(genre_id, genre_name)')
        .order('title', { ascending: true });
    res.json(data);
})


// Research what ordermap does
app.get('/songs/sort/:order', async (req, res) => {
    const orderMap = {
        id: 'song_id',
        title: 'title',
        artist: 'artist_name',
        genre: 'genre_name',
        year: 'year',
        duration: 'duration'
    };

    const sortColumn = orderMap[req.params.order];
    if (!sortColumn) return res.status(400).json({ error: 'Invalid sorting value' });

    const { data, error } = await supabase
        .from('songs')
        .select('*, artists(artist_id, artist_name), genres(genre_id, genre_name)')
        .order(sortColumn, { ascending: true, referencedTable: req.params.order === 'artist' ? 'artists' : req.params.order === 'genre' ? 'genres' : undefined });

    if (error) return res.status(500).json({ error: error.message });

    if (['artist', 'genre'].includes(req.params.order)) {
        data.sort((a, b) => {
            const valA = req.params.order === 'artist' ? a.artists.artist_name : a.genres.genre_name;
            const valB = req.params.order === 'artist' ? b.artists.artist_name : b.genres.genre_name;
            return valA.localeCompare(valB);
        });
    }

    res.json(data);
});

app.get('/songs/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('songs')
        .select()
        .eq('song_id', (req.params.ref))
    res.json(data);
})

app.get('/songs/search/begin/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*, artists (artist_name)')
        .ilike('title', `${req.params.substring}%`);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.get('/songs/search/any/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*, artists(artist_id, artist_name), genres(genre_id, genre_name)')
        .ilike('title', `%${req.params.substring}%`);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.get('/songs/search/year/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*, artists(artist_id, artist_name), genres(genre_id, genre_name)')
        .eq('year', req.params.substring)
        
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.get('/songs/artist/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*, artists(artist_id, artist_name), genres(genre_id, genre_name)')
        .eq('artist_id', req.params.ref)
        
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.get('/songs/genre/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*, artists(artist_id, artist_name), genres(genre_id, genre_name)')
        .eq('genre_id', req.params.ref)
        
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/artists');
});
