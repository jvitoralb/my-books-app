import { expect, jest, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';


describe('User Component Error Handling Tests', () => {
    const serverResponse = jest.fn((call: { body: any, statusCode: number }) => call);

    afterEach(() => serverResponse.mockClear());

    test('answers with UNAUTHORIZED when update email without authorization header', async () => {
        const res = await request(app)
        .put('/api/v1/users/email')
        .send({ new_email: 'new_email@library.app' })
        .set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: { error: 'Not Authenticated' },
                statusCode: 401
            })
        );
    });

    test('answers with BAD REQUEST when update password is missing data', async () => {
        const res = await request(app)
        .put('/api/v1/users/password')
        .send({ new_password: '' })
        .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGViOWMzOGM2MzIxOTkyMDNiMTY3MjMiLCJlbWFpbCI6InlvLmFkbWluLmp2QGxpYnJhcnkuYXBwIiwiaWF0IjoxNjkzMTYyNTUzMDE5LCJleHAiOjE2OTMxNjMxNTc4MTl9.HcUxjkFCJEpWjeSswI27eT1zhOEO8AJTyfk0qW2YfcPSXvJz8H8J8Qu-Bcto-EVChyNcXzj9zZ8gt9i56kif0lOVeLCnuBZ02gcWSPd-kgg2IxTZveU1H98UtFPSBfZT4Q-yO2mlDA1yjRxZ0QiQ4ZkNIHdXez3lY7C0uOME2MBK3NF_pWrUnsDCszc2DSPIC-Oc0lwED3bxtwSgMjtDBpCjkCiutMCDt7giARk0ThyzknHtmFyYWZyzq1olsTkXfQ4n7-jLLYoedrgHC1jrGbahUMDMCct5EfFkiB8nuE-ynpf9nSgeKMLWbpOscxrGzIK2OBU3_1QO5JWezgFnDf891QxBLQNEveKsjHKbOMU3EYG0CV15ZCZRhxkEXNdR4IjetNTP73YuLkMJzW6QQ9Y1M-JmQuApMJxYKfw_jcVD2KNsMGQl21zDhYI7ZOxjc2YVQUcNz_3mnTCIEbgYHFOrA89CT1h47r2T1kA8XGpp9jILTopUzPu6rEtANsVof2k2c-4JRchrTSHqFlzKtRba5l1z2m3VszWZvJiKxHhqd6msKzknfLI-RUX0OGIfgQXOw31Ose-fYAK-FCqWIpt_sZKtfHdPZAkhO6rvQ-MRiDZtVE46GyIteeXNls_vEyMjym3irnNtc6p7mA7aQijpCc0S18u4VmWgOIliDPA')
        .set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: { error: 'Missing required field' },
                statusCode: 400
            })
        );
    });
});
