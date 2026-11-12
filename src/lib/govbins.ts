import { getCollection, type CollectionEntry } from "astro:content";

// The date the site is built for. Councils are current, abolished or
// upcoming relative to this. GOVBINS_TODAY=2027-04-01 previews a future date.
export const today: string =
  process.env.GOVBINS_TODAY || new Date().toISOString().slice(0, 10);

const iso = (d?: Date) => (d ? d.toISOString().slice(0, 10) : undefined);

export const formatDate = (d: Date | string) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export type Status = "current" | "abolished" | "upcoming";

export interface Council {
  id: string;
  name: string;
  nameCy?: string;
  officialName: string;
  type: CollectionEntry<"councils">["data"]["type"];
  nation: CollectionEntry<"councils">["data"]["nation"];
  gss?: string;
  start?: string;
  end?: string;
  /** the day the successor councils took over */
  replacedOn?: string;
  renamed: boolean;
  status: Status;
  collectsBins: boolean;
  county?: Council;
  districts: Council[];
  successors: Council[];
  predecessors: Council[];
  /** the council's own design (the newest, if it had several) */
  bin?: Bin;
  oldDesigns: Bin[];
}

export interface Bin {
  id: string;
  councils: Council[];
  name: string;
  image: CollectionEntry<"bins">["data"]["image"];
  photographed?: string;
  contributor?: { name: string; url?: string };
  colour?: string;
  colourFamily?: string;
  colourOrder: number;
  /** shown in the Retro tab: an old design, or a council that's gone */
  retro: false | "old-design" | "abolished";
  /** "1974 – 2023", "Pre-2008" */
  retroDates?: string;
  /** the year the council was abolished or the design changed */
  retroYear?: number;
  /** the bin you see now in its place */
  twin?: Bin;
}

const dayAfter = (d: string) => {
  const x = new Date(`${d}T00:00:00Z`);
  x.setUTCDate(x.getUTCDate() + 1);
  return x.toISOString().slice(0, 10);
};

let cache: { councils: Council[]; bins: Bin[] } | undefined;

export async function load() {
  if (cache) return cache;

  const councilEntries = await getCollection("councils");
  const binEntries = await getCollection("bins");

  const councils = new Map<string, Council>();
  for (const { id, data } of councilEntries) {
    const start = iso(data.start);
    const end = iso(data.end);
    const status: Status =
      start && start > today ? "upcoming" : end && end < today ? "abolished" : "current";
    councils.set(id, {
      id,
      name: data.name,
      nameCy: data.name_cy,
      officialName: data.official_name,
      type: data.type,
      nation: data.nation,
      gss: data.gss,
      start,
      end,
      replacedOn: end && data.successors.length ? dayAfter(end) : undefined,
      renamed: !!data.renamed,
      status,
      collectsBins: data.type !== "county",
      districts: [],
      successors: [],
      predecessors: [],
      oldDesigns: [],
    });
  }

  for (const { id, data } of councilEntries) {
    const c = councils.get(id)!;
    if (data.county) {
      c.county = councils.get(data.county);
      c.county?.districts.push(c);
    }
    for (const s of data.successors) {
      const sc = councils.get(s);
      if (!sc) continue;
      c.successors.push(sc);
      sc.predecessors.push(c);
    }
  }

  const bins: Bin[] = binEntries.map(({ id, data }) => {
    const bc = data.council.map((cid) => councils.get(cid)!);
    const bin: Bin = {
      id,
      councils: bc,
      name: bc.map((c) => c.name).join(" and "),
      image: data.image,
      photographed: iso(data.photographed),
      contributor: data.contributor,
      colour: data.colour,
      colourFamily: data.colour?.replace(/^\d+-/, ""),
      colourOrder: data.colour ? parseInt(data.colour) : 999,
      retro: data.old_design
        ? "old-design"
        : bc.every((c) => c.status === "abolished")
        ? "abolished"
        : false,
    };
    if (data.old_design) {
      bin.retroDates =
        data.old_design === true ? undefined : `Pre-${data.old_design.until}`;
      if (data.old_design !== true) bin.retroYear = data.old_design.until;
    } else if (bin.retro === "abolished") {
      const c = bc[0];
      const until = c.end!.slice(0, 4);
      bin.retroDates = c.start ? `${c.start.slice(0, 4)} – ${until}` : `Pre-${until}`;
      bin.retroYear = Number(until);
    }
    for (const c of bc) {
      if (data.old_design) c.oldDesigns.push(bin);
      else if (!c.bin || (bin.photographed ?? "") > (c.bin.photographed ?? "")) c.bin = bin;
    }
    return bin;
  });

  // What's there now: the same council's current design, or its successor's
  const binNow = (c: Council, depth = 0): Bin | undefined => {
    if (c.status !== "abolished" && c.bin) return c.bin;
    if (depth > 3) return undefined;
    for (const s of c.successors) {
      const b = binNow(s, depth + 1);
      if (b) return b;
    }
  };
  for (const bin of bins) {
    if (bin.retro === "old-design") bin.twin = bin.councils[0].bin;
    if (bin.retro === "abolished") {
      for (const s of bin.councils[0].successors) bin.twin ??= binNow(s);
    }
  }

  const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
  for (const c of councils.values()) {
    c.districts.sort(byName);
    c.predecessors.sort(byName);
    c.oldDesigns.sort((a, b) => (b.retroDates ?? "").localeCompare(a.retroDates ?? ""));
  }

  cache = { councils: [...councils.values()].sort(byName), bins };
  return cache;
}

/** Councils that collect bins today: what "catalogued" is measured against */
export const collectors = (councils: Council[]) =>
  councils.filter((c) => c.status === "current" && c.collectsBins);

export const statusLabel = (c: Council) =>
  c.status === "abolished"
    ? `${c.renamed ? "renamed" : "abolished"} ${c.end!.slice(0, 4)}`
    : c.status === "upcoming"
    ? `from ${formatDate(c.start!)}`
    : c.type === "county"
    ? "county council"
    : undefined;

/** URL for a retro bin: /retro/hart rather than /retro/hart-retro */
export const retroPath = (bin: { id: string }) => `/retro/${bin.id.replace(/-retro$/, "")}`;

export const listNames = (cs: { name: string }[]) =>
  cs.length <= 2
    ? cs.map((c) => c.name).join(" and ")
    : `${cs.slice(0, -1).map((c) => c.name).join(", ")} and ${cs.at(-1)!.name}`;
