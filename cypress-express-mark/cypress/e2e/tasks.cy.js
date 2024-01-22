/// <reference types="cypress" />

describe('tasks', ()=>{
    it('should register a new task', ()=>{
        const taskName = 'Ler um livro de nodejs'

        cy.request({
            url:'http://localhost:3333/helper/tasks',
            method:'DELETE',
            body:{ name: taskName }
        }).then(response =>{
            expect(response.status).to.eq(204)
        })


        cy.visit('http://localhost:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type(taskName)

        //button[contains(text(),'Create')]
        cy.contains('button', 'Create').click()

        cy.contains('main div p', taskName)
            .should('be.visible')
    })

    it('should not allow duplated task',()=>{
        const task ={
            name: 'Estudar javascript',
            is_done: false
        }    

        cy.request({
            url:'http://localhost:3333/helper/tasks',
            method:'DELETE',
            body:{
                name: task.name
            }
        }).then(response =>{
            expect(response.status).to.eq(204)
        })

        //Dado que eu tenho uma tarefa duplicada
        cy.request({
            url:'http://localhost:3333/tasks',
            method:'POST',
            body: task
        }).then(response =>{
            expect(response.status).to.eq(201)
        })

        //Quando faço o cadastro dessa tarefa
        cy.visit('http://localhost:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type(task.name)

        cy.contains('button', 'Create').click()//button[contains(text(),'Create')]

        //Então vejo a mensagem de duplicidade
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text','Task already exists!')

    })
})