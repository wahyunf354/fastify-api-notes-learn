'use strict'

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Healtycheck'],
      description: 'Healtycheck endpoint',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        }
      }
    },
    handler: async (request, reply) => {
      return { status: "OK", timestamp: new Date().toISOString() }
    }
  })
}
