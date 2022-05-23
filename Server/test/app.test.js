// Aquí van las pruebas unitarias
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('POST /register', () => {

    test('Registro invalido, email no valido.', async () => {
        const newUser = {
                "userName":"testUser",
                "password":"O6@NsmXVJmoJ",
                "email":"testCorreil.com", 
                "firstName":"nombre", 
                "lastName":"apellido", 
                "age":"40",
                "phoneNumber":"3131311234",
                "facebook":"testface",
                "twitter":"@testtweet",
                "instagram":"instatest"
            }
        
        const response = await api.post('/register').send(newUser).expect(403) // responseCode = 403 forbidden
        expect(response.body.errors[0].msg).toBe('Invalid value')// mensaje del error igual a Invalid value
        expect(response.body.errors[0].param).toBe('email')// parametro incorrecto igual a email
    })

    // afterAll(() => {
    //     server.close()
    // })

})

describe.skip('POST /new-post', () => {// tenerla en cuenta

    test('Error al crear la publicacion.', async () => {

        const newPublication = {
            "title": "zapatos malos",
            "image": "imagen.png",
            "category": "Arte",
            "subcategory": "Gimnasio",
            "description": "zapatos malandros",
            "publication_date": "2022/04/10",
            "item_status": "Nuevo",
            "exchange_for": "Vehículos"
        }

        const response = await api.post('/new-post').send(newPublication).expect(403)
        expect(response.body.errors[0].msg).toBe('Campo de subcategoria invalido.')// mensaje del error igual a Invalid value
        expect(response.body.errors[0].location).toBe('body')// parametro incorrecto igual a email
    })

})

describe.skip('DELETE /delete-post', () => {

    test('Eliminar publicacion por id.', async () => {

        const idObject = {id:5}

        const response = await api.delete('/delete-post').send(idObject).expect(200)
        expect(response.body.deleteSuccess).toBe(true)
        expect(response.body.msg).toBe('Publicacion borrada exitosamente.')
    })

})
