// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import base64 from 'base-64';

const SongCard = ({ song, addToCart }) => {
  const albumName = song.name;
  const imageUrl = song.images && song.images.length > 0 ? song.images[0].url : null;

  return (
    <div style={{ border: '1px solid white', borderRadius: '8px', padding: '15px', margin: '10px' }}>
      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt={albumName}
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <h3>{albumName}</h3>
          <p>Artist: {song.artists.map((artist) => artist.name).join(', ')}</p>
          <button onClick={() => addToCart(song)} className="buy-button">
            Buy
          </button>
        </>
      )}
    </div>
  );
};

const Home = ({ cart, setCart }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const clientId = '45444b27cdfe46b8a8d2aa253e4ec8d0';
    const clientSecret = '8c74a84025f34cbdb637d5a887627760';
    const encodedCredentials = base64.encode(`${clientId}:${clientSecret}`);

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: 'grant_type=client_credentials',
    })
      .then((response) => response.json())
      .then((data) => {
        const accessToken = data.access_token;

        fetch('https://api.spotify.com/v1/browse/new-releases?country=SE&limit=10&offset=5', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((newReleasesData) => {
            setSongs(newReleasesData.albums.items);
          })
          .catch((error) => {
            console.error('Error fetching data from Spotify API:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching access token from Spotify API:', error);
      });
  }, []);

  const addToCart = (song) => {
    setCart((prevCart) => [...prevCart, { id: song.id, song: { ...song } }]);
  };

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '1' }}>
        <p style={{ color: 'white', textDecoration: 'none', fontSize: '2.5rem',fontWeight:"bold", margin: '0', padding: '0', cursor: 'pointer',  }} className="truad-text">
          TruAd
        </p>
      </div>
      <div style={{ position: 'absolute', top: '40px', right: '10px', zIndex: '1' }}>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', padding: '10px', border: '1px solid white', borderRadius: '5px', transition: 'color 0.3s', marginTop: '10px' }} className="go-to-cart">
          Go to Cart
        </Link>
      </div>
      <h2 style={{ marginBottom: '20px' }}>Home Page</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;
