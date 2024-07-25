// forecast.js

const request = require('request')

const forecast = (longitude, latitude, callback) => {
	const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&temperature_unit=celsius&current=temperature_2m,apparent_temperature,wind_speed_10m,relative_humidity_2m,precipitation,precipitation_probability,cloud_cover'

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined)	
		} else if (!body) {
			callback('Unable to find location!', undefined)		
		} else {
			//const currentResponse = response.body.current
			callback(undefined, 'It is currently ' + body.current.temperature_2m + ' degrees out. ' + 'It feels like ' + body.current.apparent_temperature + ' degrees out. ' + 'There is a ' + body.current.precipitation_probability + '% chance of rain. ' + 'Cloud cover is ' + body.current.cloud_cover + '%')
		}	
	})
}

module.exports = forecast
