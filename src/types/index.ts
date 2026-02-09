export interface MenuItem {
  _id: string;
  name: string;
  price: string;
  description: string;
  category: "beer" | "wine" | "cocktail" | "non-alcoholic";
}

export interface OpeningHours {
  _id: string;
  day: string;
  hours: string;
}

export interface SiteSettings {
  _id: string;
  heroTagline: string;
  aboutHeading: string;
  aboutBody: string;
  menuFooterText: string;
  bookingWeekendMessage: string;
  footerTagline: string;
}
