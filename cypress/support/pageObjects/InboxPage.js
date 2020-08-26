export default class InboxPage {
    getPage() {
        cy.get('#rcmliSU5CT1g').click()
        cy.wait(1000);
    }

    getFirstLetter() {
        return cy.get('#messagelist tbody tr').first()
    }

}