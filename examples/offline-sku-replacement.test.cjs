"use strict";

// Run with: node --test examples/offline-sku-replacement.test.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");

test("replace complete fictional SKUs in an offline catalog", () => {
  const targetSku = "demo.replacement";
  const sourceSku = /^demo\.catalog\.[a-z0-9-]+(?:\.[a-z0-9-]+)*$/;
  const catalog = [
    { sku: "demo.catalog.monthly", label: "Monthly fixture" },
    { sku: "demo.catalog.yearly.standard", label: "Yearly fixture" },
    { sku: "demo.catalog.", label: "Prefix alone" },
    { sku: "other.demo.catalog.monthly", label: "Prefix in the middle" },
    { sku: "demo.catalog.monthly extra", label: "Extra text" },
    { sku: "demo.other.monthly", label: "Different category" }
  ];

  const result = catalog.map(item => ({
    ...item,
    sku: sourceSku.test(item.sku) ? targetSku : item.sku
  }));

  assert.deepEqual(result.map(item => item.sku), [
    targetSku,
    targetSku,
    "demo.catalog.",
    "other.demo.catalog.monthly",
    "demo.catalog.monthly extra",
    "demo.other.monthly"
  ]);
  assert.deepEqual(result.map(item => item.label), catalog.map(item => item.label));
  assert.equal(catalog[0].sku, "demo.catalog.monthly");
});
