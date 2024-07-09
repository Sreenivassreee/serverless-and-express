import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()

app.get('/', async (c) => {

  const prisma = getPrisma(c.env.DATABASE_URL);
  const res = await prisma.user.create({
    data: {
      name: "Sreenivas K",
      phone: "9505501046"
    }
  })
  return c.json(res)
})
app.post('/', (c) => {
  return c.text('post')
})

const getPrisma = (database_url: string) => {
  const prisma = new PrismaClient({
    datasourceUrl: database_url,
  }).$extends(withAccelerate());
  return prisma
}

export default app
