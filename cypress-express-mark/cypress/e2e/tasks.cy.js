/// <reference types="cypress" />

describe('tasks', ()=>{
    it('should register a new task', ()=>{
        cy.visit('http://localhost:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Ler um livro de Node.js')
    })
})