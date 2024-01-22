/// <reference types="cypress" />

describe('tasks', ()=>{
    it('should register a new task', ()=>{
        cy.request({
            url:'http://localhost:3333/helper/tasks',
            method:'DELETE',
            body:{
                name:'Ler um livro de nodejs'
            }
        }).then(response =>{
            expect(response.status).to.eq(204)
        })


        cy.visit('http://localhost:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Ler um livro de nodejs')

        //button[contains(text(),'Create')]
        cy.contains('button', 'Create').click()

        cy.get('main div p')
            .should('be.visible')
            .should('have.text', 'Ler um livro de nodejs')

        cy.contains('main div p', 'Ler um livro de nodejs')
            .should('be.visible')
    })

    it('should not allow duplated task',()=>{
        cy.request({
            url:'http://localhost:3333/helper/tasks',
            method:'DELETE',
            body:{
                name:'Estudar javascript'
            }
        }).then(response =>{
            expect(response.status).to.eq(204)
        })

        //Dado que eu tenho uma tarefa duplicada
        cy.request({
            url:'http://localhost:3333/tasks',
            method:'POST',
            body: {name:'Estudar javascript', is_done: false}
        }).then(response =>{
            expect(response.status).to.eq(201)
        })

        //Quando faço o cadastro dessa tarefa
        cy.visit('http://localhost:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Estudar javascript')

        cy.contains('button', 'Create').click()//button[contains(text(),'Create')]

        //Então vejo a mensagem de duplicidade
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text','Task already exists!')

    })
})