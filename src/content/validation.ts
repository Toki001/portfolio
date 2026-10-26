import type { Project } from "./projects";

export function validateProjects(
  projects: Pick<
    Project,
    "id" | "slug" | "title" | "description" | "links" | "media"
  >[],
) {
  const ids = new Set<string>();
  for (const project of projects) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) ||
      project.id !== project.slug
    )
      throw new Error(`Invalid stable slug: ${project.slug}`);
    if (ids.has(project.slug))
      throw new Error(`Duplicate project: ${project.slug}`);
    ids.add(project.slug);
    if (!project.title.trim() || !project.description.trim())
      throw new Error(`Missing project content: ${project.slug}`);
    for (const url of Object.values(project.links)) {
      if (url && !url.startsWith("https://"))
        throw new Error(`Unsafe external link: ${project.slug}`);
    }
    for (const media of project.media) {
      if (
        !media.src ||
        !media.alt.trim() ||
        media.width <= 0 ||
        media.height <= 0
      )
        throw new Error(`Invalid media: ${project.slug}`);
    }
  }
}
