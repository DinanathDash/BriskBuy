import React from 'react';
import Orb from './Orb';

const OrbLoader = ({ 
  size = 150, 
  className = '',
  hue = 220,
  hoverIntensity = 0.3,
  rotateOnHover = false,
  forceHoverState = true
}) => {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
      }}
    >
      <Orb
        hue={hue}
        hoverIntensity={hoverIntensity}
        rotateOnHover={rotateOnHover}
        forceHoverState={forceHoverState}
      />
    </div>
  );
};

export default OrbLoader;
