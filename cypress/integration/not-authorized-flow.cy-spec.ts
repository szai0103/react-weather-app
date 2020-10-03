/// <reference types="Cypress" />
import {} from "cypress"

describe("Before login", () => {
  it("should display the app name on the left corner of home page", () => {
    cy.visit("/"); // go to the home page

    const title = "REACT WEATHER APP";

    // get the element and verify that the app name is in it
    cy.get(".home-nav-header > .hydrated > .headline > .headline-content").should($h5 => {
      expect($h5).to.have.text(title);
    });
  });

  it("should display help message to log in on the home page", () => {
    cy.visit("/"); // go to the home page

    // get the element and verify that the help message is in it
    cy.get(".title").should($h3 => {
      expect($h3).to.have.text("Please, Log in by clicking on the button above to proceed!");
    });
  });

  it("should have Log in button on the right corner of home page", () => {
    cy.visit("/"); // go to the home page

    // get the element and verify that the Log in button is in it
    cy.get(".mode-nav-bar")
      .should($button => {
        expect($button).to.contain("LOG IN");
      });
  });

  it("should be redirected form a restricted  route to home page'", () => {
    cy.visit("country-list").then(() => {
      cy.url().should("eq", "http://localhost:3000/home");
    });
  });
});
