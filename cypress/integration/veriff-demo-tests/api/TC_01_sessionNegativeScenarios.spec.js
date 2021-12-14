// API negative scenarios

import  negSceApiSessionData from  '../../../fixtures/negSceApiSessionData.json'

describe(`Checks different API negative scenarios with API request`, () => {
  
  it(`Error given when POST request: '${Cypress.config().baseUrl}' body is empty.`, () => {
    
    cy.request({
      method: 'POST',
      url: Cypress.config().baseUrl,
      failOnStatusCode: false, 
      headers: {},
      body:
      { 
        
      }
    }).then((res) => {
      expect(res.status).to.eq(500)
    })
  })    

  // Looping different document country confs
  negSceApiSessionData.documentCountry.forEach((docCountryEl) => {   

    it(`Error given when wrong document country: '${docCountryEl}' used in the POST request: '${Cypress.config().baseUrl}'`, () => {
      
      cy.request({
        method: 'POST',
        url: Cypress.config().baseUrl,
        failOnStatusCode: false, 
        headers: {},
        body:
        {
          "full_name": '',
          "lang": '',
          "document_country": docCountryEl,
          "document_type": 'PASSPORT',
          "additionalData": {
            "isTest": false
          }
        }
      }).then((res) => {
        expect(res.status).to.eq(400)
        expect(res.body).to.be.empty
      })
    })    
  })

  // Looping different document type confs
  negSceApiSessionData.documentType.forEach((docTypeEl) => {   

    it(`Error given when wrong document type: '${docTypeEl}' used in the POST request: '${Cypress.config().baseUrl}'`, () => {
   
      cy.request({
        method: 'POST',
        url: Cypress.config().baseUrl,
        failOnStatusCode: false, 
        headers: {},
        body:
        {
          "full_name": '',
          "lang": '',
          "document_country": 'EE',
          "document_type": docTypeEl,
          "additionalData": {
            "isTest": false
          }
        }
      }).then((res) => {
        expect(res.status).to.eq(400)
        expect(res.body).to.be.empty       
      })
    })
  })      
  
  it(`Error given when session token is wrong in the GET request: '${Cypress.env('integrationUrl')}${Cypress.env('sessionApi')}'`, () => {
    
    // Get correct sessionToken
    cy.request({
      method: 'POST',
      url: Cypress.config().baseUrl,
      headers: {},
      body:
      {
        "full_name": '',
        "lang": '',
        "document_country": 'EE',
        "document_type": 'PASSPORT',
        "additionalData": {
          "isTest": false
        }
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.sessionToken).to.be.a("string");
      let sessionToken = res.body.sessionToken
      
      // Session request with incorrect sessionToken
      cy.request({
        method: 'GET',
        url: `${Cypress.env('integrationUrl')}${Cypress.env('sessionApi')}`,
        failOnStatusCode: false,
        // Adding prefix: '+wrong token' to add wrong sessionToken
        headers: { 'Authorization': `Bearer ${sessionToken}+wrong token` },
      }).then((res) => {
        expect(res.status).to.eq(401)
        expect(res.body.message).to.equal('Authentication failed')
        expect(res.body.code).to.equal('E00010')
        expect(res.body.level).to.equal('error')
        expect(res.body.service).to.equal('end-user-backend')
      }) 
    })     
  })   
})  
