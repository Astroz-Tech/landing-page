export interface Project {
  title: string;
  year: number;
  description: {
    id: string;
    en: string;
  };
  url: string;
  tech: string[];
  role?: {
    id: string;
    en: string;
  };
  status?: "Completed" | "In Progress" | "Planned" | "On Hold" | "Live Development" | "Archived";
}

export const projects: Project[] = [
  {
    title: "Astro-Search",
    year: 2026,
    description: {
      id: "Platform untuk menemukan dan melakukan Cite Jurnal secara gratis dengan jaringan data yang luas serta antarmuka yang ramah pengguna.",
      en: "A platform for finding and citing journal articles for free, featuring an extensive database and a user-friendly interface."
    },
    url: "https://github.com/AxelMatthew12/Astro-Search.git",
    tech: ["React", "Tailwind CSS", "PostgreSQL", "Python"],
    role: { id: "Pengembang Fullstack", en: "Fullstack Developer" },
    status: "Live Development",
  },
];