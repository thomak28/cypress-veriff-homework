// Test are done exploratory way and are not checkign everything.
// It's a E2E test and does have test dependencies

import selectors from '../../../utils/selectors.js';
import  applicationData from  '../../../fixtures/applicationData.json'
import 'cypress-iframe'
let confNum = 1

// Running 6 different configuration. Covering all different document types situations + 2 random ones.
applicationData.configurations.forEach((conf) => {

  describe(`Veriff demo configuration #${confNum++} E2E tests`, () => {

    it(`Fills the 'Full Name': '${conf.fullName}' to the textfield`, () => {      
      // Using baseURL 
      cy.visit(Cypress.config().baseUrl)
      cy.get(selectors.nameField)
      .clear()
      .type(conf.fullName)
      .and('have.value', conf.fullName)
    })

    it(`Selects the 'Session Language': '${conf.language}' from the dropdown`, () => {      
      cy.get(selectors.sessionLanguageButton).click()    
      cy.get(selectors.selectOption)
      .contains(conf.language)
      .click({force: true})
      cy.get(selectors.sessionLanguageButton).contains(conf.language)
    })

    it(`Select the 'Document country': '${conf.country}' from the dropdown`, () => {      
      cy.get(selectors.documentCountryField)
      .type(conf.country + '{enter}')
      .and('have.value', conf.country)
    })

    it(`Selects the 'Document type': '${conf.documentType}' from the dropdown`, () => {      
      cy.get(selectors.documentTypeButton).click()    
      cy.get(selectors.selectOption)
      .contains(conf.documentType)
      .click({force: true})
      cy.get(selectors.documentTypeButton)
      .contains(conf.documentType)
    })

    it(`Makes sure that 'Type of verification' radiobutton default value is 'InContext'`, () => {      
      cy.get(selectors.launcVia)
      .should('be.checked')
      .and('have.value', 'incontext')
    })

    it(`Clicks on 'Veriff me' button`, () => {      
      cy.get(selectors.submitButton).click()
    })

    it(`Checks user is leaded to the session details page`, () => {
      cy.frameLoaded('#veriffFrame')
      cy.iframe().find('h1')
      .should('have.text', conf.expectedLabels.demoSessionSecondPageH1Text)
    })
    
    it(`Clicks on 'Start session' and check that document: '${conf.documentType}' is requested`, () => {
      cy.iframe().find(selectors.buttonStartSession).click()
      cy.iframe().find('h1')
      .should('have.text', conf.expectedLabels.demoSessionThirdPageH1Text)
    })
  })
})