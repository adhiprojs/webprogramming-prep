# Registration Form Validation

Build a registration form with name, email and age fields and a submit button. On submit, validate the fields, show a per-field error message when a value is invalid, and show a success message with the submitted data when everything is valid. Messages are shown and hidden with the Bootstrap-style class `d-none`.

## Requirements

1. Submitting with an empty name (button `button[type="submit"]`) shows `#nameError`, meaning it no longer has the class `d-none`. *(name_field_blank_error)*
2. With a valid name, an email without an `@` (`userexample.com`) and a valid age, submitting shows `#emailError`. *(invalid_email_format_error)*
3. With a valid name, a valid email (`user@domain.com`) and age `16`, submitting shows `#ageError` (ages under `18` are invalid). *(age_less_than_18_error)*
4. With a valid name, `user@domain.com` and age `25`, submitting shows `#successMessage` (no `d-none`), and the `innerHTML` of `#successData` contains the name, the email and `25`. *(valid_submission_success_message)*
5. With a valid name, email `user@domain.org` and age `25`, submitting shows `#emailError` (only `.com` emails are accepted). *(invalid_email_domain_error)*
6. With another valid name, a valid `.com` email and age `30`, submitting shows `#successMessage`, and `#successData` contains that name, that email and `30`. *(valid_form_submission_with_data)*

## Watch out

- The form needs ids `name`, `email`, `age`, `nameError`, `emailError`, `ageError`, `successMessage` and `successData`; all error and success elements start with class `d-none`.
- Visibility is judged only by the absence of the `d-none` class; toggle that class, not `display` styles.
- Cases 1 to 3 do not clear the form between them, and the helper that resets the form before cases 4 to 6 only re-hides messages and clears values. Re-validate every field on each submit.
- Add `novalidate` or avoid HTML5 `required`/`type="email"` blocking, otherwise native validation may stop the submit handler from running.
- Success output is checked with `includes`, so the exact surrounding markup is free.
- The test uses `slowMo` and waits `500`-`1000`ms, so no extra delays are needed. A `page_load` guard prints only if the page fails to load, and aborts everything.

## Files

- `public/index.html`
- `public/script.js`
- `public/style.css`

## How it's graded

A Puppeteer script opens the page served from `public/` and prints a pass/fail line per case.
