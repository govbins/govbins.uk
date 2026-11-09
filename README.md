# #govbins

Source code for [govbins.uk](https://govbins.uk/), a catalogue of every UK council's wheelie bin.

## Running it

You need Node 22.

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

`npm run build` checks the data, then builds the site into `dist/`.

## Adding a bin

1. Crop the photo to 4:3 (720 × 540 is plenty) and put it in `src/images/bins/`.
2. Add a file to `src/content/bins/`, named after the council:

```yaml
# src/content/bins/west-devon.yaml
council: west-devon
image: ../../images/bins/West-Devon.jpg
photographed: 2023-08-12
contributor:
  name: "@someone"
  url: https://www.instagram.com/someone
colour: 300-green
```

- `council` is an `id` from `src/data/councils.yaml`. A bin shared by several councils takes a list: `council: [adur, worthing]`.
- `contributor` is optional, and so is its `url`.
- `colour` sets the order on the Colour tab, and the bin's colour on the map. The number sorts within the family. Families: `purple`, `blue`, `green`, `yellow-orange`, `red-burgundy`, `brown`, `grayscale`.

### Older designs

For a council that still exists but has rebranded, add the old bin with `old_design`. It goes in the Retro tab and on the council's page:

```yaml
council: hart
image: ../../images/bins/Hart-retro.jpg
old_design:
  until: 2008
```

Use `old_design: true` if you don't know when it changed.

Bins from councils that have been abolished go in Retro automatically. They don't need `old_design`.

## When councils are created, merged or abolished

Every council, past, present and scheduled, is in `src/data/councils.yaml`. To add a reorganisation:

1. Add each new council with a `start` date (vesting day).
2. Give each old council (districts and county) an `end` date, the day before vesting day, and `successors`.

```yaml
- id: west-surrey
  name: West Surrey
  official_name: West Surrey Council
  type: unitary
  nation: england
  start: 2027-04-01

- id: guildford
  ...
  end: 2027-03-31
  successors:
    - west-surrey
```

Add a reorganisation once its Structural Changes Order is made, so names and boundaries are final. It can go in early: the site works out what's current when it's built. Abolished councils' bins move to Retro, their pages link to whoever took over, and the map redraws new councils by joining the old ones.

A GitHub Action rebuilds the site every 1 April, which is vesting day. It needs a Netlify build hook saved as a repository secret called `NETLIFY_BUILD_HOOK`.

To preview a date: `GOVBINS_TODAY=2028-04-01 npm run build`.

Don't change a council's `id` once it's published: it's the page's address. If you have to, add a redirect to `public/_redirects`.

## Checks

`npm run check-data` runs before every build. It fails if a bin points at a council that doesn't exist, a successor is missing, or dates don't line up. It also prints how many councils collect bins today (361 in November 2026: 296 in England, 32 in Scotland, 22 in Wales and 11 in Northern Ireland) and how many are catalogued.

## Where things are

- `src/pages/`: the homepage, council pages (`[council].astro`), search, map, about and the submit form
- `src/components/`: bin cards and the map
- `src/lib/govbins.ts`: works out which councils are current, retro bins, successors and so on
- `src/data/ons-council-boundaries-2022.json`: ONS boundaries for the map, from [ONSvisual/topojson_boundaries](https://github.com/ONSvisual/topojson_boundaries)
- `src/styles/global.css`: all the styles
