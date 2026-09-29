// A daily's front-page picture comes from the item its lead is about: the editors' lead matched to an
// item by title, never simply the first highlight.
import "./setup.ts";
import assert from "node:assert/strict";
import { test } from "node:test";
import type { ReportCitation } from "@aihot/contracts/site";
import { leadItemOf } from "@aihot/backend/publication/reports";

const cite = (itemId: string, title: string) => ({ itemId, title }) as ReportCitation;
const record = cite("a", "隆基绿能发布 27.3% 转换效率的晶硅电池，刷新世界纪录");
const halt = cite("b", "国家能源集团暂停某风光大基地建设，披露储能配套不足与施工安全事件");

test("an editors' lead is matched to the item it is written about", () => {
  assert.equal(leadItemOf("国家能源集团暂停风光大基地建设，披露储能配套与安全事件", [record, halt], [record, halt])?.itemId, "b");
});

test("a lead that matches no item clearly has no item", () => {
  assert.equal(leadItemOf("多家企业发布新组件，行业竞争加剧", [record], [record, halt]), undefined);
});

test("without an editors' lead the first highlight leads", () => {
  assert.equal(leadItemOf(undefined, [record], [halt, record])?.itemId, "a");
});
