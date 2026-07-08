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
      // SVG Silhouette of a Sports Trophy / Player
      svg: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#f8fafc" />
          {/* Trophy / Athlete Silhouette */}
          <path d="M35 30H65V38C65 48 58 55 50 55C42 55 35 48 35 38V30Z" fill="#0f172a" />
          <path d="M50 55V70H40V75H60V70H50V55Z" fill="#0f172a" />
          <path d="M35 34H30V40C30 45 34 47 35 47V34Z" fill="#0f172a" />
          <path d="M65 34H70V40C70 45 66 47 65 47V34Z" fill="#0f172a" />
          <circle cx="50" cy="40" r="3" fill="#f8fafc" />
        </svg>
      )
    },
    {
      id: 'gaming',
      title: 'Gaming',
      desc: 'Competing in tactical FPS like Valorant and multiplayer battle royales like BGMI.',
      glow: '#6366f1',
      // SVG Silhouette of a Game Controller / Arcade
      svg: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#f8fafc" />
          {/* Controller Silhouette */}
          <rect x="25" y="38" width="50" height="28" rx="14" fill="#0f172a" />
          <circle cx="36" cy="52" r="5" fill="#f8fafc" />
          <path d="M36 44V60M28 52H44" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="48" r="4" fill="#f8fafc" />
          <circle cx="68" cy="54" r="4" fill="#f8fafc" />
        </svg>
      )
    },
    {
      id: 'hiking',
      title: 'Hiking',
      desc: 'Exploring outdoor nature trails, climbing scenic heights, and seeking adventure.',
      glow: '#14b8a6',
      // SVG Silhouette of a Mountain Hiker
      svg: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#f8fafc" />
          {/* Mountain Silhouette */}
          <path d="M15 75L40 40L65 75H15Z" fill="#cbd5e1" />
          <path d="M45 75L65 50L85 75H45Z" fill="#94a3b8" />
          {/* Hiker Silhouette */}
          <circle cx="52" cy="38" r="4" fill="#0f172a" />
          <path d="M52 43L48 55L45 68" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 43L55 54L58 68" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          {/* Backpack */}
          <rect x="46" y="43" width="5" height="10" rx="1.5" fill="#0f172a" />
          {/* Staff */}
          <path d="M59 38L62 70" stroke="#0f172a" strokeWidth="1.5" />
        </svg>
      )
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
                {hobby.svg}
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
