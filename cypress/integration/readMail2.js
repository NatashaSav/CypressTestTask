import HomePage from "../support/pageObjects/HomePage";
import InboxPage from "../support/pageObjects/InboxPage";

beforeEach(() => new HomePage().login());

describe('Read email test', function () {

    it('first email should be read', function () {
        const inboxPage = new InboxPage();
        cy.location().then(homeLoc => {
            inboxPage.getFirstLetter().dblclick();
            cy.wait(1000);
            cy.get('#rcmbtn106').click();
            cy.wait(1000);
            cy.location().then((loc) => {
                expect(loc.href).to.equal(homeLoc.href);
            })
        });

    })
})