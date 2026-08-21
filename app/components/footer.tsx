"use client";

import React from "react";
import { FaXTwitter, FaGithub, FaInstagram, FaRss, FaLinkedinIn } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { metaData, socialLinks } from "../lib/config";

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="bg-[var(--color-brutal-surface)] text-[var(--color-brutal-text)] border-2 border-[var(--color-brutal-border)] p-2 md:p-3 shadow-[var(--shadow-brutal)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[var(--shadow-brutal-lg)] hover:bg-[var(--color-brutal-yellow)] hover:text-black transition-all flex items-center justify-center group"
    >
      <Icon className="text-base md:text-xl group-hover:scale-110 transition-transform" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-brutal-bg-alt)] border-t-4 border-[var(--color-brutal-border)] text-[var(--color-brutal-text-alt)] mt-auto pt-10 pb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1 md:gap-2">
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-brutal-yellow)] text-2xl md:text-4xl font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {metaData.title}
            </a>
            <span className="font-bold uppercase tracking-wider text-[10px] md:text-sm opacity-80">
              © {YEAR} ALL RIGHTS RESERVED.
            </span>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <SocialLink href={socialLinks.twitter} icon={FaXTwitter} label="X / Twitter" />
            <SocialLink href={socialLinks.github} icon={FaGithub} label="GitHub" />
            <SocialLink href={socialLinks.instagram} icon={FaInstagram} label="Instagram" />
            <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn} label="LinkedIn" />
            <SocialLink href={socialLinks.email} icon={TbMailFilled} label="Email" />
            <SocialLink href="/rss.xml" icon={FaRss} label="RSS feed" />
          </div>
        </div>
    </footer>
  );
}