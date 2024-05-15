const express = require('express')
let bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors');
//Routes
const app = express()
const port = 3000
//ORM
const prisma = new PrismaClient()
//CORS to allow frontend
app.use(cors());
//get data to and from requests
//app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

app.post('/users', async (req, res) => {
  
  if(!req.body){
    return res.status(400).send('Geen request body')  
  }
  const { email, name } = req.body
  const result = await prisma.user.create({
    data: {
      email,
      name,
    },
  })
  res.json(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})