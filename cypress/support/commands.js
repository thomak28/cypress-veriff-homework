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

// Requests the session token and store it
Cypress.Commands.add('getSessionToken', (fullName, language, documentCountry, documentType) => { 
    cy.request({
        method: 'POST',
        url: Cypress.config().baseUrl,
        headers: {},
        body:
        {
          "full_name": fullName,
          "lang": language,
          "document_country": documentCountry,
          "document_type": documentType,
          "additionalData": {
            "isTest": false
          }
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.sessionToken).to.be.a("string");
        expect(res.body.integrationUrl).to.eq(Cypress.env('integrationUrl') );
        cy.task('set', {name: 'sessionToken', value: res.body.sessionToken })
      });
})
