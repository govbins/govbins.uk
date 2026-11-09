import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

// See the comment at the top of src/data/councils.yaml
const councils = defineCollection({
  loader: file("src/data/councils.yaml"),
  schema: z.object({
    name: z.string(),
    name_cy: z.string().optional(),
    official_name: z.string(),
    official_name_cy: z.string().optional(),
    type: z.enum([
      "county",
      "district",
      "unitary",
      "metropolitan-district",
      "london-borough",
      "city-of-london",
    ]),
    nation: z.enum(["england", "scotland", "wales", "northern-ireland"]),
    gss: z.string().optional(),
    county: z.string().optional(),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    successors: z.array(z.string()).default([]),
    renamed: z.boolean().optional(),
    legacy_code: z.string().optional(),
  }),
});

// One file per bin photo in src/content/bins
const bins = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "src/content/bins" }),
  schema: ({ image }) =>
    z.object({
      // a council id, or a list for a bin shared by several councils
      council: z
        .union([z.string(), z.array(z.string())])
        .transform((v) => (Array.isArray(v) ? v : [v])),
      image: image(),
      photographed: z.coerce.date().optional(),
      contributor: z
        .object({ name: z.string(), url: z.string().url().optional() })
        .optional(),
      // sort order and colour family, e.g. 220-blue
      colour: z
        .string()
        .regex(/^\d{3}-[a-z-]+$/)
        .optional(),
      // an older design for a council that still exists
      old_design: z
        .union([z.literal(true), z.object({ until: z.number().int() })])
        .optional(),
    }),
});

export const collections = { councils, bins };
