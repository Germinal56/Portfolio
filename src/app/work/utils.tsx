import { Project, ProjectStyle } from '@/lib/types';

export const projects: Project[] = [
  /*{
    title: "Project Solomon",
    description:
      "Project Solomon is an ambitious B2B service inspired by GPT-Engineer, designed to create modular codebases using three specialized AI models. \nIts goal is to minimize code review and integration testing efforts, to empower small teams and tech solopreneurs to ship new features faster. \nCurrently in development.",
    image: "/projects/solomone.webp",
    link: "", //"https://github.com/Germinal56/project-solomon" add after some commits
  },*/
  {
    title: "Market Game",
    description:
      "Browser videogame that simulates market trends in a randomized pattern. It can be played with one single button from desktop and mobile. \nPlaying it more than four times (roughly two minutes) teaches you important concepts of investments and improves your psychology intuitively without missing real deals.\nIt is tough to beat the market, 94.6% of the professionals cannot do it.\nHINT: Try different strategies and find what works consistently: buy low, sell high; frequent trading; one single long position, etc...\n",
    image: "/projects/marketgame.webp",
    link: "https://germinal56.github.io/beat_market_game/",
  },
  {
    title: "BJJ Prishtina",
    description:
      "Developed the official website for Kosovo's Brazilian Jiu-Jitsu community.",
    image: "/projects/bjj-sm.webp",
    link: "https://www.bjjprishtina.org",
  },
  {
    title: "Geraldone SaaS",
    description:
      "Geraldone is a comprehensive investment tax calculation software for the Italian market, serving users of both traditional and crypto brokers. \nDeployed. Independently developed using Express.js, Next.js, NoSQL, and AWS Cloud.\nWhy people love it? \nIt offers razor-sharp precision, ease of use, speed, and convenience, along with the added benefit of providing data analytics to track and optimize your investments.",
    image: "/projects/g-logo-idle.webp",
    link: "https://www.geraldone.com",
  },
  {
    title: "Reversed Flat Search",
    description:
      "Created a successful viral ad campaign in Berlin by marketing myself as a flatmate, effectively reversing the traditional apartment search process.\nThis idea earned me features in Business Punk magazine, an interview with a journalist from Der Spiegel, and even a few groupies.",
    image: "/projects/reverseflat.webp",
    link: "https://www.business-punk.com/2019/02/wohnungssuche/",
  },
  {
    title: "Kosovo Stroytelling",
    description:
      "After deciding to move to Kosovo, I began writing about the country and offering historical tours of Prishtina, which led to an interview on national television.\nThe independent Republic of Kosovo is a beautiful country with fantastic people who endured the atrocities of a terrible, unjust war. They continue to suffer today due to unjust propaganda. \nIn my own small way, I aim to make a difference by sharing the truth about this nation.",
    image: "/projects/tv.webp",
    link: "https://fb.watch/vJwJx_6sgF/?mibextid=WC7FNe",
  },
  {
    title: "Honest Investments",
    description:
      "Condensing 10 years of investment experience and financial education, I authored a book to help people start investing independently.\nNo gurus, no banks—just you.\nThis book aims to eliminate doubts and barriers through targeted financial education. \nIt has already helped many.\nSpoiler: Investing is NOT just for the rich; that's just another excuse. Investing is the #1 tool for achieving financial independence.\nEdoardo Di Lella, CEO of Starting Finance, Italy’s top financial education channel, said: \"I saw your content and liked it very much.\"",
    image: "/projects/book.webp",
    link: "/work/honest-investments"//"https://gianlucafornaciari.com/the-guide",
  },
];

 // Define positions and sizes for each project using percentages
export const projectStylesMobile: ProjectStyle[] = [
  { width: 45, height: 28, top: 9, left: 0 },
  { width: 45, height: 19, top: 1, left: 47 },
  { width: 100, height: 26, top: 38, left: 0 },
  { width: 51, height: 16, top: 21, left: 47 },
  { width: 48, height: 28, top: 65, left: 47 },
  { width: 40, height: 24, top: 65, left: 5 },
];

export const projectStylesDesktop: ProjectStyle[] = [
  { width: 28, height: 40, top: 10.5, left: 0 },
  { width: 23, height: 35, top: 52, left: 5 },
  { width: 40, height: 50, top: 40, left: 29 },
  { width: 30, height: 33, top: 5.5, left: 29 },
  { width: 28, height: 45, top: 40, left: 70 },
  { width: 35, height: 28, top: 10.5, left: 60 },
];
  

// Helper functions with TypeScript types
export function doProjectsOverlap(
  projA: ProjectStyle,
  projB: ProjectStyle
): boolean {
  return !(
    projA.left + projA.width <= projB.left ||
    projA.left >= projB.left + projB.width ||
    projA.top + projA.height <= projB.top ||
    projA.top >= projB.top + projB.height
  );
}

export function adjustProjectPosition(
  adjustedStyles: ProjectStyle[],
  indexToAdjust: number,
  referenceIndex: number
): void {
  const refProj = adjustedStyles[referenceIndex];
  const proj = adjustedStyles[indexToAdjust];

  const dx = refProj.left + refProj.width / 2 - (proj.left + proj.width / 2);
  const dy = refProj.top + refProj.height / 2 - (proj.top + proj.height / 2);

  const totalWidth = (refProj.width + proj.width) / 2;
  const totalHeight = (refProj.height + proj.height) / 2;

  const overlapX = totalWidth - Math.abs(dx);
  const overlapY = totalHeight - Math.abs(dy);

  if (overlapX > 0 && overlapY > 0) {
    // Collision detected
    if (overlapX < overlapY) {
      const shiftX = overlapX + 0.5;
      if (dx > 0) {
        proj.left -= shiftX; // Move left
      } else {
        proj.left += shiftX; // Move right
      }
    } else {
      const shiftY = overlapY + 0.5;
      if (dy > 0) {
        proj.top -= shiftY; // Move up
      } else {
        proj.top += shiftY; // Move down
      }
    }
    proj.zIndex = 1;
    proj.transition = "all 0.3s";
  }
}
