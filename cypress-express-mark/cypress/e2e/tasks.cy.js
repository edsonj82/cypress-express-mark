/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
// or, if desiring a different locale

faker.person.jobType()

describe('tasks', ()=>{
    it('should register a new task', ()=>{
        cy.visit('http://localhost:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type(faker.person.jobType() + ' - Step by Step')

            //button[contains(text(),'Create')]
            cy.contains('button', 'Create').click()
    })
})