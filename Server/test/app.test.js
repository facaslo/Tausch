// Aquí van las pruebas unitarias

import supertest from 'supertest'
import app from '../app.js'

describe('POST /register', () => {

    describe('Registrar usuario correctamente.', () => {
        test('Debe retornar status 200', () => {
            const response = request(app).post('/register').send(
                {
                    "userName":"testUser",
                    "password":"O6@NsmXVJmoJ",
                    "email":"testCorreo@gmail.com", 
                    "firstName":"nombre", 
                    "lastName":"apellido", 
                    "age":"40",
                    "phoneNumber":"3131311234",
                    "facebook":"testface",
                    "twitter":"@testtweet",
                    "instagram":"instatest"
                }
            )
            expect(response.statusCode).toBe(200)
        })
    })

    // describe('Registrar usuario incorrectamente.', () => {
        
    // })


})