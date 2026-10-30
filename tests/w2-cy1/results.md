# w2-cy1 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w2-cy1/code` (original) and `... tests/w2-cy1/solution --test tests/w2-cy1/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

## Original code/: 0/10 passed

| Case | Result |
|---|---|
| verify_title | FAIL |
| verify_header_section | FAIL |
| verify_about_event_section | FAIL |
| verify_event_schedule_section | FAIL |
| verify_speakers_section | FAIL |
| verify_venue_section | FAIL |
| verify_sponsors_section | FAIL |
| verify_footer_section | FAIL |
| verify_registration_section | FAIL |
| verify_event_logo | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 10/10, run 2 = 10/10

| Case | Result |
|---|---|
| verify_title | PASS |
| verify_header_section | PASS |
| verify_about_event_section | PASS |
| verify_event_schedule_section | PASS |
| verify_speakers_section | PASS |
| verify_venue_section | PASS |
| verify_sponsors_section | PASS |
| verify_footer_section | PASS |
| verify_registration_section | PASS |
| verify_event_logo | PASS |
