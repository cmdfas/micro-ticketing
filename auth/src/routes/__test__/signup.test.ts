import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'pasw11'
        })
        .expect(201)
})


it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test123',
            password: 'pasw11'
        })
        .expect(400)
})

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test123',
            password: 'p'
        })
        .expect(400)
})

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@e.com'
        })
        .expect(400)

    await request(app)
        .post('/api/users/signup')
        .send({
            password: '123444'
        })
        .expect(400)
})

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123312312'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123312312'
        })
        .expect(400)
})

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test12@test.com',
            password: '123312312'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})