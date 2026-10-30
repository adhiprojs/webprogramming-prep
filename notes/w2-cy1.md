# w2-cy1: Tech Innovators 2025 event page (5 sections + aside + footer)

## 1. What the question asks
Plain HTML. Exact values:
- title `Tech Innovators 2025 - Event Page`
- `header` has an `img`, `h1` = `Tech Innovators 2025`, `h2` = `Innovating the Future of Technology`
- section 1: h2 `About the Event`, first p includes `Tech Innovators 2025`
- section 2: h2 `Event Schedule`; table with 3 `th`, at least 5 `tbody tr`, and a `border` attribute (or inline style border)
- section 3: h2 `Speakers`; at least 3 `article`
- section 4: h2 `Venue`; a p including `The event will be held at`; an img
- section 5: h2 `Register Now`; ul with at least 3 li
- `aside h3` = `Our Sponsors`; `aside ul li` at least 3
- `footer h2` = `Contact Us`; `footer p` includes `info@techinnovators2025.com`

## 2. Tests (10)
verify_title, verify_header_section, verify_about_event_section, verify_event_schedule_section, verify_speakers_section, verify_venue_section, verify_sponsors_section, verify_footer_section, verify_registration_section, verify_event_logo (`header img` exists). Sections use `section:nth-of-type(n)`, so exactly five `<section>` siblings in that order.

## 3. The original submission
Original blank (0/10); reference 10/10. Aside and footer sit after the five sections. Table uses `border="1"`. Note `section h2` and `section p` (tests 3) take the first match, so section 1 must hold the About text.

## 4. Common mistakes
- Table without the `border` attribute.
- Making the sponsors a sixth `<section>` instead of an `<aside>` (the test needs `aside h3`).
- Fewer than 5 rows or 3 articles/list items.
- Header image outside `<header>`.
- Venue p and img in different sections.

## 5. Approach
1. Header: img, h1, h2.
2. Sections in order: About, Schedule (table), Speakers (articles), Venue (p + img), Register (ul).
3. Aside: h3 + ul of 3.
4. Footer: h2 + p email.
5. Count sections = 5 and check the minimum counts.
