import HomePage from "../support/pageObjects/HomePage";

const getTinymce = () => {
    return cy
        .get('iframe#composebody_ifr')
        .its('0.contentDocument.body')
        .then(cy.wrap)
}

beforeEach(() => new HomePage().login());

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

describe('Check send email', () => {

    before(function () {
        return cy.fixture('message.json').as('msgData')
            .then(() => {
                this.emailSubject = `${this.msgData.subject} ${uuidv4()}`
            })

    })

    it('Email should be send', function () {

        cy.get('#rcmbtn107').click()
        cy.get('#_to').type(this.msgData.to);
        cy.get('#compose-subject').type(this.emailSubject);
        cy.get(':nth-child(2) > label > select').select('HTML').should('have.value', 'html');
        // cy.get('#rcmcomposepriority').select('High').should('have.value', '2');
        cy.get('#rcmcomposedsn').check().should('be.checked').and('have.value', '1');

        const tinymce = getTinymce();
        tinymce.type(this.msgData.body);
        cy.fixture('img/test.png')
            .then(fileContent => {
                cy.get('#compose-attachments')
                    .attachFile({
                        fileContent,
                        fileName: 'file.png',
                        mimeType: 'image/png'
                    }, {subjectType: 'drag-n-drop'});
            })

        cy.wait(3000)
        cy.get('#rcmbtn107').click();

    });

    it('Email will be send', function () {
        cy.get('#rcmliU2VudA > a').click();
        cy.wait(1000)
        cy.get('#quicksearchbox')
            .type(this.emailSubject)
            .should('have.value', this.emailSubject);

        cy.get('form[name="rcmqsearchform"]').submit();
        cy.wait(1000)

        cy.get('#messagelist tbody tr').should('have.length', 1)

        cy.get('#messagelist tbody tr')
            .each(function ($element) {
                cy.wrap($element).click()
                cy.get('#rcmbtn111').click();
                cy.wait(1000)
            })
    })
})