# #govbins

Source code for [govbins.uk](http://govbins.uk/)

Open data APIs used in site:

- [Local authorities in England](https://www.registers.service.gov.uk/registers/local-authority-eng)
- [Local authorities in Northern Ireland](https://www.registers.service.gov.uk/registers/local-authority-nir)
- [Local authorities in Scotland](https://www.registers.service.gov.uk/registers/local-authority-sct)
- [Principal local authorities in Wales](https://www.registers.service.gov.uk/registers/principal-local-authority)

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
  "fileName": "/images/name-of-image.jpg",
  "localAuthorityCountry": "eng", // must be eng, sct or wls
  "localAuthorityCode": "CHE", // must match the code from the api
  "collectionDate": "12.3.2020"
},
```
