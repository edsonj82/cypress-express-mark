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

    it('required field', ()=>{
        cy.createTask()
        cy.get('input[placeholder="Add a new Task"]')
            .invoke('prop','validationMessage')
            .should((text)=>{
                expect('This is a required field'
                ).to.eq(text)
            })
    })
})