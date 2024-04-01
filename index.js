const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const morganBody = require ('morgan-body')

//cross origin middleware for deployement 
app.use(cors())
//Parser first then followed by morganBody
app.use(express.json())
//morgan hook for the app
morganBody(app)
//Custom app use token to log using morgan
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

//Use the dist production build front-end
app.use(express.static('dist'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateDate = () => {
  const date = new Date();
  let fullDate = date.toString();
  return fullDate
}

const generateId = () => {
  // const matchingId = persons.filter(person => p.id)
  const newId =  Math.floor(Math.random() * 10000);
  return newId
}

app.get('/api/persons', (request, response) => {
	response.json(persons) 
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for 2 people</p><p>${generateDate()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})




app.post('/api/persons', (request, response) => {
  const body = request.body
  const nameIsExisting = persons.find(person => person.name === body.name) ? true : false
  console.log(nameIsExisting)
  //if else Guard
  if(nameIsExisting === true){
      return response.status(404).json({
        error: "Name must be unique"
      })
    }
  if(!body.name || !body.number){
    return response.status(404).json({
      error: "Name or number is missing"
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)

  morgan.token('body', req => {
    return JSON.stringify(req.body)
  })

})


const PORT = process.env.PORT || 3001
app.listen( PORT, () => {
  console.log(`Server running on port ${PORT}`)
})