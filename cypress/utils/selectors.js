export default {
    nameField: '[name=name]',
    sessionLanguageButton: '[name=language]',
    documentCountryField: '[name=documentCountry]',
    documentTypeButton: '[name=documentType]',
    selectOption: '[role=option] > span',
    launcVia: '[name=launchVia]',
    submitButton: '[type=submit]',
    exitButton: '[aria-label=Exit]',
    dialogBox: 'div[role=dialog]',
    // CSS doesnt support > button:contains("Exit/Verify Me") > currently going with ugly solution.
    dialogueVerifyMeButton: 'button:last-of-type',
    dialogueExitButton: 'button:first-of-type',
    // Not good selectors using class this way, either need to find better solution or FE Dev needs to put better web hooks.
    buttonStartSession: 'button[class="b1c7psjy i1l89s5o"]',  
};