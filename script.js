const formDiv = document.querySelector('.formDiv')
const submitMessageDiv = document.querySelector('.submitMessageDiv')
const inputs = Array.from(document.querySelectorAll('form input'))
const errorMessages = document.querySelectorAll('form > div p')
const cardValues = document.querySelectorAll('.cards p') 
const defaultCardValues = ['0000 0000 0000 0000', 'LUIZ FLAVIO', '00','00','000']


// What is missing: Invalid Values verification

inputs[0].addEventListener('input', function () {
	if(this.value.length >= 19) jumpInput()

	//Replace all the not numbers, puts a space between 4 numbers and limits to 19 the max length 

	this.value = this.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19)

})

inputs[1].addEventListener('input', function () {

	this.value = this.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 26)
	
})

inputs[2].addEventListener('input', function () {

	if (this.value.length >= 2) jumpInput()
	this.value = this.value.replace(/\D/g, '').slice(0,2)
})

inputs[3].addEventListener('input', function () {

	if (this.value.length >= 2) jumpInput()
	this.value = this.value.replace(/\D/g, '').slice(0,2)
})

inputs[4].addEventListener('input', function () {

	this.value = this.value.replace(/\D/g, '').slice(0,3)
})

inputs.forEach((input, i) => {
	input.addEventListener('input', function () {
		cardValues[i].innerText = this.value.toUpperCase()

		if(errorMessages[convertInputIndex(i)].style.visibility == 'visible') noError(convertInputIndex(i))

		if(cardValues[i].innerText == ''){
			cardValues[i].innerText = defaultCardValues[i]
		}
	})
})


function execute (event) {
	event.preventDefault()
	

	
	validateInputs()

 
	if(canSubmit === true){
		submit()
		showSubmitMessage()
	}

}



let isValidInput = [[false, false], [false, false], 
	[false, false], [false, false], [false, false]]

let canSubmit = false

function validateInputs () {

	let indexOfFocusedInput = inputs.indexOf(document.activeElement)

	
	inputs.forEach((input, i) => {
		isValidInput[i][1] = isValidValue(i)
		isValidInput[i][0] = isBlankChecking(i)
	})


	canSubmit = finalCheckingResponse()


	function isBlankChecking (i) {
		if(inputs[i].value == '') {
			showCantBeBlankError(convertInputIndex(i))
			return false
		} else return true
	}

	function isValidValue (i) {

		// Fix 

		if(i === 0 && (inputs[0].value.length < 19 || inputs[0].value.length == undefined)) {
			showInvalidValueError(0)
			return false
		} else if(i === 2 && (inputs[2].value.length < 2 || inputs[2].value.length == undefined)) {
			showInvalidValueError(2)
			return false
		} else if(i === 3 && (inputs[3].value.length < 2 || inputs[3].value.length == undefined)) {
			showInvalidValueError(2)
			return false
		} else if(i === 4 && (inputs[4].value.length < 3 || inputs[4].value.length == undefined)) {
			showInvalidValueError(3)
			return false
		} else return true

	}

	function finalCheckingResponse() {
		for(let i = 0; i < isValidInput.length; i++){
			if(isValidInput[i][0] === false || isValidInput[i][1] === false) return false
		}
			
		return true
	}



}

function submit () {
	// To be continued...
	console.log('submit')
}

function showSubmitMessage() {

	submitMessageDiv.style.display = 'flex'
	formDiv.style.display = 'none'


}

function restart () {
	window.location.reload()
}


function jumpInput () {
	let indexOfFocusedInput = inputs.indexOf(document.activeElement)
	
	if(indexOfFocusedInput >= 0 && indexOfFocusedInput < 4){
		inputs[indexOfFocusedInput + 1].focus()
	}
}

function convertInputIndex (inputIndex) {
	// This function was created because there are 4 erorr messages for 5 inputs

	if(inputIndex === 0) return 0
	if(inputIndex === 1) return 1
	if(inputIndex === 2) return 2
	if(inputIndex === 3) return 2
	if(inputIndex === 4) return 3

}

function showCantBeBlankError (index) {
	canSubmit = false
	errorMessages[index].style.visibility = 'visible'
	errorMessages[index].innerText = `Can't be blank`
}

function showInvalidValueError (index) {
	canSubmit = false
	errorMessages[index].style.visibility = 'visible'
	errorMessages[index].innerText = `Invalid value`
}

function noError (index) {
	canSubmit = true
	errorMessages[index].style.visibility = 'hidden'
	errorMessages[index].innerText = '---'
}