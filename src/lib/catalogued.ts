import type { Council } from "./govbins";

// Who catalogued a council's bin. Bins with no contributor are the
// #govbins team's: the site has only ever credited other people.
export type CataloguedBy = "harry" | "others" | "none";

export const cataloguedBy = (c: Council): CataloguedBy =>
  !c.bin ? "none" : c.bin.contributor ? "others" : "harry";
