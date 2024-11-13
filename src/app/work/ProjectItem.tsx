import { useState } from "react";
import Image from "next/image";
import { ProjectItemProps } from '@/lib/types';

function ProjectItem({
  index,
  style,
  project,
  setHoveredIndex,
  setModalProject,
}: ProjectItemProps) {
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({
    transform: "translate(0, 0)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left; // x position within the element
    const yPos = e.clientY - rect.top; // y position within the element

    // Calculate the percentage position
    const xPercent = (xPos / rect.width) * 100;
    const yPercent = (yPos / rect.height) * 100;

    // Adjust the transform accordingly (stronger parallax effect)
    const translateX = (xPercent - 50) / 5; // Reduced divisor for stronger effect
    const translateY = (yPercent - 50) / 5;

    setTransformStyle({
      transform: `translate(${translateX}%, ${translateY}%) scale(1.2)`,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: "translate(0, 0)",
    });
    setHoveredIndex(null);
  };

  const handleMouseEnter = () => {
    setHoveredIndex(index);
  };

  return (
    <div
      className="group overflow-hidden absolute cursor-pointer hover:shadow-2xl"
      style={{
        width: `${style.width}%`,
        height: `${style.height}%`,
        top: `${style.top}%`,
        left: `${style.left}%`,
        zIndex: style.zIndex,
        transition: style.transition,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setModalProject(project)}
    >
      <div className="group relative w-full h-full overflow-hidden object-center object-cover">
        <div className="transition-all grayscale relative w-full h-full group-hover:grayscale-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 50vw, 30vw"
            className="transition-transform duration-100 z-0 bg-white"
            style={{
              ...transformStyle,
              filter: "saturate(1.2) contrast(1.2)",
              objectFit: "cover",
            }}
          />
        </div>
        {/* Semi-Transparent Overlay */}
        <div
          className="absolute inset-0 z-1 opacity-[0.4] dark:opacity-[0.2] group-hover:opacity-0 transition-opacity"
          style={{
            backgroundColor: "var(--background)",
            mixBlendMode: "hard-light",
          }}
        ></div>
      </div>
    </div>
  );
}

export default ProjectItem;