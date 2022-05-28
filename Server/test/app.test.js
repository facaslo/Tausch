// Aquí van las pruebas donde se prueba el comportamiento de la base de datos
// o donde no se interactua con ella

// se puede evitar una prueba poniendo .skip despues de describe o de test
const supertest = require('supertest')
const app = require('../app')
const jwtGenerator = require('../utils/jwtGenerator')

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
        
        const response = await api.post('/register').send(newUser).expect(403)
        expect(response.body.errors[0].msg).toBe('Invalid value')
        expect(response.body.errors[0].param).toBe('email')
    })

    // afterAll(() => {
    //     server.close()
    // })

})

describe('POST /new-post', () => {

    test('Publicacion creada exitosamente.', async () => {

        const email = 'becjulio@gmail.com'

        const newPublication = {
            'title':'prueba-pub',
            'category':'Arte',
            'subcategory':'Obras',
            'description':'prueba-desc',
            'item_status':'nuevo',
            'exchange_for':'Arte',
            'file':'data:image/png'
        }

        const token = jwtGenerator(email)

        const response = await api.post('/new-post').set('token', token).send(newPublication).expect(200)
        expect(response.body.postingSuccess).toBe(true)
        expect(response.body.title).toBe(newPublication.title)
        expect(response.body.msg).toBe('Publicacion creada exitosamente.')
    })

    test('Usuario sin Token.', async () => {

        const newPublication = {
            'title':'prueba-pub',
            'category':'Arte',
            'subcategory':'Gimnasio',
            'description':'prueba-desc',
            'item_status':'nuevo',
            'exchange_for':'Arte',
            'file':'data:image/png'
        }

        const response = await api.post('/new-post').send(newPublication).expect(403)
        expect(response.body.authSuccess).toBe(false)
        expect(response.body.msg).toBe('El usuario no tiene Token')
    })

    test('Error al crear la publicacion.', async () => {

        const email = 'becjulio@gmail.com'

        const newPublication = {
            'title':'prueba-pub',
            'category':'Arte',
            'subcategory':'Gimnasio',
            'description':'prueba-desc',
            'item_status':'nuevo',
            'exchange_for':'Arte',
            'file':'data:image/png'
        }

        const token = jwtGenerator(email)

        const response = await api.post('/new-post').set('token', token).send(newPublication).expect(403)
        expect(response.body.errors[0].msg).toBe('Campo de subcategoria invalido.')// mensaje del error igual a Invalid value
        expect(response.body.errors[0].location).toBe('body')// parametro incorrecto igual a email
    })

})

describe.skip('DELETE /delete-post', () => {

    test('Eliminar publicacion por id.', async () => {

        const idObject = {id:39}// debe ser la ultima publicacion por id, se debe estar atento a la db

        const response = await api.delete('/delete-post').send(idObject).expect(200)
        expect(response.body.deleteSuccess).toBe(true)
        expect(response.body.msg).toBe('Publicacion borrada exitosamente.')
    })

})

describe('GET /publication_list', () => {
    
    test('Recibir primera pagina de posts (primeras 12 publicaciones).', async () => {

        const response = await api
            .get('/publication_list')
            .set({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .query({'page': 1, 'limit': 12, 'category': 'all'})
            .expect(200)
        expect(response.body.success).toBe(true)

    })

    test('Recibir primera pagina de posts (primeras 12 publicaciones) de la categoria Arte.', async () => {

        const response = await api
            .get('/publication_list')
            .set({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .query({'page': 1, 'limit': 12, 'category': 'Arte'})
            .expect(200)
        expect(response.body.success).toBe(true)
        expect(response.body.posts[0].categoria).toBe('Arte')
        expect(response.body.posts[1].categoria).toBe('Arte')

    })

})

describe('GET /user-posts', () => {

    test('Obtener publicaciones del usuario.', async () => {

        const email = 'becjulio@gmail.com'

        const token = jwtGenerator(email)

        const response = await api.get('/user-posts').set('token', token).expect(200)
        expect(response.body.success).toBe(true)
        expect(response.body.posts[0].email).toBe('becjulio@gmail.com')
        expect(response.body.posts[0].activa).toBe(true)
        
    })

    test('Solicitud por parte de un usuario sin token.', async () => {

        const response = await api.get('/user-posts').expect(403)
        expect(response.body.authSuccess).toBe(false)
        expect(response.body.msg).toBe('El usuario no tiene Token')
        
    })
})
