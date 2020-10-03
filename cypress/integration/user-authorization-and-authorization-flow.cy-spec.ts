/* eslint-disable */
/// <reference path="../support/index.d.ts" />
import {Country} from "../../src/models/country";
import {City} from "../../src/models/city";

describe("Login and state after that", () => {
  it("should successfully log into our app and then access all restricted resources", () => {
    cy.visit("/");

    cy.get(".mode-nav-bar")
      .should($button => {
        expect($button).to.contain("LOG IN");
      });

    cy.login()
      .then(resp => {
        return resp.body;
      })
      .then(body => {
        const {access_token, expires_in, id_token} = body;
        const auth0State = {
          nonce: "",
          state: "some-random-state",
        };
        // tslint:disable-next-line:max-line-length
        const callbackUrl = `/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
        cy.visit(callbackUrl,
          {
            onBeforeLoad(win) {
              win.document.cookie = "com.auth0.auth.some-random-state=" + JSON.stringify(auth0State);
            },
          });
      });

    cy.wait(1000);

    cy.window().then(
      win => {
        expect(win.localStorage.getItem("access_token")).to.be.not.null;
        expect(win.localStorage.getItem("expires_at")).to.be.not.null;
      },
    );

    // Home page after successful login

    const user = {
      name: Cypress.env("auth_username"),
      email: Cypress.env("auth_username"),
    };

    cy.get(".home-link")
      .should("have.attr", "href", "/home")
      .should("have.attr", "label", "HOME");

    cy.get(".countries-link")
      .should("have.attr", "href", "/country-list")
      .should("have.attr", "label", "COUNTRIES");

    cy.get(".top-bar")
      .should("have.attr", "label", `Hi, ${user.name}`);

    cy.get("#profile-link")
      .should("have.attr", "href", "/profile")
      .and("contain", "My Profile");

    cy.get(".top-bar > :nth-child(2)")
      .should(($button) => {
        expect($button).to.have.text("LOG OUT");
      });

    const title = "REACT WEATHER APP";

    // get the element and verify that the app name is in it
    cy.get(".app-title")
      .should("have.attr", "label", title);

    // get the element and verify that the help message is in it
    cy.get(".title > .headline > .headline-content")
      .should("contain", `Welcome to ${title}`);

    cy.get(".countries-link")
      .should("have.attr", "href", "/country-list")
      .and("have.attr", "label", "COUNTRIES");


    // should access country-list and city-list

    let firstCountry: Country;
    let nextCountry: Country;
    cy.request({
      method: "GET",
      url: "http://localhost:8082/api/countries"
    }).then(response => {
      firstCountry = response.body[0];
      nextCountry = response.body[1];
      return [response.body, firstCountry, nextCountry]
    }).as("getAllCountries");

    cy.get('@getAllCountries').then((response) => {

      cy.get(".container > div > .mode-sidebar").click();

      cy.get(":nth-child(1) > .country-entity")
        .should("have.prop", "text", firstCountry.name.toUpperCase());

      cy.get(":nth-child(2) > .country-entity")
        .should("have.prop", "text", nextCountry.name.toUpperCase());


      let firstCity: City;
      let nextCity: City;
      cy.request({
        method: "GET",
        url: `http://localhost:8081/api/cities?country=${firstCountry.iso}`
      }).then(responseCity => {
        firstCity = responseCity.body[0];
        nextCity = responseCity.body[1];
        return [firstCity, nextCity]
      }).as("getAllCitiesByCountry");

      cy.get('@getAllCitiesByCountry').then((responseCity) => {

        cy.get(":nth-child(1) > .country-entity").click();

        cy.url().should("eq", `http://localhost:3000/country-list/${firstCountry.iso}`);

        cy.get(":nth-child(1) > .city-entity")
          .should("have.prop", "text", `${firstCity.name.toUpperCase()} ${firstCity.temperature}`);

        cy.get(":nth-child(2) > .city-entity")
          .should("have.prop", "text", `${nextCity.name.toUpperCase()} ${nextCity.temperature}`);

        cy.url().should("eq", `http://localhost:3000/country-list/${firstCountry.iso}`);
      });

      cy.get("input")
        .type("Dusseldorf 11").should("have.value", "Dusseldorf 11")
        .then(() => {
          cy.get(".add-button").click()
            .then(() => {
              cy.get(".city-entity").last()
                .should(($h1) => {
                  expect($h1).to.have.prop("text", "DUSSELDORF 11");
                });
            });

        });
    });

    // should go to user-profile
    cy.get(".top-bar").click();

    cy.get(".top-bar > :nth-child(1)").click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/profile");

    const auth = {
      getProfile: () => {
        return user;
      }
    };

    // force auth.getProfile() to return user
    cy.stub(auth, "getProfile").callThrough().returns(user);


    const testUser = auth.getProfile();

    cy.get(".user-profile")
      .then(() => {
        cy.wait(100);
        expect(user).to.equal(testUser);
      });


    cy.get(".user-profile")
      .should($h2 => {
        expect($h2).to.contain.text("Your User Details:");
      });

    cy.get("img")
      .should("be.visible");

    cy.get(".user-profile > :nth-child(3)")
      .should("contain", `Name: ${testUser.name}`);

    cy.get(".user-profile > :nth-child(4)")
      .should("contain", `Email: ${testUser.email}`);


    // should log out from our app
    cy.get(".top-bar").click();

    cy.get(".top-bar > :nth-child(2)").click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/home");


    // after log out should be redirected form a restricted  route to home page'
    cy.visit("profile").then(() => {
      cy.url().should("eq", "http://localhost:3000/home")
    })
  });
})
;

