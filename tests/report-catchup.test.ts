// Catch-up never reconstructs history the site does not have: an issue whose last covered day predates
// the first daily report is skipped, so a name-change or a late first import cannot resurrect empty
// dailies, weeklies or monthlies from before launch.
import "./setup.ts";
import assert from "node:assert/strict";
import { test } from "node:test";
import { isBeforeLaunch } from "@aihot/backend/reports/compose";

test("nothing is due before the first daily report", () => {
  const launch = "2026-09-29";
  assert.equal(isBeforeLaunch(launch, "2026-09-28"), true, "the day before launch");
  assert.equal(isBeforeLaunch(launch, "2026-09-29"), false, "the launch day itself");
  assert.equal(isBeforeLaunch(launch, "2026-09-27"), true, "the week ending before launch");
  assert.equal(isBeforeLaunch(launch, "2026-10-04"), false, "the week launch falls in");
  assert.equal(isBeforeLaunch(launch, "2026-08-31"), true, "the month before launch");
  assert.equal(isBeforeLaunch(launch, "2026-09-30"), false, "the month launch falls in");
});

test("a database with no daily report yet has no boundary to enforce", () => {
  assert.equal(isBeforeLaunch(null, "2026-09-01"), false);
});
