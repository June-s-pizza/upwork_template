import { expect } from "chai";

describe("Timesheet note dialog", () => {
  beforeEach(() => {
    cy.visit(
      `${Cypress.env(
        "STORYBOOK_PATH"
      )}&id=complex-timesheet-note-dialog--primary`
    );
  });
  it("should display Note dialog", () => {
    cy.get(".MuiBox-root button").click();
    cy.get(".MuiDialog-container").should("be.visible");
    cy.get('h2').contains("Add a Note");
  });
  it("should close dialog when clicking 'CANCEL' button", () => {
    cy.get(".MuiBox-root button").click();
    cy.get(".MuiDialog-container").should("be.visible");

    cy.contains("CANCEL").click();
    cy.get("[role=dialog]").should("not.be.visible");
  });
  it("should submit dialog form when clicking 'SAVE' button", () => {
    cy.get(".MuiBox-root button").click();

    cy.get('[data-testid="date-notes-text-field"] input').clear().type(
      "01/01/2023"
    ).type('{enter}');

    cy.get('[data-testid="select-project"] input').type("Project1")
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();

    cy.get('[data-testid="select-phase"]').type("Overhead")
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();

    cy.get('[data-testid="note-input"] input').type("notes test");
    cy.contains("SAVE").click();

    cy.get("#text-area-test-data")
      .invoke("val")
      .should((dump) => {
        expect(dump).to.equal(
          '{"date":"2023-01-01","project":"Project1","phase":"Overhead","notes":"notes test"}'
        );
      });
  });
});
