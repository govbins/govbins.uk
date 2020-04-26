# #govbins

Source code for [govbins.uk](http://govbins.uk/)

Open data APIs used in site:

- [Local authorities in England](https://local-authority-eng.alpha.openregister.org/)
- [Local authorities in Scotland](https://local-authority-sct.alpha.openregister.org/)
- [Principal local authorities in Wales](https://principal-local-authority.alpha.openregister.org/)

## Running it

Install the dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).


## Adding a bin

Add the image in `/public/images`, then add another entry in `/src/bins.js` with the information:

```javascript
{
  "fileName": "/images/name-of-images.jpg",
  "localAuthorityCountry": "eng", // must be eng, sct orwls
  "localAuthorityCode": "CHE", // must matches the code from the api
  "collectionDate": "12.3.2020"
},
```
