import React from 'react';

const CartItem = ({ item, removeFromCart }) => {
  const itemName = item && item.song && item.song.name;
  const imageUrl =
    item &&
    item.song &&
    item.song.album &&
    item.song.album.images &&
    item.song.album.images.length > 0
      ? item.song.album.images[0].url
      : null;

  return (
    <div style={{ border: '1px solid white', borderRadius: '8px', padding: '15px', margin: '10px' }}>
      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt={itemName}
            style={{
              width: '200px', 
              height: '200px', 
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <h3>{itemName}</h3>
          <p>Artist: {item.song.album.artists.map((artist) => artist.name).join(', ')}</p>
          <button onClick={() => removeFromCart(item)} className="remove-button">
            Remove
          </button>
        </>
      )}
    </div>
  );
};

const Cart = ({ cart, removeFromCart }) => {
  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh' }}>
      <h2>Shopping Cart</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
        ))}
      </div>
    </div>
  );
};

export default Cart;