import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "hours",
      title: "Opening Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "day", title: "Day(s)", type: "string" }),
            defineField({ name: "hours", title: "Hours", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "aboutHeading",
      title: "About Section Heading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "aboutBody",
      title: "About Section Body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "menuFooterText",
      title: "Menu Section Footer Text",
      type: "string",
    }),
    defineField({
      name: "bookingWeekendMessage",
      title: "Booking Weekend Message",
      type: "string",
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
    }),
  ],
});
