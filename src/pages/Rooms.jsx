
import React, { useState } from 'react';
import { Chevron, HeartFill } from '../components/Icons.jsx';

const initialHouses = [
  {
    id: 1,
    title: 'Student House No. 1 Detailed Overview',
    price: 120.0,
    rating: 4,
    reviews: 131,
    image: '../src/images/3.jpg',
  },
  {
    id: 2,
    title: 'Student House No. 2 Detailed Overview',
    price: 45.3,
    rating: 4,
    reviews: 34,
    image: '../src/images/6.jpg',
  },
  {
    id: 3,
    title: 'Student House No. 3 - Detailed Overview',
    price: 45.3,
    rating: 4,
    reviews: 34,
    image: '../src/images/16.jpg',
  },
];

const banners = [
  { date: 'September 12-22', title: 'Empty room for today' },
  { date: 'October 1-15', title: 'New rooms available' },
  { date: 'November 3-10', title: 'Check-in for new students' },
];

function Stars({ n, reviews }) {
  return (
    <div className="stars">
      <span>{'★'.repeat(n)}</span>
      <em>{'★'.repeat(5 - n)}</em>
      <small>({reviews} reviews)</small>
    </div>
  );
}

export default function Rooms() {
  const [houseList, setHouseList] = useState(initialHouses);
  const [fav, setFav] = useState({});
  const [slide, setSlide] = useState(0);
  const [editingHouse, setEditingHouse] = useState(null);
  const [message, setMessage] = useState('');

  const go = (direction) => {
    setSlide(
      (current) =>
        (current + direction + banners.length) % banners.length
    );
  };

  const handleEdit = (house) => {
    setEditingHouse({ ...house });
    setMessage('');
  };

  const handleInputChange = (field, value) => {
    setEditingHouse((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!editingHouse.title.trim()) {
      setMessage('Please enter a room title.');
      return;
    }

    if (
      editingHouse.price === '' ||
      !Number.isFinite(Number(editingHouse.price)) ||
      Number(editingHouse.price) < 0
    ) {
      setMessage('Please enter a valid price.');
      return;
    }

    const updatedHouse = {
      ...editingHouse,
      title: editingHouse.title.trim(),
      price: Number(editingHouse.price),
      rating: Math.min(
        5,
        Math.max(1, Number(editingHouse.rating))
      ),
    };

    setHouseList((current) =>
      current.map((house) =>
        house.id === updatedHouse.id ? updatedHouse : house
      )
    );

    setEditingHouse(null);
    setMessage('');
  };

  const toggleFavorite = (id) => {
    setFav((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <div className="rooms-page">
      {/* Banner carousel */}
      <section className="hero">
        <button
          type="button"
          className="arrow l"
          onClick={() => go(-1)}
          aria-label="Previous banner"
        >
          <Chevron dir="left" />
        </button>

        <div className="hero-content">
          <small>{banners[slide].date}</small>
          <h2>{banners[slide].title}</h2>
          <p>Find your perfect student accommodation.</p>
        </div>

        <button
          type="button"
          className="arrow r"
          onClick={() => go(1)}
          aria-label="Next banner"
        >
          <Chevron dir="right" />
        </button>
      </section>

      {/* Page heading */}
      <div className="rooms-heading">
    
        <span className="room-count">
          {houseList.length} rooms
        </span>
      </div>

      {/* Room cards */}
      <section className="rooms">
        {houseList.map((house) => (
          <article className="room" key={house.id}>
            <div
              className="photo"
              style={{
                backgroundImage: `url("${house.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <span className="photo-badge">Student housing</span>

              <button
                type="button"
                className={`heart ${fav[house.id] ? 'on' : ''}`}
                onClick={() => toggleFavorite(house.id)}
                aria-label={
                  fav[house.id]
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
                aria-pressed={!!fav[house.id]}
              >
                <HeartFill />
              </button>
            </div>

            <div className="body">
              <div className="room-id">
                {house.id}
              </div>

              <h3>{house.title}</h3>

              <Stars
                n={house.rating}
                reviews={house.reviews}
              />

              <div className="room-footer">
                <div className="price">
                  <strong>${Number(house.price).toFixed(2)}</strong>
                  <span>/ stay</span>
                </div>

                <button
                  type="button"
                  className="btn-soft"
                  onClick={() => handleEdit(house)}
                >
                  <span aria-hidden="true">✎</span>
                  Edit Product
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Edit modal */}
      {editingHouse && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setEditingHouse(null);
              setMessage('');
            }
          }}
        >
          <div
            className="edit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-title"
          >
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">
                   #{editingHouse.id}
                </span>
                <h2 id="edit-title">Edit Product</h2>
                <p>Update your room information below.</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => {
                  setEditingHouse(null);
                  setMessage('');
                }}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave}>
              <label htmlFor="room-title">Room title</label>
              <input
                id="room-title"
                type="text"
                value={editingHouse.title}
                onChange={(e) =>
                  handleInputChange('title', e.target.value)
                }
                placeholder="Enter room title"
                required
              />

              <label htmlFor="room-price">Price ($)</label>
              <input
                id="room-price"
                type="number"
                min="0"
                step="0.01"
                value={editingHouse.price}
                onChange={(e) =>
                  handleInputChange('price', e.target.value)
                }
                placeholder="Enter price"
                required
              />

              <label htmlFor="room-rating">Rating</label>
              <select
                id="room-rating"
                value={editingHouse.rating}
                onChange={(e) =>
                  handleInputChange(
                    'rating',
                    Number(e.target.value)
                  )
                }
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} {rating === 1 ? 'star' : 'stars'}
                  </option>
                ))}
              </select>

              <label htmlFor="room-reviews">Number of reviews</label>
              <input
                id="room-reviews"
                type="number"
                min="0"
                value={editingHouse.reviews}
                onChange={(e) =>
                  handleInputChange(
                    'reviews',
                    Math.max(0, Number(e.target.value))
                  )
                }
                required
              />

              {message && (
                <p className="form-error" role="alert">
                  {message}
                </p>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setEditingHouse(null);
                    setMessage('');
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-save"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
