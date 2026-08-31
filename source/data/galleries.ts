import type { ImageMetadata } from "astro";
import { z } from "astro/zod";
import galleryData from "./galleries.json";

const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().trim().optional(),
});

const gallerySchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  type: z.enum(["photos", "projects"]),
  cover: z.string().min(1),
  sections: z.array(
    z.object({
      columns: z.array(z.array(imageSchema)).min(1).max(2),
    }),
  ).min(1),
});

const galleryListSchema = z.array(gallerySchema).superRefine((items, context) => {
  const slugs = new Set<string>();

  items.forEach((gallery, index) => {
    if (slugs.has(gallery.slug)) {
      context.addIssue({
        code: "custom",
        message: `Duplicate gallery slug: ${gallery.slug}`,
        path: [index, "slug"],
      });
    }

    slugs.add(gallery.slug);
  });
});

const assetModules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/**/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

function resolveAsset(path: string): ImageMetadata {
  const key = `../assets/images/${path}`;
  const asset = assetModules[key]?.default;

  if (!asset) {
    throw new Error(`Gallery image does not exist: ${path}`);
  }

  return asset;
}

export type GalleryImage = {
  path: string;
  alt: string;
  asset: ImageMetadata;
};

export type GallerySection = {
  columns: GalleryImage[][];
};

export type Gallery = {
  slug: string;
  title: string;
  type: "photos" | "projects";
  cover: ImageMetadata;
  sections: GallerySection[];
};

export const galleries: Gallery[] = galleryListSchema.parse(galleryData).map((gallery) => {
  let imageNumber = 0;

  return {
    ...gallery,
    cover: resolveAsset(gallery.cover),
    sections: gallery.sections.map((section) => ({
      columns: section.columns.map((column) => column.map((image) => {
        imageNumber += 1;

        return {
          path: image.src,
          asset: resolveAsset(image.src),
          alt: image.alt || `Untitled photograph ${imageNumber} from “${gallery.title}”.`,
        };
      })),
    })),
  };
});
