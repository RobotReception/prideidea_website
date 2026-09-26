"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealSections() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("main > section.pi-section, main > section.pi-wrap, main > .pi-wrap > .pi-cta-band"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        (entry.target as HTMLElement).dataset.reveal = "visible";
        observer.unobserve(entry.target);
      }
    }, { threshold: .08, rootMargin: "0px 0px -7% 0px" });
    for (const target of targets) {
      target.dataset.reveal = target.getBoundingClientRect().top > window.innerHeight * .85 ? "pending" : "visible";
      if (target.dataset.reveal === "pending") observer.observe(target);
    }
    return () => { observer.disconnect(); for (const target of targets) delete target.dataset.reveal; };
  }, [pathname]);

  return null;
}
