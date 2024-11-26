import React, { useEffect, useRef } from 'react';
import { ArrowProps } from '@/lib/types'

const Arrow: React.FC<ArrowProps> = ({ callButtonRef, screenWidth, startRef }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const updatePath = () => {
      const button = callButtonRef.current;
      const svg = svgRef.current;
      const gianlucaElement = startRef.current;

      if (!button || !svg || !gianlucaElement) return;

      const buttonRect = button.getBoundingClientRect();
      const gianlucaRect = gianlucaElement.getBoundingClientRect();

      let arrowEndX, arrowEndY;
      let startX, startY;
      let cp1X, cp1Y, cp2X, cp2Y;
      let arrowHeadPath;
      let arrowHeadAngle;

      if (screenWidth < 640) {
        // Small screen case
        arrowEndX = buttonRect.left - 30;

        // Adjust arrowEndX to finish slightly before the arrowhead (20px to the right)
        arrowEndX += 10;
        arrowEndY = buttonRect.top + buttonRect.height / 2;

        // Start at 10vh from bottom and 15vw from left
        startX = window.innerWidth * 0.15;
        startY = window.innerHeight * 0.90;

        cp1X = startX;
        cp1Y = startY - 100;
        cp2X = arrowEndX - 90; // Adjusted for smooth curve
        cp2Y = arrowEndY;

        // Arrowhead points right
        arrowHeadPath = 'M0,0 L-17,-12 L-17,12 Z';
        arrowHeadAngle = Math.atan2(arrowEndY - cp2Y, arrowEndX - cp2X) * (180 / Math.PI);
      } else {
        // Large screen case
        arrowEndX = buttonRect.right + 30;

        // Adjust arrowEndX to finish slightly before the arrowhead (20px to the left)
        arrowEndX += 10;
        arrowEndY = buttonRect.top + buttonRect.height / 2;

        // Start at the same vertical position as the "Gianluca" text
        startY = gianlucaRect.top + gianlucaRect.height / 2;

        // Horizontal position: midway between Gianluca's right edge and the right edge of the screen
        const rightEdge = screenWidth;
        const gianlucaRightEdge = gianlucaRect.right;
        startX = gianlucaRightEdge + (rightEdge - gianlucaRightEdge) / 2;

        // Adjust control points for a rounder curve
        cp1X = startX - 100; // Move left
        cp1Y = startY + 300; // Move down for a bigger radius
        cp2X = arrowEndX + 200; // Move right
        cp2Y = arrowEndY;

        // Arrowhead points left
        arrowHeadPath = 'M0,0 L-20,-15 L-20,15 Z'; // Flipped to point left
        arrowHeadAngle = Math.atan2(arrowEndY - cp2Y, arrowEndX - cp2X) * (180 / Math.PI);
      }

      const newPathD = `M ${startX},${startY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${arrowEndX},${arrowEndY}`;

      const pathElement = svg.querySelector('path');
      if (pathElement) {
        pathElement.setAttribute('d', newPathD);

        const length = (pathElement as SVGPathElement).getTotalLength();

        // Set up the dash array and offset
        pathElement.style.strokeDasharray = `${length}`;
        pathElement.style.strokeDashoffset = `${length}`;

        // Force reflow to restart animation
        void pathElement.getBoundingClientRect();

        // Apply animation
        requestAnimationFrame(() => {
          pathElement.style.transition = 'stroke-dashoffset 0.7s ease-in-out';
          pathElement.style.strokeDashoffset = '5';
        });
      }

      // Adjust the arrowhead
      const arrowhead = svg.querySelector('.arrowhead path') as SVGPathElement;
      if (arrowhead) {
        arrowhead.setAttribute('d', arrowHeadPath);
        arrowhead.setAttribute(
          'transform',
          `translate(${arrowEndX}, ${arrowEndY}) rotate(${arrowHeadAngle})`
        );

        // Hide the arrowhead initially
        arrowhead.style.opacity = '0';

        // Force reflow
        void arrowhead.getBoundingClientRect();

        // Apply transition
        requestAnimationFrame(() => {
            setTimeout(() => {
              arrowhead.style.transition = 'opacity 0.2s ease-in';
              arrowhead.style.opacity = '1';
            }, 600); // Delay of 1.1 seconds
        });
      }
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [callButtonRef, screenWidth, startRef]);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      className="arrow dark:grayscale"
    >
      <path
        d=""
        stroke="#bd9f02"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <g className="arrowhead">
        <path
          d=""
          fill="#bd9f02"
        />
      </g>
    </svg>
  );
};

export default Arrow;
