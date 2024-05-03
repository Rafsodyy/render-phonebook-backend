const express = require('express')
const morgan = require('morgan')
const morganBody = require('morgan-body')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
// morganBody(app)
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

// const generateId = () => {
// 	const maxId = persons.length > 0
// 	? Math.max(...persons.map(p => p.id))
// 	: 0
// 	return maxId + 1
// }

const generateId = () => {
	// const matchingId = persons.filter(person => p.id)
	const newId =  Math.floor(Math.random() * 10000);
	return newId
  }

const generateDate = () => {
	const date = new Date();
	let fullDate = date.toString();
	return fullDate
  }

app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for 2 people </p><p>${generateDate()}</p>`)
  })

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const personId = Number(request.params.id)
	const person = persons.find(person => person.id === personId)
	response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
	const personId = Number(request.params.id)
	persons = persons.filter(person => person.id !== personId)
	response.status(404).end()
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	const nameIsExisting = persons.find(person => person.name === body.name) ? true : false
	if(nameIsExisting === true){
		return response.json({
			error: "Name is already existing"
		})
	}

	if(!body.name){
		return response.status(400).json({
			error: 'Name is missing'
		})
	}
	if(!body.number){
		return response.status(404).json({
			error: 'Number is missing'
		})
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number
	}
	persons = persons.concat(person)

	// morgan.token('body', request => {
	// 	return JSON.stringify(request.body)
	// })

})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint'})
  }
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})