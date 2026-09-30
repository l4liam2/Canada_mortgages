/**
 * Openly licensed stock photos used around the site (files live in `public/images/photos/`).
 * Every CC BY photo must keep its credit: it's shown under the photo where it appears and
 * listed on /credits. When adding one, record the author, licence, and source page here.
 */
export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  author: string;
  license: "CC0" | "CC BY 2.0";
  licenseUrl: string;
  source: string;
};

const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0/";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";

export const photos = {
  "cabbagetown-row-houses": {
    src: "/images/photos/cabbagetown-row-houses.jpg",
    alt: "Red-brick Victorian row houses behind a front garden in Cabbagetown, Toronto",
    width: 1280,
    height: 850,
    author: "Jay Woodworth",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: "https://commons.wikimedia.org/wiki/File:Cabbagetown_houses.jpg",
  },
  "cabbagetown-victorians": {
    src: "/images/photos/cabbagetown-victorians.jpg",
    alt: "Colourful Victorian houses with front porches and gardens in Cabbagetown, Toronto",
    width: 1280,
    height: 878,
    author: "dbking",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: "https://commons.wikimedia.org/wiki/File:Houses_in_Cabbagetown_Toronto.jpg",
  },
  "toronto-skyline": {
    src: "/images/photos/toronto-skyline.jpg",
    alt: "The Toronto skyline and CN Tower seen across Lake Ontario on a clear day",
    width: 1920,
    height: 1280,
    author: "Christine Wagner",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: "https://commons.wikimedia.org/wiki/File:Toronto_Skyline_September_2014.jpg",
  },
  "toronto-skyline-dusk": {
    src: "/images/photos/toronto-skyline-dusk.jpg",
    alt: "The Toronto skyline and a lit-up CN Tower across the harbour at dusk",
    width: 1920,
    height: 938,
    author: "TheWxResearcher",
    license: "CC0",
    licenseUrl: CC0,
    source: "https://commons.wikimedia.org/wiki/File:Toronto_Skyline_at_night_2024-08-23.jpg",
  },
  "bank-of-canada": {
    src: "/images/photos/bank-of-canada.jpg",
    alt: "The stone facade of the Bank of Canada building in Ottawa",
    width: 1280,
    height: 850,
    author: "shankar s.",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: "https://commons.wikimedia.org/wiki/File:Bank_of_Canada_building_(20564038590).jpg",
  },
  "contract-signature": {
    src: "/images/photos/contract-signature.jpg",
    alt: "A fountain pen resting on the signature lines of a printed contract",
    width: 1280,
    height: 960,
    author: "Blogtrepreneur",
    license: "CC BY 2.0",
    licenseUrl: CC_BY_2,
    source: "https://commons.wikimedia.org/wiki/File:Legal_Contract_%26_Signature_-_Warm_Tones.jpg",
  },
  "renovation-tools": {
    src: "/images/photos/renovation-tools.jpg",
    alt: "Paint rollers, a brush, and masking tape laid out on a windowsill during a renovation",
    width: 1024,
    height: 683,
    author: "rawpixel",
    license: "CC0",
    licenseUrl: CC0,
    source: "https://www.rawpixel.com/image/6019459/photo-image-tape-public-domain-house",
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;

export function getPhoto(id: string | undefined): Photo | undefined {
  return id && id in photos ? photos[id as PhotoId] : undefined;
}
