const log = console.log

function change_info(){
	const new_name = document.querySelector('#new_name').value
	const new_psd = document.querySelector('#new_password')
	const new_intro = document.querySelector('#new_intro').value
	const new_icon = document.querySelector('#new_icon').value

	const url = '/change_info';
	let data = {
		new_name: new_name, 
		new_intro: new_intro,
		new_icon: new_icon
	}
	const request = new Request(url, {
		method: 'put', 
		body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    fetch(request).then((res) =>{
		window.location.href = '/dashboard'
	}).catch((error) =>{ 
		console.log(error);
	})
}








// // Set the user name. Code below requires server call.
// const userName = document.querySelector('#name')
// userName.value = 'Jerry'

// // Set the school. Code below requires server call.
// const school = document.querySelector('#school')
// school.value = 'UofT'

// accountSettingForm = document.querySelector('#accountSettingForm')

// accountSettingForm.addEventListener('submit', setAccount)

// // Update the password of this user.
// function setAccount(e){
// 	e.preventDefault();
// 	// Preliminary validation
// 	const pwd1 = document.querySelector('#pwd1').value
// 	const pwd2 = document.querySelector('#pwd2').value
// 	if (pwd1 !== pwd2){
// 		alert('The passwords don\'t match. Please try again!')
// 	}

// 	// Update the database
// }