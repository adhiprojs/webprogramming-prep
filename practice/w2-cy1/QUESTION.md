# Tech Innovators 2025 Event Page

Build an event page with a header (logo, event name and tagline), five sections (About the Event, Event Schedule, Speakers, Venue, Register Now), a sponsors sidebar and a footer with contact information.

## Requirements

1. The page title (`document.title`) is exactly `Tech Innovators 2025 - Event Page`. *(verify_title)*
2. Inside `header`, the `h1` is exactly `Tech Innovators 2025` and the `h2` is exactly `Innovating the Future of Technology`. *(verify_header_section)*
3. The first `section` has an `h2` exactly `About the Event`, and the first `p` inside a `section` includes `Tech Innovators 2025`. *(verify_about_event_section)*
4. The second `section` has an `h2` exactly `Event Schedule`, a `table` with exactly `3` `th` cells and at least `5` rows in `tbody tr`. The first `table` on the page has a `border` attribute or an inline `style` with a border. *(verify_event_schedule_section)*
5. The third `section` has an `h2` exactly `Speakers` and at least `3` `article` elements. *(verify_speakers_section)*
6. The fourth `section` has an `h2` exactly `Venue`, a `p` that includes `The event will be held at`, and an `img`. *(verify_venue_section)*
7. Inside `aside`, the `h3` is exactly `Our Sponsors` and the `ul` has at least `3` `li` items. *(verify_sponsors_section)*
8. Inside `footer`, the `h2` is exactly `Contact Us` and the first `p` includes `info@techinnovators2025.com`. *(verify_footer_section)*
9. The fifth `section` has an `h2` exactly `Register Now` and at least `3` `li` items inside a `ul`. *(verify_registration_section)*
10. The `header` contains an `img` (the event logo). *(verify_event_logo)*

## Watch out

- Sections are selected with `section:nth-of-type(n)`, so the five sections must be sibling `section` elements in exactly this order; the `aside` and `footer` do not count as sections.
- The table border must be set as a `border` attribute (or inline style); a border from a CSS file only is not enough for this check.
- The logo `img` must be inside the `header`, and the venue `img` inside the fourth section.
- Speakers are `article` elements inside the third section, not `div`s.

## Files

- `public/index.html`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
