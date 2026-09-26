import { pageMetadata } from "./content";
import HomePage from "./site/HomePage";

export const generateMetadata = () => pageMetadata((t) => t.home.meta, { absoluteTitle: true });

export default function Home() { return <HomePage />; }
