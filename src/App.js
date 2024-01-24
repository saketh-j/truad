import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';


const App = () => {
  const [cart, setCart] = useState([]);
  const [albums, setAlbums] = useState([]);

  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemToRemove.id));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/home"
          element={<Home cart={cart} setCart={setCart} setAlbums={setAlbums} />}
        />
        <Route
          path="/cart"
          element={
            <div>
              <Cart cart={cart} albums={albums} removeFromCart={removeFromCart} />
            
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
