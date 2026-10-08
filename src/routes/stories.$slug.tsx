import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { STORIES } from "@/data/site";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = STORIES.find((s) => s.slug === params.slug);
    if (!story) throw notFound();
    return story;
  },
  component: StoryPage,
});

function StoryPage() {
  const story = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
        {story.category}
      </p>
      <h1 className="mt-2 font-serif text-4xl font-bold text-forest">{story.title}</h1>
      <img
        src={story.image}
        alt=""
        className="my-8 h-72 w-full rounded-3xl object-cover"
      />
      <div className="space-y-5 text-base leading-relaxed text-forest-deep">
        {story.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <Link to="/stories" className="mt-10 inline-block text-sm font-semibold text-forest">
        ← All stories
      </Link>
    </article>
  );
}
