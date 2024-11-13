"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import { Project, ProjectStyle } from '@/lib/types';
import { projects, projectStylesMobile, projectStylesDesktop, doProjectsOverlap, adjustProjectPosition } from './utils';
import ProjectItem from './ProjectItem';
import ProjectModal from './ProjectModal';

export default function ProjectsShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Detect screen width to switch styles
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projectStyles = useMemo(() => isMobile ? projectStylesMobile : projectStylesDesktop, [isMobile]);

  // Initialize adjustedStyles with projectStyles
  const [adjustedStyles, setAdjustedStyles] = useState<ProjectStyle[]>(
    projectStyles.map((style) => ({ ...style }))
  );

  // Update adjustedStyles when isMobile changes
  useEffect(() => {
    setAdjustedStyles(projectStyles.map((style) => ({ ...style })));
  }, [projectStyles]);

  // Update adjustedStyles when hoveredIndex changes
  useEffect(() => {
    setAdjustedStyles((prevAdjustedStyles) => {
      let newAdjustedStyles = prevAdjustedStyles.map((style) => ({ ...style }));
  
      if (hoveredIndex !== null) {
        // Adjust the hovered project
        const hoveredStyle = { ...newAdjustedStyles[hoveredIndex] };
        const baseStyle = projectStyles[hoveredIndex];
        const scaleFactor = hoveredStyle.scaleFactor || 1.3; // Use scaleFactor or default to 1.3
  
        const maxWidth = baseStyle.width * scaleFactor;
        const maxHeight = baseStyle.height * scaleFactor;
  
        let newWidth = hoveredStyle.width * 1.3;
        let newHeight = hoveredStyle.height * 1.3;
  
        // Ensure new dimensions do not exceed maximum allowed dimensions
        if (newWidth > maxWidth) {
          newWidth = hoveredStyle.width;
        }
        if (newHeight > maxHeight) {
          newHeight = hoveredStyle.height;
        }
  
        const deltaWidth = (newWidth - hoveredStyle.width) / 2;
        const deltaHeight = (newHeight - hoveredStyle.height) / 2;
  
        hoveredStyle.width = newWidth;
        hoveredStyle.height = newHeight;
        hoveredStyle.left -= deltaWidth;
        hoveredStyle.top -= deltaHeight;
        hoveredStyle.zIndex = 2;
        hoveredStyle.transition = "all 0.3s";
  
        newAdjustedStyles[hoveredIndex] = hoveredStyle;
  
        // Initialize sets and queues
        const adjustedIndices = new Set<number>();
        const queue: number[] = [];
  
        // First pass: Adjust projects overlapping with the hovered project
        for (let i = 0; i < newAdjustedStyles.length; i++) {
          if (i === hoveredIndex) continue;
          if (doProjectsOverlap(newAdjustedStyles[i], hoveredStyle)) {
            adjustProjectPosition(newAdjustedStyles, i, hoveredIndex);
            adjustedIndices.add(i);
            queue.push(i);
          }
        }
  
        // Process the queue recursively
        while (queue.length > 0) {
          const currentIndex = queue.shift()!;
          for (let i = 0; i < newAdjustedStyles.length; i++) {
            if (
              i === currentIndex ||
              i === hoveredIndex ||
              adjustedIndices.has(i)
            )
              continue;
            if (
              doProjectsOverlap(
                newAdjustedStyles[currentIndex],
                newAdjustedStyles[i]
              )
            ) {
              adjustProjectPosition(newAdjustedStyles, i, currentIndex);
              adjustedIndices.add(i);
              queue.push(i);
            }
          }
        }
      } else {
        // Smoothly transition back to initial positions
        newAdjustedStyles = newAdjustedStyles.map((style, index) => {
          const initialStyle = projectStyles[index];
          return {
            ...style,
            width: initialStyle.width,
            height: initialStyle.height,
            left: initialStyle.left,
            top: initialStyle.top,
            zIndex: 1,
            transition: "all 0.3s",
          };
        });
      }
  
      return newAdjustedStyles;
    });
  }, [hoveredIndex, projectStyles]);
  
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModalProject(null);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalProject(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <section className="px-4 mt-0 sm:mt-8 sm:mt-[-10px] lg:px-32 sm:px-12 overflow-hidden h-full w-full flex justify-center">
      {/* Projects Layout */}
      <div className="relative w-full h-[700px] my-auto mx-auto">
        {projects.map((project, index) => {
          const style = adjustedStyles[index];
          return (
            <ProjectItem
              key={index}
              index={index}
              style={style}
              project={project}
              setHoveredIndex={setHoveredIndex}
              setModalProject={setModalProject}
            />
          );
        })}
      </div>

      {/* Modal Popup */}
      {modalProject && (
        <div ref={modalRef}>
            <ProjectModal
            closeModal={() => setModalProject(null)}
            project={modalProject}
            />
        </div>
        )
      }
    </section>
  );
}
