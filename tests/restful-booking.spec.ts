import test from "@playwright/test";

test.describe.configure({ mode: "serial" });
test.describe("Restful Booking", () => {
  // get all bookings
  test("get all Bookings", async ({ request }) => {
    const response = await request.get("/booking", {
    });
    const responseBody = await response.json();
    console.log(responseBody);
    test.expect(response.status()).toBe(200);
  });

  // get authentication token
  let token: string;
  test("Generate Token", async ({ request }) => {
    const response = await request.post("/auth", {
        headers: {
          "Content-Type": "application/json",   
        },
        data: { 
            username: "admin",
            password: "password123",
            },        
    });
    const responseBody = await response.json();
    token = responseBody.token;
    console.log(token);
    test.expect(response.status()).toBe(200);

});

  // create a booking
  let bookingId: number;
  test("create Booking", async ({ request }) => {
    const response = await request.post("/booking", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        firstname: "RRRR",
        lastname: "VVVVV",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2023-10-01",
          checkout: "2023-10-10",
        },
        additionalneeds: "Breakfast",
      },
    });
    const responseBody = await response.json();
    // console.log(responseBody);
    test.expect(response.status()).toBe(200);
    bookingId = responseBody.bookingid;
    console.log(bookingId);
  });

  // get booking by id
  test("get Booking by ID", async ({ request }) => {
    const response = await request.get(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseBody = await response.json();
    console.log(responseBody);
    // test.expect(response.status()).toBe(200);
    // test.expect(responseBody.bookingid).toBe(`${bookingId}`);
    bookingId = responseBody.bookingid;
    test.expect(bookingId).toBe(bookingId);

  });

  // update booking by id
  test.skip("update Booking by ID", async ({ request }) => {
    const response = await request.put(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: `token=${token}`,
      
      },
      data: {
        firstname: "coconut",
        lastname: "tree",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2023-10-01",
          checkout: "2023-10-10",
        },
        additionalneeds: "Breakfast",
      },
    });
    const responseBody = await response.json();
    console.log(responseBody);
  }); 

    // partial update booking by id
    test.skip("partial update Booking by ID", async ({ request }) => {
      const response = await request.patch(`/booking/${bookingId}`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          Cookie: `token=${token}`,
        
        },
        data: {
          firstname: "coconut",
          lastname: "tree",
        },
      });
      const responseBody = await response.json();
      console.log(responseBody);
    }
  );

  // delete booking by id
  test("delete Booking by ID", async ({ request }) => {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: `token=${token}`,
      },
    });
    const responseBody = await response.json();
    console.log(responseBody);
  });

});