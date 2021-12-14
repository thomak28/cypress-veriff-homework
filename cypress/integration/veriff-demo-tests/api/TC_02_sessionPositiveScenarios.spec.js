// API positive scenarios

import  apiSessionData from  '../../../fixtures/apiSessionData.json'

// Running different configurations
apiSessionData.documentType.forEach((docTypeElem) => {

  describe(`Positve API scenarios with the conf: '${apiSessionData.fullName}', '${apiSessionData.language}', '${apiSessionData.documentCountry}', '${docTypeElem}'`, () => {

    it(`Configures the user data and gets the session token with the POST request: '${Cypress.config().baseUrl}'`, () => {
      cy.request({
        method: 'POST',
        url: Cypress.config().baseUrl,
        headers: {},
        body:
        {
          "full_name": apiSessionData.fullName,
          "lang": apiSessionData.language,
          "document_country": apiSessionData.documentCountry,
          "document_type": docTypeElem,
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

    it(`Gets the session ID and initData & confirms that session detaila are correct in the response. With the GET request: '${Cypress.env('integrationUrl')}${Cypress.env('sessionApi')}'`, () => {
      // Get session token  
      cy.task('get', 'sessionToken').then(sessionToken => {sessionToken               
        cy.request({
            method: 'GET',
            url: `${Cypress.env('integrationUrl')}${Cypress.env('sessionApi')}`,
            headers: { 'Authorization': `Bearer ${sessionToken}` },
          }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.id).to.be.a("string")
            expect(res.body.status).to.deep.equal('created')
            expect(res.body.initData.language).to.deep.equal(apiSessionData.language)
            expect(res.body.initData.preselectedDocument.country).to.deep.equal(apiSessionData.documentCountry)
            expect(res.body.initData.preselectedDocument.type).to.deep.equal(docTypeElem)
        });
      }) 
    });
  })
})