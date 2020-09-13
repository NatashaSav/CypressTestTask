import HomePage from "../../../support/pageObjects/HomePage";
import InboxPage from "../../../support/pageObjects/InboxPage";


beforeEach(() => new HomePage().login());

describe('Status letter test', function () {

    it('should be mark letter as unread', function () {
        const inboxPage = new InboxPage();
        inboxPage.getPage();
        cy.wait(1000);
        inboxPage.getFirstLetter().dblclick();
        cy.wait(1000);
        cy.get('#markmessagemenulink').click()
        cy.get('#markmessagemenu-menu > :nth-child(2)')
            .should('have.text', 'As unread')
            .click();

        cy.wait(100);
        cy.get('.confirmation')
            .should('have.text', 'Message(s) marked successfully.')

        cy.get('#rcmbtn106').click();
        cy.wait(1000);

        inboxPage.getFirstLetter().should('have.class', 'unread');
    })

    it('should be mark letter ar read', function () {
        const inboxPage = new InboxPage();
        inboxPage.getPage();
        cy.wait(1000);
        inboxPage.getFirstLetter().click();

        cy.get('#markmessagemenulink').click()
        cy.get('#markmessagemenu-menu > :nth-child(1)')
            .should('have.text', 'As read')
            .click()

        cy.wait(100);
        cy.get('.confirmation')
            .should('have.text', 'Message(s) marked successfully.');

        inboxPage.getFirstLetter().should('not.have.class', 'unread');
    })

})