describe('Options page', () => {
  it('can set users', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.ipcRenderer = { invoke: cy.stub().returns(new Promise((resolve) => resolve(undefined))) };
      },
    });

    // By ending with enter
    cy.get('[data-testid=add-new-user-input]').type('Eric{enter}');
    cy.get('[data-testid=active-users-container]').should('contain.text', 'Eric');

    // By clicking add
    cy.get('[data-testid=add-new-user-input]').type('Mia');
    cy.get('[data-testid=submit-button]').click();
    cy.get('[data-testid=active-users-container]').should('contain.text', 'Mia');

    // Set user as driver
    cy.get('[data-testid=active-users-container]').children().last().click();
    cy.get('[data-testid=active-users-container]').children().first().should('have.text', 'Mia');

    // Make user inactive
    cy.get('[data-testid=active-users-container]').children().last().find('svg')
      .click();
    cy.get('[data-testid=active-users-container]').should('not.contain.text', 'Eric');
    cy.get('[data-testid=inactive-users-container]').should('contain.text', 'Eric');

    // Add new user and add to inactive
    cy.get('[data-testid=add-new-user-input]').type('Nora{enter}');
    cy.get('[data-testid=active-users-container]').children().last().find('svg')
      .click();

    // Remove a user
    cy.get('[data-testid=inactive-users-container]').children().first().find('svg')
      .click();
    cy.get('[data-testid=inactive-users-container]').should('not.contain.text', 'Eric');
    cy.get('[data-testid=active-users-container]').should('not.contain.text', 'Eric');

    // Set user active again
    cy.get('[data-testid=inactive-users-container]').children().first().click();
    cy.get('[data-testid=inactive-users-container]').should('not.contain.text', 'Nora');
    cy.get('[data-testid=active-users-container]').should('contain.text', 'Nora');

    // Add user and shuffle
    cy.get('[data-testid=add-new-user-input]').type('Peter{enter}');
    cy.get('button[data-testid=shuffle-users-button]').click();
    cy.get('[data-testid=active-users-container]').should('contain.text', 'Peter');
    cy.get('[data-testid=active-users-container]').should('contain.text', 'Mia');
    cy.get('[data-testid=active-users-container]').should('contain.text', 'Nora');
  });

  it('can set time', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.ipcRenderer = { invoke: cy.stub().returns(new Promise((resolve) => resolve(undefined))) };
      },
    });

    // Turn time
    cy.get('input[aria-label="Set turn time"]').type('10');

    cy.get('button[aria-label="Increase turn time"]').click();
    cy.get('button[aria-label="Increase turn time"]').click();
    cy.get('input[aria-label="Set turn time"]').should('have.value', '12');

    cy.get('button[aria-label="Decrease turn time"]').click();
    cy.get('input[aria-label="Set turn time"]').should('have.value', '11');

    // Break time
    cy.get('input[aria-label="Set break time"]').type('6');

    cy.get('button[aria-label="Increase break time"]').click();
    cy.get('input[aria-label="Set break time"]').should('have.value', '7');

    cy.get('button[aria-label="Decrease break time"]').click();
    cy.get('button[aria-label="Decrease break time"]').click();
    cy.get('input[aria-label="Set break time"]').should('have.value', '5');

    // Break turns
    cy.get('input[aria-label="Set break turns"]').type('3');

    cy.get('button[aria-label="Increase break turns"]').click();
    cy.get('button[aria-label="Increase break turns"]').click();
    cy.get('input[aria-label="Set break turns"]').should('have.value', '5');

    cy.get('button[aria-label="Decrease break turns"]').click();
    cy.get('input[aria-label="Set break turns"]').should('have.value', '4');
  });
});
