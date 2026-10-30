# w6-cod2: Form validation with Bootstrap classes

Concept: submit event + preventDefault + `d-none` toggling + `novalidate`.

## 1. What the question asks
A form `#userForm` with `novalidate`, built with Bootstrap 5 classes:
- Inputs `#name` (text), `#email` (email), `#age` (number, min 18).
- Error divs `#nameError`, `#emailError`, `#ageError`. Visibility is controlled by the Bootstrap class `d-none` (hidden = has `d-none`).
- A `button[type="submit"]`.
- `#successMessage` (starts with `d-none`) containing `#successData`.
- On submit: check name not blank; email must match something like `x@y.com` (only `.com` is valid); age is a number >= 18. If all are valid, show `#successMessage` and fill `#successData` with the name, email and age values.

The test types the name strings and values it expects (a "John Doe" style name with a `user@domain.com` email and age 25, then a second person with age 30). It never asserts exact label text, only that the typed values appear in `#successData`.

## 2. What each test case checks
The check for "visible" is always `!el.classList.contains('d-none')`.

| Case | Action | Expected |
|---|---|---|
| name_field_blank_error | click submit with empty form | `#nameError` has no `d-none` |
| invalid_email_format_error | type name, `userexample.com`, 25; submit | `#emailError` visible |
| age_less_than_18_error | type more (no clearing!), age 16; submit | `#ageError` visible |
| valid_submission_success_message | helper clears values and hides messages; type valid name, `user@domain.com`, 25; submit; wait 1s | `#successMessage` visible and `#successData.innerHTML` contains name, email, 25 |
| invalid_email_domain_error | clear; valid name, `user@domain.org`, 25 | `#emailError` visible |
| valid_form_submission_with_data | clear; second name, `alice@example.com`, 30 | success visible, `#successData` contains all three values |

## 3. The original submission
Passes 6/6. Errors are hidden on load with `classList.add('d-none')`. Submit handler calls `e.preventDefault()`, validates each field, toggles `d-none` and `is-invalid`, and if valid writes `Name: ...<br>Email: ...<br>Age: ...` into `#successData` then `form.reset()`.

Fragile points:
- Regex `/^[^\s@]+@[^\s@]+\.com$/` is what makes `.org` fail.
- JS caps age at 120 while the HTML says `max=150`. The test never uses a value in between, so it passes, but keep them consistent.
- Case 3 works partly by accident: the fields still hold the earlier typed text, so the age becomes `2516` (> max), which is also invalid. Do not rely on that; validate properly.
- `form.reset()` runs after writing `#successData`, so the displayed text stays correct. If you reset first, you display empty values.
- `novalidate` is essential. Without it, the browser's own validation blocks `submit` for an invalid email or age, so your handler never runs and the error divs never appear.

## 4. Common mistakes
- Forgetting `novalidate` (native bubble replaces your errors).
- Using `style.display` instead of the `d-none` class (the test reads the class).
- Not hiding errors initially, or not re-hiding them after a good submit.
- Clicking submit with a click listener on the button instead of a `submit` listener on the form; also forgetting `preventDefault` (page reloads).
- Accepting any `@` email (the `.org` case then fails).
- Showing the success box without the typed values inside `#successData`.
- Wrong element IDs (`userForm`, `successData`, `nameError`).

## 5. Approach in 5 steps
1. Build the HTML with exact IDs; form has `novalidate`; success box has `d-none`.
2. In `DOMContentLoaded`, get all elements, add `d-none` to the three errors.
3. `form.addEventListener('submit', e => { e.preventDefault(); ... })`.
4. For each field: if bad, remove `d-none` from its error; else add `d-none`. Email regex ends in `\.com$`; age is `parseInt >= 18`.
5. If all valid, set `#successData.innerHTML` with the three values and remove `d-none` from `#successMessage`; then `form.reset()`.
