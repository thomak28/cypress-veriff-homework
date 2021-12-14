# cypress-veriff-homework
Pre-requisites: node.js & git

How to run tests:
1) Clone the repo
2) Open the project folder: "cypress-veriff-homework" 
3) run the script (running tests and creating report)
> npm run test:run:and:create:report
4) running without the report generation 
> npm run cy:run

Remark: Sometimes generating the report fails (usually when tests are failing), so after running tests, run the script: 
> npm run create:html:report
