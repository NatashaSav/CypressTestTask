const getTinymce = () => {
    return cy
        .get('iframe#composebody_ifr')
        .its('0.contentDocument.body')
        .then(cy.wrap)
}
const login = () => {
    cy.visit("https://104.236.232.96/roundcube/");
    cy.get('#rcmloginuser').type('qa-test@arixess.com');
    cy.get('#rcmloginpwd').type('catch123');
    cy.get('#rcmloginsubmit').click();
    cy.wait(1000)
}
beforeEach(login);

describe('Check send email', () => {

    it.skip('Email should be send', () => {
        cy.get('#rcmbtn107').click()
        cy.get('#_to').type('nataliosn3452@gmail.com');
        cy.get('#compose-subject').type('Cypress Test Task 1');
        cy.get(':nth-child(2) > label > select').select('HTML').should('have.value', 'html');
        // cy.get('#rcmcomposepriority').select('High').should('have.value', '2');
        cy.get('#rcmcomposedsn').check().should('be.checked').and('have.value', '1');

        const msgText = `Необходимо написать тест, который будет проверять работу функции отправки письма. Также, после успешной отправки письма, тест должен находить отправленное письмо в папке "Отправленные" и удалять его. `

        const tinymce = getTinymce();
        tinymce.type(msgText);

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

    it('Email will be send', () => {
        cy.get('#rcmliU2VudA > a').click();

    })
})