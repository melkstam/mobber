describe('Timer page', () => {
  it('can run through a full loop of turns', () => {
    cy.clock();

    cy.visit('/', {
      onBeforeLoad(win) {
        win.ipcRenderer = { invoke: cy.stub() };
      },
    });

    // Low numbers to increase performance
    const turnTime = 2;
    const breakTime = 3;
    const breakTurns = 3;
    const activeUsers = ['Shaun', 'Veronica', 'Stephanie'];
    const inactiveUsers = ['Sandra', 'Gary'];
    cy.setupOptions(turnTime, breakTime, breakTurns, activeUsers, inactiveUsers);

    cy.get('button[data-testid=start-mobbing-button]').click();

    for (let i = 0; i < breakTurns - 1; i += 1) {
      const driver = activeUsers[i % activeUsers.length];
      const upNext = activeUsers[(i + 1) % activeUsers.length];
      cy.get('[data-testid=current-driver-user]').should('have.text', driver);
      cy.get('[data-testid=next-driver-user]').should('have.text', upNext);

      cy.tick(turnTime * 60 * 1000);
      cy.get('button[data-testid=start-timer-button]').click();
    }
    cy.tick(turnTime * 60 * 1000);

    cy.get('button[data-testid="take-break-button"]').click();
    cy.tick(breakTime * 60 * 1000);
  });
});
