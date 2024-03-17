const inputs = Array.from(document.querySelectorAll('form input'))
const errorMessages = document.querySelectorAll('form > div p')
let cardValues = document.querySelectorAll('.cards p') 
/*
inputs.forEach((input, i) => {
	input.addEventListener('input', function () {
		cardValues[i].innerText = this.value.toUpperCase()
	})
})
*/

inputs[0].addEventListener('input', function () {
	this.value = this.value.replace(/[^a-zA-Z\s]/g, '')
})

for(let i = 1; i < inputs.length; i++){
	inputs[i].addEventListener('input', function() {
		this.value = this.value.replace(/[^0-9]/g, '')
	})
}

function execute (event) {
	event.preventDefault()

	jumpInput()
	validateInput()
	submit()
	
}

function jumpInput () {
	let indexOfFocusedInput = inputs.indexOf(document.activeElement)
	
	if(indexOfFocusedInput >= 0 && indexOfFocusedInput < 4){
		inputs[indexOfFocusedInput + 1].focus()
	}
}

function validateInput () {
	// cant't be blank error

	function showCantBeBlankError (index) {
		errorMessages[index].style.visibility = 'visible'
		errorMessages[index].innerText = `Can't be blank`
	}

	function showInvalidValueError (index) {
		errorMessages[index].style.visibility = 'visible'
		erorrMessages[index].innerText = `Invalid value`
	}

	inputs.forEach((input, i) => {
		if(input.value === ''){
// As there are 4 error messages for 5 inputs, can't just throw i as the index

			if(i === 0) showCantBeBlankError(0)
			if(i === 1) showCantBeBlankError(1)
			if(i === 2) showCantBeBlankError(2)
			if(i === 3) showCantBeBlankError(2)
			if(i === 4) showCantBeBlankError(3)
			

		}
	})

	// invalid value error


}

function submit () {
	console.log('submit')
}