import {
  calendarRuleGroups,
  documentOrder,
  getDocumentById,
  getDocuments,
  monthRules,
  sakawiDefinition
} from "./documentLibrary";

test("documents follow the Sakawi mobile app section order", () => {
  expect(documentOrder).toEqual([
    "comparison",
    "calendar-rules",
    "foundation",
    "months",
    "nasak",
    "ikas",
    "year-name"
  ]);
  expect(getDocuments("en").map((document) => document.id)).toEqual(documentOrder);
});

test("comparison document uses approved Sakawi definition blocks", () => {
  const comparison = getDocumentById("vi", "comparison");

  expect(comparison?.blocks.map((block) => block.type)).toEqual([
    "sakawi-definition",
    "shared-features",
    "comparison-table",
    "source-note"
  ]);
  expect(sakawiDefinition.formula).toBe("Sakawi = Saka + Jawi");
  expect(sakawiDefinition.parts.map((part) => part.term)).toEqual(["Saka", "Jawi"]);
});

test("calendar rules and month rules preserve mobile rule groups", () => {
  expect(calendarRuleGroups.map((group) => group.title)).toEqual(["Chung", "Sakawi Awal", "Sakawi Cham"]);
  expect(calendarRuleGroups[0].items[0]).toContain("Awal khik, Cham nduec");
  expect(monthRules).toHaveLength(2);
  expect(monthRules[1].items[1]).toContain("bỏ 6 bingun");
});
