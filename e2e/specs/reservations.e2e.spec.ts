describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    const user = {
      email: 'staylytest1@example.com',
      password: 'StrogPassword123!@',
    };
    const resp = await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('create user', resp);
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('login', response);
    jwt = await response.text();
  });

  test('Create & Get', async () => {
    const createdReservation = await createReservation();
    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );
    const reservation = await responseGet.json();
    expect(createdReservation).toEqual(reservation);
  });

  const createReservation = async () => {
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
        body: JSON.stringify({
          startDate: '10-30-26',
          endDate: '10-31-26',
          placeId: '12345',
          invoiceId: '493',
          charge: {
            amount: 100,
            paymentMethodId: 'pm_card_visa',
          },
        }),
      },
    );
    console.log('responseCreate', responseCreate);
    expect(responseCreate.ok).toBeTruthy();
    return responseCreate.json();
  };
});
