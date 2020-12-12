"use strict";
const NotesDAL = require("./notesDAL.js");

module.exports = async function (fastify, opts) {
  const notesDAL = NotesDAL(fastify.db);

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Notes"],
      description: "Get all note",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "unique a value" },
              title: { type: "string" },
              body: { type: "string", description: "Main content from note" },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      return [];
    },
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["Notes"],
      description: "Create a note",
      body: {
        type: "object",
        required: ["title", "body"],
        properties: {
          title: { type: "string" },
          body: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          required: ["id", "title", "body"],
          properties: {
            id: { type: "number", description: "unique a value" },
            title: { type: "string" },
            body: { type: "string", description: "Main content from note" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { title, body } = request.body;

      const newNotes = await notesDAL.createNote(title, body);

      return newNotes;
    },
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: {
      tags: ["Notes"],
      description: "Update a note",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },
      body: {
        type: "object",
        required: ["title", "body"],
        properties: {
          title: { type: "string" },
          body: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "number", description: "unique a value" },
            title: { type: "string" },
            body: { type: "string", description: "Main content from note" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      return [];
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      tags: ["Notes"],
      description: "Delete a note - WARNING - PERMANEND",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },
      response: {
        204: { type: "string", default: "No Content" },
      },
    },
    handler: async (request, reply) => {
      return;
    },
  });
};
