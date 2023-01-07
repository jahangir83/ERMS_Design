/**
 * Title : Frontent functionallity
 * Description: 
 * Date: 30/10/2022
 * Author: MD Jahangir alam
 * 
 */


// Qyery fild
let mainRow = document.getElementById("mainRow")// Education main Row

//Education new Fild Generate function

function EduNewFildGenerate(){
	console.log("rdududududu")
	//College
let EducationRow = document.createElement("div")
	EducationRow.classList.add("row")
	EducationRow.classList.add("mt-2")
	EducationRow.id = "EducationFromRow"

    let organizeDiv = document.createElement("div")
        organizeDiv.classList.add("col-md-3")
    let label   = document.createElement("label")
        label.setAttribute("for", "college")
        label.innerText = "Qualification"
			organizeDiv.appendChild(label)
    let input   = document.createElement("input")
        input.type = "text"
        input.id = "college"
		input.classList.add('form-control')
		input.name = 'college'
		input.placeholder= "Qualification"
			organizeDiv.appendChild(input)
	let ErrorDiv = document.createElement("div")
		ErrorDiv.classList.add("invalid-feedback")
		ErrorDiv.id = "collegeError"
			organizeDiv.appendChild(ErrorDiv)
		EducationRow.appendChild(organizeDiv)
	

	//passing year

    let passingYearDiv = document.createElement("div")
        passingYearDiv.classList.add("col-md-3")
    let pssLabel   = document.createElement("label")
        pssLabel.setAttribute("for", "passingYear")
        pssLabel.innerText = "Passing Year"
			passingYearDiv.appendChild(pssLabel)
    let pssinput   = document.createElement("input")
        pssinput.type = "text"
        pssinput.id = "passingYear"
		pssinput.classList.add('form-control')
		pssinput.name = 'passingYear'
		pssinput.placeholder= "Passing year"
			passingYearDiv.appendChild(pssinput)
	let PssErrorDiv = document.createElement("div")
		PssErrorDiv.classList.add("invalid-feedback")
		PssErrorDiv.id = "collegeError"
			passingYearDiv.appendChild(PssErrorDiv)
		EducationRow.appendChild(passingYearDiv)

	//Board
		let boardDiv = document.createElement("div")
        boardDiv.classList.add("col-md-3")
    let boardLabel   = document.createElement("label")
        boardLabel.setAttribute("for", "Board")
        boardLabel.innerText = "Board"
			boardDiv.appendChild(boardLabel)
    let boardinput   = document.createElement("input")
        boardinput.type = "text"
        boardinput.id = "board"
		boardinput.classList.add('form-control')
		boardinput.name = 'board'
		boardinput.placeholder= "Your board"
			boardDiv.appendChild(boardinput)
	let boardErrorDiv = document.createElement("div")
		boardErrorDiv.classList.add("invalid-feedback")
		boardErrorDiv.id = "boardError"
			boardDiv.appendChild(boardErrorDiv)
		EducationRow.appendChild(boardDiv)

	//Result
	let resultDiv = document.createElement("div")
		resultDiv.classList.add("col-md-2")
	let resultLabel   = document.createElement("label")
		resultLabel.setAttribute("for", "result")
		resultLabel.innerText = "result"
			resultDiv.appendChild(resultLabel)
	let resultinput   = document.createElement("input")
		resultinput.type = "text"
		resultinput.id = "result"
		resultinput.classList.add('form-control')
		resultinput.name = 'result'
		resultinput.placeholder= "Your result"
			resultDiv.appendChild(resultinput)
	let resultErrorDiv = document.createElement("div")
		resultErrorDiv.classList.add("invalid-feedback")
		resultErrorDiv.id = "resultError"
			resultDiv.appendChild(resultErrorDiv)
		EducationRow.appendChild(resultDiv)

	//REmove
	let removeDiv = document.createElement("div")
		removeDiv.classList.add("col-md-1")
	let removeP = document.createElement("p")
		removeP.classList.add("btn")
		removeP.classList.add("btn-danger")
		removeP.style.margin = "23px 0 0 0"
		removeP.style.textAlign = "center"
		removeP.setAttribute("onclick", "removeFild(this)")
		var txt = document.createTextNode("\u00D7");
		removeP.appendChild(txt)
			removeDiv.appendChild(removeP)
		EducationRow.appendChild(removeDiv)



	mainRow.appendChild(EducationRow)
}

//Remove The education row fild
function removeFild(event){
	event.parentNode.parentNode.style.display = "none"
}