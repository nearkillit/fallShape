import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

Cypress.Commands.add('login', (username) => {
  cy.get('[name=USER_ID]').type(username)

  cy.get('[data-test=login]').click()
})

Cypress.Commands.add('gotoTestPage', () => {
  //   cy.get('.navbar > div > .btn').click()

  cy.contains('ログイン').click()
})

addMatchImageSnapshotCommand({
  failureThreshold: 0.0,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.0 },
  capture: 'viewport',
})
