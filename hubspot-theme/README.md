# Ogham Works — HubSpot CMS theme

A real HubSpot theme (HubL templates + custom modules) implementing the Ogham Works redesign
concept: white/clean layout, a single orange accent, and the recurring "notch across a line" motif
drawn from the Ogham alphabet itself.

Unlike the earlier HTML mockups and the React version, **this is meant to be uploaded and published
directly in your HubSpot portal.**

## What you get

- **Design tokens** — `fields.json` at the theme root exposes the core colors (background, text,
  accent, hairlines) as Theme Settings fields. Change them from *Marketing → Files and Templates →
  Design tools → Theme Settings* with no code edits.
- **Editable text everywhere** — every heading, paragraph, badge, list item, price, and link lives in
  a module field (`fields.json` per module), so it's editable from the page editor sidebar, not
  hardcoded in HTML.
- **Movable sections** — every page is built from `{% dnd_area %}` / `dnd_section` / `dnd_row` /
  `dnd_column`, HubSpot's drag-and-drop layout primitives. Open any page in the page editor and you
  can drag sections up/down, add new ones, or delete them.
- **A real form** — the contact section on the homepage uses HubSpot's native form module
  (`@hubspot/form`), so you can pick any form from your account (or build a new one) directly in the
  page editor's form picker. It's not a static mockup.

## Structure

```
theme.json                 theme metadata
fields.json                theme-level design tokens (colors)
css/theme.css               design system CSS, reads the tokens as CSS custom properties
fonts/                       embedded Inter (variable font, weights 400-700 + italic)
templates/layouts/base.html  shared <head>, header, footer, font-face + token injection
templates/home.html          hero, proof strip, offerings, why-us, contact, CTA
templates/consulting.html    hero, services, process, credibility, CTA
templates/enrollem.html      hero, proof strip, features, pricing, CTA
templates/form-identifier.html  hero, features, who it's for, CTA
modules/                     10 custom modules used across the templates above
```

## Modules

| Module | Used for |
|---|---|
| `site-header` | Sticky nav — brand, nav links, CTA button |
| `site-footer` | Footer — blurb + three link columns |
| `hero` | Page-top hero: eyebrow, heading, intro, up to 2 buttons, optional badges |
| `proof-strip` | Row of stat value/label pairs |
| `section-intro` | Eyebrow + heading + optional intro paragraph + optional link list |
| `offering-cards` | Repeating grid of icon/heading/body/link cards |
| `stem-list` | Bulleted list with the notch-marker style |
| `pricing` | Pricing tier grid, each tier with its own feature list |
| `process` | Numbered process steps (used for the real Discover → Build → Handover sequence) |
| `cta-band` | Dark closing CTA band |

## Uploading

You'll need the [HubSpot CLI](https://developers.hubspot.com/docs/cms/developer-reference/local-development-cli) and a HubSpot account with CMS access.

```bash
npm install -g @hubspot/cli

# from inside this folder:
hs init                 # creates hubspot.config.yml, walks you through a personal access key
hs upload . "Ogham Works"   # uploads this folder to your portal as a theme named "Ogham Works"
```

To keep pushing changes as you edit locally:

```bash
hs watch . "Ogham Works"
```

## After uploading

1. **Create pages.** In HubSpot, go to *Marketing → Website → Website Pages → Create → Website Page*,
   choose the "Ogham Works" theme, and pick `home`, `consulting`, `enrollem`, or `form-identifier` as
   the template. Set each page's URL slug (e.g. `/consulting`, `/enrollem`, `/form-identifier`).
2. **Match the nav links to your real slugs.** The header/footer modules default to `/`,
   `/consulting`, `/enrollem`, `/form-identifier` — if you pick different slugs, open the header and
   footer modules on any page and update the link fields.
3. **Make the header and footer global.** Click into the header module on any page → **Make Global**
   (repeat for the footer). After that, editing it once updates it everywhere.
4. **Pick a real form.** On the homepage, click into the contact form module and select (or create)
   the HubSpot form you actually want to collect submissions.
5. **Set your brand colors.** *Design tools → Theme Settings* on this theme exposes the 6 color
   tokens if you want to tweak the palette without touching code.
6. **Check the dnd_module default overrides rendered.** Each template passes real starter copy into
   its modules via default field values. If any section shows placeholder text instead on first load
   (uncommon, but HubL default-object rendering can vary slightly by portal), open that module and
   re-enter the field values from the corresponding `fields.json` — the field structure itself is
   correct either way.

## Known placeholders

- Consulting page service copy is illustrative — replace with your real offerings and pricing.
- Nav/footer link defaults assume the URL slugs above; update if you choose different ones.
