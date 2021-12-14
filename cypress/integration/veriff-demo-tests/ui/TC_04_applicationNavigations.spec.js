import selectors from '../../../utils/selectors.js';
import  screen from  '../../../fixtures/screenSizes.json'
import 'cypress-iframe'

// Pages expected text's
const landingPageH1Text = "Welcome to our Veriff Demo"
const demoSessionSecondPageH1Text = "Let's get you verified"

// Looping with different popular screen sizes
screen.screenSizes.forEach((sizeEl) => {

  // Added retries: 2, due to iframe tests are little bit flaky. This means scnario works, but not 100% every time.
  describe(`Checks that main navigations are working with the screen size:'${sizeEl}'`, { retries: 1 }, () => {

    beforeEach(() => {

      if (Cypress._.isArray(sizeEl)) {
        cy.viewport(sizeEl[0], sizeEl[1])
      } else {
        cy.viewport(sizeEl)
      } 

      // Open landing page
      cy.visit('/')
      cy.get('h3').should('have.text', landingPageH1Text)
    });

     it(`'Privacy Policy' opens and goes back to the landing page`, () => {

      cy.get('a').should('have.text', 'Privacy Policy.').should('be.visible').click()
      // User directed to new page
      cy.get('h1').should('have.text', 'Privacy policy')
      // User can go back to landing page (back button)
      cy.go('back')
      cy.get('h3').should('have.text', landingPageH1Text) 
    })

    it(`Launches Veriff via 'Incontext' and cancels/continues the veriff process`, () => {
      
      // 'Incontext' should default value
      cy.get(selectors.launcVia).should('be.checked').and('have.value', 'incontext').should('be.visible')
      cy.get(selectors.submitButton).should('be.visible').click()      
      cy.frameLoaded('#veriffFrame')
      cy.iframe().find('h1').should('have.text', demoSessionSecondPageH1Text)
      // Exit from verify session
      cy.iframe().find(selectors.exitButton).should('be.visible').click()
      // Dialogue box opened
      cy.iframe().find(selectors.dialogBox +'> h1').should('have.text', 'Leaving so soon?')
      // Continue with verify..
      cy.iframe().find(selectors.dialogBox + ' > div > ' + selectors.dialogueVerifyMeButton).should('be.visible').click()
      cy.iframe().find('h1').should('have.text', demoSessionSecondPageH1Text)
      // Exit from verify session
      cy.iframe().find(selectors.exitButton).should('be.visible').click()
      // Dialogue box opened
      cy.iframe().find(selectors.dialogBox + ' > div > ' + selectors.dialogueExitButton).should('be.visible').click()
      // User leaded to the landing page
      cy.get('h3').should('have.text', landingPageH1Text) 
    })

    it(`Launches Veriff via 'Redirect' and cancels/continues the veriff process`, () => {
      
      cy.get(selectors.launcVia).check('redirect')
      cy.get(selectors.submitButton).should('be.visible').click()
      cy.get('h1').should('have.text', demoSessionSecondPageH1Text) 
      // Exit from verify session
      cy.get(selectors.exitButton).should('be.visible').click()
      // Dialogue box opened
      cy.get(selectors.dialogBox +'> h1').should('have.text', 'Leaving so soon?')
      // Continue with verify..
      cy.get(selectors.dialogBox + ' > div > ' + selectors.dialogueVerifyMeButton).should('be.visible').click()
      cy.get('h1').should('have.text', demoSessionSecondPageH1Text)
      // Exit from verify session
      cy.get(selectors.exitButton).should('be.visible').click()
      // Dialogue box opened > click on exit link
      cy.get(selectors.dialogBox + ' > div > a').should('be.visible').click()
      // User to the veriff home page
      // TODO: assert redirection. Not sure why, cypress doesn't handle well this redirection.     
    }) 
  })
}) 
