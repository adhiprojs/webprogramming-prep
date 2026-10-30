# w1-pah2: Tech Conference 2025 (semantic tags, strong/em, b/i, u)

## 1. What the question asks
Plain HTML page. Exact values:
- title and `h1` = `Tech Conference 2025`; `header` also holds an h3 slogan (first h3)
- h2[0] = `Conference Introduction`; `h2 + p` contains `exciting`, `innovative`, `technology`; page has a `<b>` and an `<i>`
- h3 = `Event Details` whose NEXT sibling is a `<p>` containing `global speakers` and `networking opportunities`; `<strong>` wraps global speakers, `<em>` wraps networking opportunities
- h2[1] = `Schedule`; h3[2] = `Day 1`; some p contains `Artificial Intelligence in 2025`
- h2[2] = `Speakers`; first `h5` contains `Dr. John Doe`; a `span` contains `CEO, Tech Innovations Inc.`
- `footer p` contains `contact@techconference.com`, with `footer u` containing it

## 2. Tests (10)
verify_title, verify_header_text, verify_conference_intro_header, verify_intro_text_bold_italic, verify_schedule_header, verify_day1_schedule (h3[2] = Day 1), verify_speakers_header, verify_speaker_details, verify_footer_contact_info, verify_event_details_emphasis.

## 3. The original submission
Original blank (0/10); reference 10/10. Heading order that works: header(h1,h3 slogan), h2 Intro + p, h3 Event Details + p, h2 Schedule, h3 Day 1 + p, h2 Speakers, h5 name, span company, footer.

## 4. Common mistakes
- Fewer than 3 h3 before Day 1: slogan must be h3 #1, Event Details #2, Day 1 #3.
- Using `<b>` for strong or `<i>` for em (test 4 wants b and i; test 10 wants strong and em; need both pairs).
- Event Details paragraph not directly after its h3 (uses `nextElementSibling`).
- Speaker name in h4/p instead of h5.

## 5. Approach
1. Header with h1 and h3 slogan.
2. Intro: h2 + p with b and i.
3. Event Details h3 + p with strong and em.
4. Schedule h2, Day 1 h3 (third h3), p.
5. Speakers h2, h5, span, footer with `<u>` email.
