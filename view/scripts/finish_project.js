const log = console.log
/* Select all DOM form elements*/ 
const min_rating_display_label = document.getElementsByClassName('min_rating_v')
const min_rating_input = document.getElementsByClassName('min_rating_input')

/* Event listeners for rating input and change the score display for the teammates*/
for (let i = 0; i < min_rating_display_label.length; i ++) {
  min_rating_input[i].addEventListener('input', 
  function (e) {
    e.preventDefault();
    min_rating_display_label[i].firstChild.replaceWith(
      document.createTextNode(e.target.value)
    );
    // need to save the rating e.target.value into database
  });
}

// need to load teammates information from database and then add the corresponding project teammates to 
// the page. (phase2)

// select all information needed 
const emails = document.getElementsByClassName('grey');
const contents = document.getElementsByClassName('message');
const flags = document.getElementsByClassName('check');

// need to get the project id from previous page 
function save_comment(e){
  e.preventDefault()
   //retrieve the project id from the local storage
  const project_id = localStorage['project_id'];
  // // remove the item from local storage
  localStorage.removeItem( 'project_id' );
  log(project_id)

  const url = '/finish_project/' + project_id; 
  // const url = '/finish_project/:id';

  for (let i = 0; i < emails.length; i ++) {
    log("===========loop=============")
    console.log("ratings")
    console.log(min_rating_input[i].value)

    console.log("emails")
    console.log(emails[i].innerHTML)

    console.log("contents")
    console.log(contents[i].value)

    console.log("flags")
    console.log(flags[i].value)

    let cur_flag = 0;
    if (flags[i].value != undefined) {
      cur_flag = 1;
    }

    let data = {
      receiver_email: emails[i].innerHTML,
      content: contents[i].value,
      rating: min_rating_input[i].value,
      flag: cur_flag
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
      // redirect to project page
      // window.alert("you have finished a project")
      // window.location.href = '/projects'
    }).catch((error) =>{ 
      console.log(error);
    })
  }
  const temp = window.alert("Congradulations on your finished project!")
  if (temp || !temp) {
    location.href = '/projects';
  }
  // window.alert("you have finished a project")
  
    
}
