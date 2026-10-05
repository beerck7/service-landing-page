import test from "node:test";
import assert from "node:assert/strict";
import { validateField } from "../js/validation.js";
test("odrzuca puste pola i same spacje", () => {
  for (const field of ["name", "email", "service", "message"])
    assert.ok(validateField(field, "   "));
});
test("sprawdza e-mail bez blokowania adresów z plusem", () => {
  for (const email of ["jan", "jan@", "jan @example.com", "jan@example"])
    assert.ok(validateField("email", email));
  assert.equal(validateField("email", "jan+serwis@example.com"), "");
});
test("akceptuje polskie imię i wymaga znanej usługi", () => {
  assert.equal(validateField("name", "Łukasz"), "");
  assert.equal(validateField("service", "laptop"), "");
  assert.ok(validateField("service", "unknown"));
});
test("pilnuje długości opisu po usunięciu brzegowych spacji", () => {
  assert.ok(validateField("message", "        Krótki        "));
  assert.equal(
    validateField("message", "Laptop nie włącza się od wczoraj."),
    "",
  );
  assert.ok(validateField("message", "x".repeat(2001)));
});
