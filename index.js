const express=require('express')

const app = express()

require('dotenv').config()

const personDb = require('./models/phonebook')

app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())
const morgan = require('morgan')
const morganBody = require('morgan-body')
// const mongoose = require('mongoose')
app.use(express.json())
morganBody(app)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const generateDate = () => {
  	const date = new Date()
	let fullDate = date.toString()
	return fullDate
}

const countPhonebook = (next) => {
	return personDb.find({})
		.then(phonebookData => phonebookData.length)
		.catch(error => next(error))
}


app.get('/info', (request, response) => {
	countPhonebook()
		.then(count => {
			response.send(`<p>Phonebook has info for ${count} people </p><p>${generateDate()}</p>`)
		})
})

app.get('/api/persons', (request, response) => {
	personDb.find({})
		.then( phonebookData => {
			response.json(phonebookData)
			console.log(phonebookData)
		})
})

app.get('/api/persons/:id', (request, response, next) => {
	personDb.findById(request.params.id).then(phonebookData => {
		if(phonebookData){
			response.json(phonebookData)
		} else {
			response.status(404).end()
		}  
	})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	// const personId = Number(request.params.id)
	// persons = persons.filter(person => person.id !== personId)
	// response.status(404).end()
	const body = request.body
	console.log('Thsi is the id of object to delete', request.params.id)
	console.log('This is the body', body.name, body.number)
	personDb.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

const inspectValidPhonebook = (name, number) => {
	
	return console.log(number, name, 'inspected')
	// if(number.length >= 8 ){
	// 	return number
	// } else {
	// 	return response.status(400).json({ error: 'Number must be greater or equal to 8 numbers '})
	// }
}

app.put('/api/persons/:id', (request, response, next) => {
	const {name, number} = request.body
	inspectValidPhonebook(name, number)
	personDb.findByIdAndUpdate(
		request.params.id,
		{name, number},
		{new: true, runValidators: true, context: 'query'})
		.then(updatedPhonebook => {
			if (!updatedPhonebook) {
				return response.status(404).json({ error: 'Person not found' })
			} else {
				console.log(updatedPhonebook)
				response.json(updatedPhonebook)
			}
		})
		.catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
	const body = request.body
	// inspectValidPhonebook(body.name, body.number)
	if(!body.name && !body.number){
		return response.status(400).json({ error: 'Name or number is missing'})	
	}
	const person = new personDb ({
		name: body.name,
		number: body.number
	})

	person.save()
		.then(savedPhonebook => {
			if(savedPhonebook){
				return response.json(savedPhonebook)
			} else {
				return response.status(404).json({ error: 'Empty response'})
			}
		})
		.catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint'})
}

const  errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if(error.name === 'CastError'){
		return response.status(404).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError'){
		return response.status(400).json({ error: error.message })
	}
	next(error)
}


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})