import { useState } from 'react';

const generatePetals = () => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return [];
  }
  const colors = [
    'rgba(201, 164, 92, 0.45)', // Antique gold
    'rgba(236, 200, 117, 0.5)',  // Bright champagne
    'rgba(217, 83, 79, 0.35)',   // Rose petal
    'rgba(245, 158, 11, 0.4)',   // Marigold yellow
  ];

  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: Math.random() * 95,
    delay: Math.random() * 7,
    duration: 10 + Math.random() * 12,
    size: 10 + Math.random() * 12,
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
};

export const PetalShower = () => {
  const [petals] = useState(generatePetals);

  if (petals.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-10 select-none opacity-60"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute rounded-full inline-block"
          style={{
            left: `${petal.left}vw`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.4}px`,
            backgroundColor: petal.color,
            borderRadius: '70% 30% 70% 30% / 60% 40% 60% 40%',
            filter: 'blur(0.4px)',
            animation: `petalFall ${petal.duration}s infinite linear`,
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes petalFall {
          0% {
            top: -5%;
            transform: translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            top: 105%;
            transform: translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
