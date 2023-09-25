import Fastify from "fastify";

const PORT = 3333

const server = Fastify({
  logger: true
})

server.get('/', (req, reply) => {
  reply.send({hello: 'world'})
})

server.listen({ port: PORT }).then(() => {
  console.log(`HTTP server running on http://localhost:${PORT}`)
})