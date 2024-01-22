/// <reference types="cypress" />

describe('tasks', () => {
    it('should register a new task', () => {
        const taskName = 'Ler um livro de nodejs'

        cy.removeTaskByName(taskName)
        cy.createTask(taskName)
        cy.contains('main div p', taskName)
            .should('be.visible')
    })

    it('should not allow duplated task', () => {
        const task = {
            name: 'Estudar javascript',
            is_done: false
        }

        cy.removeTaskByName(task.name)
        //Dado que eu tenho uma tarefa duplicada
        cy.postTask(task)
        //Quando faço o cadastro dessa tarefa
        cy.createTask(task.name)
        //Então vejo a mensagem de duplicidade
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
    })
})

Cypress.Commands.add('createTask', (taskName) => {
    cy.visit('http://localhost:8080')

    cy.get('input[placeholder="Add a new Task"]').type(taskName)

    cy.contains('button', 'Create').click()    //button[contains(text(),'Create')]
})

Cypress.Commands.add('removeTaskByName', (taskName) => {
    cy.request({
        url: 'http://localhost:3333/helper/tasks',
        method: 'DELETE',
        body: { name: taskName }
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('postTask', (task) => {
    cy.request({
        url: 'http://localhost:3333/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})