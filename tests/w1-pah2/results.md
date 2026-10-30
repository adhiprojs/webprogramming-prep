# w1-pah2 results

Command: `runtime/node14/bin/node runtime/run-test.js tests/w1-pah2/code` (original) and `... tests/w1-pah2/solution --test tests/w1-pah2/code/puppeteer/test.js` (solution)
Node: v14.21.3, puppeteer 19 (shared runtime, exam package.json versions)

## Original code/: 0/10 passed

| Case | Result |
|---|---|
| verify_title | FAIL |
| verify_header_text | FAIL |
| verify_conference_intro_header | FAIL |
| verify_intro_text_bold_italic | FAIL |
| verify_schedule_header | FAIL |
| verify_day1_schedule | FAIL |
| verify_speakers_header | FAIL |
| verify_speaker_details | FAIL |
| verify_footer_contact_info | FAIL |
| verify_event_details_emphasis | FAIL |

Failure text: the test prints only TESTCASE:<name>:failure (no assertion message). Cause is the starter content described above / missing elements.

## solution/ (only public/* edited): run 1 = 10/10, run 2 = 10/10

| Case | Result |
|---|---|
| verify_title | PASS |
| verify_header_text | PASS |
| verify_conference_intro_header | PASS |
| verify_intro_text_bold_italic | PASS |
| verify_schedule_header | PASS |
| verify_day1_schedule | PASS |
| verify_speakers_header | PASS |
| verify_speaker_details | PASS |
| verify_footer_contact_info | PASS |
| verify_event_details_emphasis | PASS |
