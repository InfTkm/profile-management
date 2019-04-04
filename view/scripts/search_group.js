/* a search class */ 

const log = console.log;

/* Select all DOM form input elements */ 
const input_code = document.querySelector('#inputCode');
const input_term = document.querySelector('#inputTerm');
const input_section = document.querySelector('#inputSection');
const input_name = document.querySelector('#inputName');

/* Select the button element */ 
const searchBtn = document.querySelector('#search');

function redirectToResult() {
    console.log("click");
	const code = input_code.value;
	const term = input_term.value;
    const section = input_section.value;
    const name = input_name.value;
    // pass the object to local storage
    if (code == '' || term == 'course term'|| section == '') {
        window.alert("please fill out required fields")
    } else {
        if (name == '') {
            // redirect to the search result page
            const url = '/find/result/' + code + '/' + term + '/' + section;
            window.location.href=url; 
        } else {
            // redirect to the search result page
            const url = '/find/result/' + code + '/' + term + '/' + section + '/' + name;
            window.location.href=url; 
        }
    }
}

