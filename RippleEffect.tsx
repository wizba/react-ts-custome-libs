import React, { CSSProperties, useRef } from 'react';
import './RippleEffect.css';

// Define the props for the RippleEffectWrapper component
interface RippleEffectWrapperProps {
  children: React.ReactNode; // The children elements that will be wrapped by the ripple effect
  style?: CSSProperties; // Optional style prop to apply custom styles to the wrapper
  className?: string; // Optional className prop to apply custom classes to the wrapper
}

// RippleEffectWrapper component definition
const RippleEffectWrapper: React.FC<RippleEffectWrapperProps> = ({ children, style, className }) => {
  // Create a ref to access the container element
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to create the ripple effect
  const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    // Create a span element to represent the ripple
    const circle = document.createElement('span');
    const diameter = Math.max(container.clientWidth, container.clientHeight);
    const radius = diameter / 2;

    // Calculate the position of the ripple based on the click event
    const rect = container.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    // Set the size and position of the ripple
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${offsetX - radius}px`;
    circle.style.top = `${offsetY - radius}px`;
    circle.classList.add('ripple');

    // Remove any existing ripple elements
    const ripple = container.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    // Append the new ripple to the container
    container.appendChild(circle);
  };

  return (
    // Render the wrapper div with the ripple effect and pass down the props
    <div ref={containerRef} className={`ripple-container ${className || ''}`} style={style} onClick={createRipple}>
      {children}
    </div>
  );
};

export default RippleEffectWrapper;
