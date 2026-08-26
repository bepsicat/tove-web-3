export const siteUrl = "https://www.tove.dk/";
export const siteName = "Tove";
export const siteTitle = "Tove — Bar on Vesterbro, Copenhagen";
export const siteDescription =
  "Tove is a bar on Vesterbro, Copenhagen, serving cocktails, cold beers and natural wine at Gasværksvej 29.";

export const instagramUrl = "https://www.instagram.com/tovecph/";
export const menuUrl = `${siteUrl}menu`;

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BarOrPub",
      "@id": `${siteUrl}#bar`,
      name: siteName,
      description: siteDescription,
      url: siteUrl,
      image: `${siteUrl}images/hero-1.webp`,
      logo: `${siteUrl}tove-logo.png`,
      email: "kontakt@tove.dk",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gasværksvej 29",
        postalCode: "1656",
        addressLocality: "København V",
        addressCountry: "DK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 55.670162,
        longitude: 12.55811,
      },
      hasMap:
        "https://www.google.com/maps/search/?api=1&query=Gasv%C3%A6rksvej%2029%2C%201656%20K%C3%B8benhavn%20V",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
          opens: "16:00",
          closes: "00:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday"],
          opens: "14:00",
          closes: "02:00",
        },
      ],
      priceRange: "$–$$",
      currenciesAccepted: "DKK",
      acceptsReservations: true,
      menu: menuUrl,
      sameAs: [instagramUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "en",
      publisher: {
        "@id": `${siteUrl}#bar`,
      },
    },
  ],
};

export const menuStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${menuUrl}#webpage`,
  url: menuUrl,
  name: "Drinks Menu | Tove",
  description:
    "Explore the drinks menu at Tove on Vesterbro, with cocktails, draught and bottled beer, natural wine, non-alcoholic drinks and snacks.",
  inLanguage: "en",
  isPartOf: {
    "@id": `${siteUrl}#website`,
  },
  about: {
    "@id": `${siteUrl}#bar`,
  },
};
