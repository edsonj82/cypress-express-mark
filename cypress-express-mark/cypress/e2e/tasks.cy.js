/// <reference types="cypress" />

describe('tasks', () => {
    context('register', () => {
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

        it('required field', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })
    context('update', () => {
        it('should complete a task', () => {
            const task = {
                name: 'Ler um livro de nodejs',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('http://localhost:8080')
            //(//p[contains(text(),"Ler um livro de nodejs")]/..//button)[1]
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')//button[class*=ItemToggle]
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')//validar marcado
        })
    })
})