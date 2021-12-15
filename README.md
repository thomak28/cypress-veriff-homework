# cypress-veriff-homework
Pre-requisites: node.js & git

How to run tests (Tested with Windows not tested on MacOS):
1) Clone the repo 
> git clone https://github.com/thomak28/cypress-veriff-homework.git
3) Open the project folder: "cypress-veriff-homework"
> npm intall 
4) Run the script (running tests and creating report)
> npm run test:run:and:create:report
5) running without the report generation 
> npm run cy:run
6) Sometimes generating the report fails (usually when tests are failing, seems like a "mochawesome" report bug), so after running tests, run the script: 
> npm run create:html:report

Reports folder cleanup: 
> npm run delete:reportFolder
