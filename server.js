// server.js

const fs = require('fs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = 3000

const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
hbs.registerPartials(partialsPath)

app.set('views', viewsPath)
app.set('view engine', 'hbs')

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Paolo Cianchetti'
	})
})

app.get('/weather', (req, res) => {
	// All query string key/value pairs are on req.query
	const address = req.query.address
	const nation = req.query.nation

	const dataBuffer = fs.readFileSync('./token.txt')
	const token = dataBuffer.toString()

	console.log('You provided "' + address + '" as the address ' + 'and "' + nation + '" as the nation')

	geocode(address, token, (error, data) => {
		if (!address) return res.send('The address is "undefined". Try to insert a valid location!')

		if (error) return res.send(error)

		forecast(data.longitude, data.latitude, (error, forecastData) => {
			if (error) return res.send(error)

			res.render('forecast', {
				location: data.location,
				forecast: forecastData
			})
		})
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'ERROR',
		errorMessage: 'Page not found.'
	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port + '.')
})
