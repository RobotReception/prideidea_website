"use client";

import { useEffect } from "react";

export default function ScrollMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(#top)"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.reveal = "visible";
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0, rootMargin: "0px 0px -35px 0px" });
    for (const element of elements) {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.dataset.reveal = "pending";
        observer.observe(element);
      }
    }
    const clear = () => { observer.disconnect(); elements.forEach((element) => delete element.dataset.reveal); };
    media.addEventListener("change", clear);
    return () => { clear(); media.removeEventListener("change", clear); };
  }, []);
  return null;
}
