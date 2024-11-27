export interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
}
  
export interface ProjectStyle {
    width: number;
    height: number;
    top: number;
    left: number;
    scaleFactor?: number;
    zIndex?: number;
    transition?: string;
}

export interface ProjectItemProps {
    index: number;
    style: ProjectStyle;
    project: Project;
    setHoveredIndex: (index: number | null) => void;
    setModalProject: (project: Project) => void;
}  

export interface ProjectModalProps {
    project: Project; 
    closeModal: () => void; 
}

export interface FormData {
    name: string;
    surname: string;
    email: string;
    message: string;
}

export interface ArrowProps {
    callButtonRef: React.RefObject<HTMLAnchorElement>;
    screenWidth: number;
    startRef: React.RefObject<HTMLHeadingElement>;
}

export interface BlogPost {
    title: string;
    snippet: string;
    image?: string;
    categories: string[];
    readCount: number;
}

// Interaction interface

export interface Interaction {
    eventType: string;
    timestamp: Date;
    duration?: number;
}

export interface Session {
    sessionId: string;
    startTime: Date;
    endTime: Date | null;
    interactions: Interaction[];
    pagesVisited: string[];
    ABLabel: string;
    deviceType?: string;
    browser?: string;
    operatingSystem?: string;
    city?: string;
    region?: string;
    country?: string;
    referrer?: string;
    scrollDepth?: number;
    timeOnPage?: number;
    networkInfo?: { connectionType: string; downloadSpeed: number };
}

export interface User extends Document {
    anonId: string;
    sessions: Session[];
}