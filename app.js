// app.js

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', function(event) {
	event.preventDefault()

	const location = search.value

	window.location.href = 'http://localhost:3000/weather?address=' + location
})
