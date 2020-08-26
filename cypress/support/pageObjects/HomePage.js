export default class HomePage {

    login() {
        cy.visit("https://104.236.232.96/roundcube/");
        cy.get('#rcmloginuser').type('qa-test@arixess.com');
        cy.get('#rcmloginpwd').type('catch123');
        cy.get('#rcmloginsubmit').click();
        cy.wait(1000)
    }
}