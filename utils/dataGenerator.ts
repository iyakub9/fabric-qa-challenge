export function generateRandomUser() {
    const randomName = Math.random().toString(36).slice(2, 9);
    return {
        firstName: 'Test',
        lastName: 'User',
        username: `user${randomName}`,
        password: 'Pass123!',
        address: '123 Test St',
        city: 'Melbourne',
        state: 'VIC',
        zipCode: '3000',
        phone: '0400000000',
        ssn: '123-45-6789',
    };
}
