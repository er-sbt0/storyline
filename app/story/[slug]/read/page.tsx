import { notFound } from "next/navigation";
import { Reader } from "@/components/Reader";
import { SCENES, SENTENCES, STORIES, getStory } from "@/lib/stories";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/story/[slug]/read">) {
  const { slug } = await params;
  const story = getStory(slug);
  return story ? { title: `${story.es} — Storyline` } : {};
}

export default async function ReaderPage({
  params,
}: PageProps<"/story/[slug]/read">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  // Only La Caperucita Roja has authored text so far; every story reads it
  // until the rest are written, so the reader can be exercised from any card.
  return <Reader story={story} scenes={SCENES} sentences={SENTENCES} />;
}
