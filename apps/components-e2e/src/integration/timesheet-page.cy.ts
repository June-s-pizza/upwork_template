import { expect } from "chai";

describe("Timesheet page", () => {
  beforeEach(() => {
    cy.visit(
      `${Cypress.env("STORYBOOK_PATH")}&id=complex-timesheet-page--primary`
    );
  });
  it("should display timesheet page", () => {
    cy.get("#timesheets-page-test-data")
      .invoke("val")
      .should((dump) => {
        expect(dump).to.equal(
          `[{"id":1,"PhaseName":"Project1","Monday":{"date":"","hours":4.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":3,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Friday":{"date":"","hours":2,"minutes":0,"notes":""},"Saturday":{"date":"","hours":2,"minutes":0,"notes":""},"Sunday":{"date":"","hours":3,"minutes":0,"notes":""},"TotalHours":17.5,"Type":0,"PhaseOfProject":""},{"id":2,"PhaseName":"Overhead","Monday":{"date":"2022-12-19","hours":2,"minutes":0,"notes":"check timesheet"},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":"fill time"},"Wednesday":{"date":"2022-12-21","hours":0.5,"minutes":30,"notes":""},"Thursday":{"date":"2022-12-22","hours":0,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":1,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":1,"minutes":0,"notes":""},"TotalHours":6.5,"Type":1,"PhaseOfProject":"Project1"},{"id":3,"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","hours":1,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":0,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":1,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":1,"minutes":0,"notes":""},"TotalHours":4,"Type":1,"PhaseOfProject":"Project1"},{"id":4,"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","hours":0.5,"minutes":30,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":0,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":0.5,"minutes":30,"notes":""},"TotalHours":2,"Type":1,"PhaseOfProject":"Project1"},{"id":5,"PhaseName":"Add a Phase","Monday":{"date":"2022-12-19","hours":1,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":0.5,"minutes":30,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":1,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":0.5,"minutes":30,"notes":""},"TotalHours":5,"Type":1,"PhaseOfProject":"Project1"},{"id":6,"PhaseName":"Project2","Monday":{"date":"","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":4,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"","hours":2,"minutes":0,"notes":""},"Friday":{"date":"","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":4,"minutes":0,"notes":""},"TotalHours":13.5,"Type":0,"PhaseOfProject":""},{"id":7,"PhaseName":"Overhead","Monday":{"date":"2022-12-19","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1.5,"minutes":30,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":1,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":1,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":1,"minutes":0,"notes":""},"TotalHours":4.5,"Type":1,"PhaseOfProject":"Project2"},{"id":8,"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1.5,"minutes":30,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":1,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0.5,"minutes":30,"notes":""},"Sunday":{"date":"2022-12-25","hours":3,"minutes":0,"notes":""},"TotalHours":6,"Type":1,"PhaseOfProject":"Project2"},{"id":9,"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":0,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":0,"minutes":0,"notes":""},"TotalHours":3,"Type":1,"PhaseOfProject":"Project2"},{"id":10,"PhaseName":"Total # Hours","Monday":{"date":"","hours":4.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":7,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":3.5,"minutes":0,"notes":""},"Friday":{"date":"","hours":3,"minutes":0,"notes":""},"Saturday":{"date":"","hours":3.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":7,"minutes":0,"notes":""},"TotalHours":31,"Type":2,"PhaseOfProject":""}]`
        );
      });

    cy.get('[data-testid="total-hours-worked"]').should("contain", "31");
    cy.get('[data-testid="hours-available"]').should("contain", "40");
    cy.get('[data-testid="utilization-rate"]').should("contain", "77.50");
  });
  it("should update timesheet page", () => {
    cy.get('[data-id="3"] > [data-field="Monday"]')
      .dblclick()
      .get('[data-id="3"] > [data-field="Monday"] input')
      .clear()
      .type("3")
      .tab()
      .get('[data-id="3"] > [data-field="Tuesday"]')
      .dblclick()
      .focus()
      .clear()
      .type("4")
      .trigger("keydown", {
        key: "Enter",
      });

    // assert the value after update
    cy.get("#timesheets-page-test-data")
      .invoke("val")
      .should((dump) => {
        expect(dump).to.equal(
          `[{"id":1,"PhaseName":"Project1","Monday":{"date":"","hours":6.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":7,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Friday":{"date":"","hours":2,"minutes":0,"notes":""},"Saturday":{"date":"","hours":2,"minutes":0,"notes":""},"Sunday":{"date":"","hours":3,"minutes":0,"notes":""},"TotalHours":23.5,"Type":0,"PhaseOfProject":""},{"id":2,"PhaseName":"Overhead","Monday":{"date":"2022-12-19","hours":2,"minutes":0,"notes":"check timesheet"},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":"fill time"},"Wednesday":{"date":"2022-12-21","hours":0.5,"minutes":30,"notes":""},"Thursday":{"date":"2022-12-22","hours":0,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":1,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":1,"minutes":0,"notes":""},"TotalHours":6.5,"Type":1,"PhaseOfProject":"Project1"},{"id":3,"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","hours":3,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":4,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":1,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":1,"minutes":0,"notes":""},"TotalHours":10,"Type":1,"PhaseOfProject":"Project1"},{"id":4,"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","hours":0.5,"minutes":30,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":0,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":0.5,"minutes":30,"notes":""},"TotalHours":2,"Type":1,"PhaseOfProject":"Project1"},{"id":5,"PhaseName":"Add a Phase","Monday":{"date":"2022-12-19","hours":1,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":0.5,"minutes":30,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":1,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":0.5,"minutes":30,"notes":""},"TotalHours":5,"Type":1,"PhaseOfProject":"Project1"},{"id":6,"PhaseName":"Project2","Monday":{"date":"","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":4,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"","hours":2,"minutes":0,"notes":""},"Friday":{"date":"","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":4,"minutes":0,"notes":""},"TotalHours":13.5,"Type":0,"PhaseOfProject":""},{"id":7,"PhaseName":"Overhead","Monday":{"date":"2022-12-19","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1.5,"minutes":30,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":1,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":1,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":1,"minutes":0,"notes":""},"TotalHours":4.5,"Type":1,"PhaseOfProject":"Project2"},{"id":8,"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1.5,"minutes":30,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":1,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0.5,"minutes":30,"notes":""},"Sunday":{"date":"2022-12-25","hours":3,"minutes":0,"notes":""},"TotalHours":6,"Type":1,"PhaseOfProject":"Project2"},{"id":9,"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":0,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":0,"minutes":0,"notes":""},"TotalHours":3,"Type":1,"PhaseOfProject":"Project2"},{"id":10,"PhaseName":"Total # Hours","Monday":{"date":"","hours":6.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":11,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":3.5,"minutes":0,"notes":""},"Friday":{"date":"","hours":3,"minutes":0,"notes":""},"Saturday":{"date":"","hours":3.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":7,"minutes":0,"notes":""},"TotalHours":37,"Type":2,"PhaseOfProject":""}]`
        );
      });
    cy.get('[data-testid="total-hours-worked"]').should("contain", "37");
    cy.get('[data-testid="hours-available"]').should("contain", "40");
    cy.get('[data-testid="utilization-rate"]').should("contain", "92.50");
  });
  it("should submit note dialog", () => {
    //show dialog
    cy.get('[data-testid="AddIcon"]').click();
    cy.get("[role=dialog]").should("be.visible");
    cy.get('[data-testid="date-notes-text-field"] input')
      .clear()
      .type("12/20/2022")
      .type("{enter}");

    cy.get('[data-testid="select-project"] input').type("Project1");
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();

    cy.get('[data-testid="select-phase"]').type("Overhead");
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();

    cy.get('[data-testid="note-input"] input').type("notes test");
    cy.contains("SAVE").click();
    cy.get('[data-id="2"] > [data-field="Tuesday"] p')
      .click()
      .then(() => {
        cy.get('[role="tooltip"]').should("contain", "notes test");
      });
    // assert the value after update
    cy.get("#timesheets-page-test-data")
      .invoke("val")
      .should((dump) => {
        expect(dump).to.equal(
          `[{"id":1,"PhaseName":"Project1","Monday":{"date":"","hours":4.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":3,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Friday":{"date":"","hours":2,"minutes":0,"notes":""},"Saturday":{"date":"","hours":2,"minutes":0,"notes":""},"Sunday":{"date":"","hours":3,"minutes":0,"notes":""},"TotalHours":17.5,"Type":0,"PhaseOfProject":""},{"id":2,"PhaseName":"Overhead","Monday":{"date":"2022-12-19","hours":2,"minutes":0,"notes":"check timesheet"},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":"notes test"},"Wednesday":{"date":"2022-12-21","hours":0.5,"minutes":30,"notes":""},"Thursday":{"date":"2022-12-22","hours":0,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":1,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":1,"minutes":0,"notes":""},"TotalHours":6.5,"Type":1,"PhaseOfProject":"Project1"},{"id":3,"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","hours":1,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":0,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":1,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":1,"minutes":0,"notes":""},"TotalHours":4,"Type":1,"PhaseOfProject":"Project1"},{"id":4,"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","hours":0.5,"minutes":30,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":0,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":0.5,"minutes":30,"notes":""},"TotalHours":2,"Type":1,"PhaseOfProject":"Project1"},{"id":5,"PhaseName":"Add a Phase","Monday":{"date":"2022-12-19","hours":1,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":0.5,"minutes":30,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":1,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":0.5,"minutes":30,"notes":""},"TotalHours":5,"Type":1,"PhaseOfProject":"Project1"},{"id":6,"PhaseName":"Project2","Monday":{"date":"","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":4,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"","hours":2,"minutes":0,"notes":""},"Friday":{"date":"","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":4,"minutes":0,"notes":""},"TotalHours":13.5,"Type":0,"PhaseOfProject":""},{"id":7,"PhaseName":"Overhead","Monday":{"date":"2022-12-19","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1.5,"minutes":30,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":1,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":1,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":1,"minutes":0,"notes":""},"TotalHours":4.5,"Type":1,"PhaseOfProject":"Project2"},{"id":8,"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1.5,"minutes":30,"notes":""},"Wednesday":{"date":"2022-12-21","hours":0,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":1,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":0,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0.5,"minutes":30,"notes":""},"Sunday":{"date":"2022-12-25","hours":3,"minutes":0,"notes":""},"TotalHours":6,"Type":1,"PhaseOfProject":"Project2"},{"id":9,"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","hours":0,"minutes":0,"notes":""},"Tuesday":{"date":"2022-12-20","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"2022-12-21","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"2022-12-22","hours":0,"minutes":0,"notes":""},"Friday":{"date":"2022-12-23","hours":1,"minutes":0,"notes":""},"Saturday":{"date":"2022-12-24","hours":0,"minutes":0,"notes":""},"Sunday":{"date":"2022-12-25","hours":0,"minutes":0,"notes":""},"TotalHours":3,"Type":1,"PhaseOfProject":"Project2"},{"id":10,"PhaseName":"Total # Hours","Monday":{"date":"","hours":4.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":7,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":3.5,"minutes":0,"notes":""},"Friday":{"date":"","hours":3,"minutes":0,"notes":""},"Saturday":{"date":"","hours":3.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":7,"minutes":0,"notes":""},"TotalHours":31,"Type":2,"PhaseOfProject":""}]`
        );
      });
  });
});