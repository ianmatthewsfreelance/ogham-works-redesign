# Ogham Works — Redesign Concept

A single-file React build of a redesign concept for [oghamworks.com](https://www.oghamworks.com/), styled in the
clean, white direction of [trooinbound.com](https://www.trooinbound.com/).

## What's here

`OghamWorksSite.jsx` — a self-contained React component covering four pages (Home, Consulting, Enrollem,
HS Form Identifier) with hash-based routing and no dependencies beyond React itself.

## Using it

```jsx
import OghamWorksSite from "./OghamWorksSite";

// render <OghamWorksSite /> at your app root
```

## Known placeholders

- The Consulting page's service list is illustrative — swap in the real offerings and pricing.
- The homepage contact form is a static mockup (`onSubmit` just calls `preventDefault()`).
