// Aquí van las pruebas donde la base de datos no es necesaria pero si se interactua con ella
// y por lo mismo es mejor hacerle un mock

// se puede evitar una prueba poniendo .skip despues de describe o de test
const supertest = require('supertest')
const app = require('../app')

jest.mock('../middleware/validateRegister')
jest.mock('../middleware/validateLogin')

const api = supertest(app)

describe('POST /register', () => {

    test('Registro exitoso.', async () => {
        
        const newUser = {
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
        
        const response = await api.post('/register').send(newUser).expect(200) // responseCode = 200 OK
        expect(response.body.registerSuccess).toBe(true) // registerSuccess = true
        expect(response.body.email)
    })

    test('Registro incorrecto, usuario existente.', async () => {

        const newUser = {
                "userName":"user-julio",
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
        
        const response = await api.post('/register').send(newUser).expect(200) // responseCode = 200 OK
        expect(response.body.registerSuccess).toBe(false) // registerSuccess = false
        expect(response.body.emailOrUserAvailable).toBe(false) // email o usuario no disponible
    })
    
    // afterAll(() => {
    //     server.close()
    // })

})

describe('POST /login', () => {

    test('Inicio de sesion exitoso.', async () => {
        const userLogin = {
            "email": "becjulio@gmail.com",
            "password": "O6@NsmXVJmoJ"
          }
        
        const response = await api.post('/login').send(userLogin).expect(200) // responseCode = 200 OK
        expect(response.body.loginSuccess).toBe(true) // loginSuccess = true
        expect(response.body.credentialsValidated).toBe(true) // credentialsValidated = true
        expect(response.body.isActivated).toBe(true) // icActivated = true
    })

    test('Inicio de sesion fallido, cuenta no activada.', async () => {
        const userLogin = {
            "email": "jubedoyag@unal.edu.co",
            "password": "O6@NsmXVJmoJ"
          }
        
        const response = await api.post('/login').send(userLogin).expect(200) // responseCode = 200 OK
        expect(response.body.loginSuccess).toBe(false) // loginSuccess = false
        expect(response.body.credentialsValidated).toBe(true) // credentialsValidated = true
        expect(response.body.isActivated).toBe(false) // icActivated = false
    })

    test('Inicio de sesion invalido, contraseña incorrecta.', async () => {
        const userLogin = {
            "email": "becjulio@gmail.com",
            "password": "O6@HablamosJmoJ"
          }
        
        const response = await api.post('/login').send(userLogin).expect(200) // responseCode = 200 OK
        expect(response.body.loginSuccess).toBe(false) // loginSuccess = false
        expect(response.body.credentialsValidated).toBe(false) // credentialsValidated = false
    })

})
