const log = console.log

function addCourse(){
	const url = '/addCourse';
	let data = {
		course: document.querySelector('#courseCode').value
	}
	const request = new Request(url, {
		method: 'put', 
		body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    fetch(request).then(res => {
		if (res.status != 400) {
			addCourseDom(document.querySelector('#courseCode').value)
		} else {
			window.alert("You already have this course added.")
		}
		
		document.querySelector("#coursecode").value = ''
    }).catch((error) =>{console.log(error)
	})
	
}

function addSkill(){
	const url = '/addSkill';
	let data = {
		skill: document.querySelector('#newSkill').value
	}
	const request = new Request(url, {
		method: 'put', 
		body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
    fetch(request).then(res => {
		if (res.status == 400) {
			window.alert("You already have this skill.")
		} else {
			addNewSkillDom(document.querySelector('#newSkill').value)
		}
		document.querySelector("#newskill").value = ''
    }).catch((error) =>{console.log(error)
	})
	
}

function addCourseDom(course){
	const row = document.createElement('li')

	const newProject = document.createElement('span')
	newProject.classList.add('projectName')

	row.appendChild(newProject)

	newProject.appendChild(document.createTextNode(course))
	pastProjectList = document.querySelector('#pastProjectList')
	pastProjectList.querySelector('ul').appendChild(row)



}

function addNewSkillDom(newSkill){
	const chip = document.createElement('span')
	chip.classList.add('skillChip')
	chip.innerHTML = newSkill

	document.querySelector('#skillList').appendChild(chip)
}




// const addProjectForm = document.querySelector('#addProjectForm')
// const addSkillForm = document.querySelector('#addSkillForm')

// addProjectForm.addEventListener('submit', addNewProject)
// addSkillForm.addEventListener('submit', addNewSkill)

// const basicInfo = document.querySelector('#basicInfo')

// //Load user icon. Code below requires server call.
// const image = basicInfo.querySelector('.iconContainer').querySelector('img')
// image.src = 'images/pikachu1.jpg'

// //Load user score. Code below reqrires server call.
// basicInfo.querySelector('.score').innerHTML = 4.7

// //Load user name, school and status. Code below reqrires server call.
// const userInfo = document.querySelector('#userInfo')
// const table = userInfo.querySelector('ul')

// const status = document.querySelector('#status')
// const edit = status.querySelector('a')
// status.insertBefore(document.createTextNode('Looking for teammate for CSC309'), edit);

// const school = document.createElement('li')
// school.innerHTML = 'Student at UofT'
// table.insertBefore(school, status)

// const name = document.createElement('li')
// name.innerHTML = 'Jerry'
// table.insertBefore(name, school)

// // Load self introduction. Code below requires server call
// userInfo.querySelector('div').innerHTML = 'Hi, I\'m a second year computer science student.'

// // Load current projects. Code below requires server call
// addCurrentProject('CSC209', 'Helping Centers', ['Cat123', 'cat456'])

// // Add skills. Code below requires server call
// addNewSkillDom('C++')
// addNewSkillDom('Java')
// addNewSkillDom('Swift')

// // Add past projects. Code below requires server call
// addNewProjectDom('CSC207', 'TTC Simulator')
// addNewProjectDom('MAT137', 'Assignment2')

// // Add reviews. Code below requires server call
// addReview('Anomynous', 'Great!')
// addReview('Rick', 'Cool!')



// function addNewProject(e){
// 	e.preventDefault();

// 	const course = document.querySelector('#courseCode').value
// 	const project = document.querySelector('#projectName').value

// 	document.querySelector('#courseCode').value = ''
// 	document.querySelector('#projectName').value = ''

// 	addNewProjectDom(course, project)
// }

// function addNewSkill(e){
// 	e.preventDefault();

// 	const newSkill = document.querySelector('#newSkill').value

// 	document.querySelector('#newSkill').value = ''

// 	addNewSkillDom(newSkill)
// }

// /********************/
// /* DOM Manipulation */
// /********************/

// function addNewProjectDom(course, project){
// 	const combined = course + ' - ' + project

// 	const row = document.createElement('li')

// 	const newProject = document.createElement('span')
// 	newProject.classList.add('projectName')

// 	row.appendChild(newProject)

// 	newProject.appendChild(document.createTextNode(combined))
// 	pastProjectList = document.querySelector('#pastProjectList')
// 	pastProjectList.querySelector('ul').appendChild(row)

// }

// function addNewSkillDom(newSkill){
// 	const chip = document.createElement('span')
// 	chip.classList.add('skillChip')
// 	chip.innerHTML = newSkill

// 	document.querySelector('#skillList').appendChild(chip)
// }

// function addCurrentProject(courseCode, project, teammates){
// 	const currentProjectTable = document.querySelector('#workingOn').querySelector('.bulletPointContainer').querySelector('ul')

// 	const projectRow = document.createElement('li')
// 	const projectName = document.createElement('span')
// 	projectName.innerHTML = courseCode + ' - ' + project
// 	projectName.classList.add('projectName')
// 	projectRow.appendChild(projectName)

// 	teammatesString = ''
// 	for(mate in teammates){
// 		teammatesString += teammates[mate] + ' '
// 	}

// 	projectRow.appendChild(document.createTextNode(' with '+ teammatesString))

// 	const finish = document.createElement('a')
// 	finish.href = "finsh_project.html"
// 	finish.innerHTML = 'finish project'

// 	projectRow.appendChild(finish)

// 	currentProjectTable.appendChild(projectRow)
// }

// function addReview(user, review){
// 	const comments = document.querySelector('#comments').querySelector('.reviewContainer')
// 	const reviewContainer = document.createElement('div')
// 	reviewContainer.classList.add('review');
// 	reviewContainer.innerHTML = user + ': ' + review
// 	comments.appendChild(reviewContainer);
// }
