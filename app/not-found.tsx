import Link from "next/link";
import { getContent } from "./content";
import { PageFrame } from "./site/shared";

export default async function NotFound() {
  const { t: { notFound } } = await getContent();
  return <PageFrame><main id="main-content" className="pi-wrap pi-not-found"><b>{notFound.code}</b><h1>{notFound.title}</h1><p>{notFound.text}</p><Link className="pi-button" href="/">{notFound.button}</Link></main></PageFrame>;
}
