// ***********************************************
// This example commands.js shows you how to
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

// Dodanie zadania
Cypress.Commands.add('addTask', (taskText) => {
  cy.get('#taskInput').type(taskText);
  cy.get('#addTask').click();
});

// Oznaczenie zadania jako wykonane po indeksie
Cypress.Commands.add('completeTask', (index) => {
  cy.get('#taskList li input[type="checkbox"]').eq(index).check();
});

// Usuwanie zadania po indeksie
Cypress.Commands.add('removeTask', (index) => {
  cy.get('#taskList li button').eq(index).click();
});
