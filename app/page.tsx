import type { Metadata } from "next";
import HomePage from "./site/HomePage";

export const metadata: Metadata = {
  title: "برايد آيديا",
  description: "حلول ذكاء اصطناعي مؤسسية باللغة العربية. نحوّل تحديات مؤسستك إلى أنظمة ذكية تعمل من أجلك.",
  openGraph: { title: "برايد آيديا", description: "حلول ذكاء اصطناعي مؤسسية من صنعاء.", locale: "ar_YE", type: "website" },
};

export default function Home() { return <HomePage />; }
