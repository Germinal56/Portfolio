import Image from "next/image";
import { ProjectModalProps } from '@/lib/types';

const ProjectModal = ({ project, closeModal }:  ProjectModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60]">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => closeModal()}
      ></div>
      <div className="bg-white dark:bg-gray-800 relative max-w-4xl w-full flex flex-col sm:flex-row max-h-[80vh] overflow-y-auto mt-[10vh] mb-[10vh] sm:mt-0 sm:mb-0 sm:max-h-none">
        
        {/* X Button */}
        <button
          className="absolute top-2 right-2 text-3xl z-[70] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={() => closeModal()}
        >
          &#10005;
        </button>
        
        {/* Image Section */}
        <div className="w-full sm:flex-1 relative">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={600}
            className="mb-2 sm:mb-0"
            style={{ 
              objectFit: "cover",
              filter: "saturate(1.5)"
            }}
          />
        </div>
        
        {/* Text Section */}
        <div className="w-full sm:w-[300px] px-6 pb-4 sm:py-8">
          <h3 className="text-2xl font-bold mt-2 sm:mt-0 mb-4 font-playfair">{project.title}</h3>
          <div className="text-gray-700 dark:text-gray-300 mb-2">
            {project.description.split("\n").map((line, index) => (
              <p key={index} className="mb-2">
                {line}
              </p>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-red-800 mb-2 sm:mb-0 font-latoBold text-white px-4 py-2 hover:bg-red-900 text-center sm:text-left w-full sm:w-auto"
            >
              Check it out
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
