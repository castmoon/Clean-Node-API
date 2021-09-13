import request from 'supertest';

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

describe('SignUp routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        const accountCollection = MongoHelper.getCollection('accounts');
        await accountCollection.deleteMany({});
    });
    test('should return an account on success', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name: 'Guilherme',
                email: 'guilherme@teste.com',
                password: 'teste123',
                passwordConfirmation: 'teste123',
            })
            .expect(200);
    });
});