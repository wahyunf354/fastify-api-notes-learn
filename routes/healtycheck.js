module.exports = async function (fastify) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Healtycheck"],
      description: "Healtycheck endpoint",
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
            timestamp: { type: "string", format: "date-time" },
          },
        },
      },
    },
    handler: async () => {
      return { status: "OK", timestamp: new Date().toISOString() };
    },
  });
};
