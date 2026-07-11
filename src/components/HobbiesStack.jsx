import React, { useState } from 'react';
import './HobbiesStack.css';

export default function HobbiesStack() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const hobbies = [
    {
      id: 'sports',
      title: 'Sports',
      desc: 'Playing as an all-rounder in cricket and orchestrating plays as a setter in volleyball.',
      glow: '#a855f7',
      image: '/hobbies_cricket.png'
    },
    {
      id: 'gaming',
      title: 'Gaming',
      desc: 'Competing in tactical FPS like Valorant and multiplayer battle royales like BGMI.',
      glow: '#6366f1',
      image: '/hobbies_gaming.jpg'
    },
    {
      id: 'hiking',
      title: 'Hiking',
      desc: 'Exploring outdoor nature trails, climbing scenic heights, and seeking adventure.',
      glow: '#14b8a6',
      image: '/hobbies_hiking.jpg'
    }
  ];

  return (
    <div className="hobbies-stack-viewport">
      <div className="hobbies-cards-stack">
        {hobbies.map((hobby, index) => {
          const isHovered = hoveredCard === hobby.id;
          return (
            <div
              key={hobby.id}
              className={`hobby-stack-card card-${hobby.id} ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(hobby.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                '--card-glow': hobby.glow,
                zIndex: isHovered ? 10 : index + 1
              }}
            >
              <div className="hobby-card-top">
                <img src={hobby.image} alt={hobby.title} className="hobby-card-image" loading="lazy" decoding="async" />
              </div>
              <div className="hobby-card-bottom">
                <h3 className="hobby-card-title">{hobby.title}</h3>
                <p className="hobby-card-desc">{hobby.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
