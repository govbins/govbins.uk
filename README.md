# #govbins

Source code for [govbins.uk](http://govbins.uk/)

## Running it

Install the dependencies:

```bash
yarn install
```

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a bin

Add the image in `/public/images`, then add another entry in `/src/bins.js` with the information:

```javascript
{
  fileName: "Cornwall.jpg",
  slug: "cornwall",
  localAuthorityCountry: "eng",
  localAuthorityCode: "NNO",
  collectionDate: "2 October 2021",
  contributorHandle: "@Amy_Hupe",
  contributorURL: "https://twitter.com/Amy_Hupe",
  colour: "601-brown",
  councilName: "Cornwall",
}
```
