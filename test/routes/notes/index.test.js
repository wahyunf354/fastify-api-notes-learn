/* eslint-disable no-undef */
const setupEnvironmentTest = require("../../setupEnvironmentTest");

const fastify = setupEnvironmentTest();

test("should create a notes via POST route", async () => {
  const requestPayload = {
    title: "my test note",
    body: "lorem ipsum",
  };

  const serverResponse = await fastify.inject({
    url: "/notes",
    method: "POST",
    payload: requestPayload,
  });

  expect(serverResponse.json().title).toEqual(requestPayload.title);
  expect(serverResponse.json().body).toEqual(requestPayload.body);
});

test("should retrieve created notes", async () => {
  const serverResponse = await fastify.inject({
    url: "/notes",
    method: "GET",
  });

  expect(serverResponse.statusCode).toBe(200);
});

test("should update a note", async () => {
  const requestPayload = {
    title: "my test note",
    body: "lorem ipsum",
  };

  const requestUpdatePayload = {
    title: "Coba diupdate",
    body: "lalaal",
  };

  const postNoteTest = await fastify.inject({
    url: "/notes",
    method: "POST",
    payload: requestPayload,
  });

  const updateResponse = await fastify.inject({
    url: `/notes/${postNoteTest.json().id}`,
    method: "PUT",
    payload: requestUpdatePayload,
  });

  expect(updateResponse.statusCode).toBe(200);
  expect(updateResponse.json().title).toEqual(requestUpdatePayload.title);
  expect(updateResponse.json().body).toEqual(requestUpdatePayload.body);
});

test.todo("should delete a note");
