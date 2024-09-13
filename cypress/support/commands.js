/// <reference types="cypress" />

import { ingredientAddButtonText, ingredientDeleteButton } from "cypress/constants";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('addIngredient', (ingrContainer) => {
  cy.get(ingrContainer).contains(ingredientAddButtonText).click();
});

Cypress.Commands.add('deleteIngredient', (ingr) => {
  cy.get(ingr)
  .find('span')
  .find(ingredientDeleteButton)
  .click();
})

Cypress.Commands.add('openIngredientModal', (container, ingr) => {
  cy.get(container).contains(ingr).click();
});

Cypress.Commands.add('moveIngrToTop', (ingrContainer) => {
  cy.get(ingrContainer)
  .find('button')
  .first()
  .click();
});

Cypress.Commands.add('moveIngrToBottom', (ingr) => {
  cy.get(ingr)
  .find('button')
  .last()
  .click();
});
