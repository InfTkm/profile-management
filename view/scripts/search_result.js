const viewBtn = document.getElementsByClassName('viewBtn')

const requestBtn = document.getElementsByClassName("requestBtn");
// const searchTitle = document.getElementsByClassName("searchTitle");
const searchTitle = document.querySelector('#searchTitle');

// console.log(searchTitle.innerHTML);
// const term = localStorage['term'];
// console.log(term);
// // localStorage.removeItem( 'term' ); // Clear the localStorage

// const section = localStorage['section'];
// console.log(section);
// // localStorage.removeItem( 'section' ); // Clear the localStorage

// const name = localStorage['name'];
// console.log(name);
// // localStorage.removeItem( 'name' ); // Clear the localStorage

// const stringFormat = "Search result for " + "\"" + code + "\"" + " " + "\"" + term + "\"" + " " + "\"" + section + "\"" + " " + "\"" + name + "\""; 
// searchTitle.innerHTML = stringFormat;

// button text change onclick


// get member information from the database and then display after clicking the button
// function redirectProfile(email) {
//     window.location.href = '/find/result/profile/' + email;
// }
for(let i = 0; i < viewBtn.length; i++) {
    viewBtn[i].onclick= function() {
        console.log(viewBtn[i].innerHTML)
        if (viewBtn[i].classList.contains("unclicked")) {
            viewBtn[i].innerHTML= "Hide Info";
            viewBtn[i].classList.remove("unclicked");
            viewBtn[i].classList.add("clicked");
        }
        else if (viewBtn[i].classList.contains("clicked")) {
            viewBtn[i].innerHTML= "View Teammates";
            viewBtn[i].classList.remove("clicked");
            viewBtn[i].classList.add("unclicked");
        }
    };
}

// for (let i = 0; i < requestBtn.length; i++) {
//     requestBtn[i].onclick= function() {
//         console.log(requestBtn[i].innerHTML)
//         if (requestBtn[i].classList.contains("unclicked")) {
//             requestBtn[i].innerHTML= "<img class='greenIcon' src='/images/check_green.png'><span class='green'>Request Sent</span>";
//             requestBtn[i].classList.remove("unclicked");
//         }
//     };
// }


function sendInvitation(e, id) {
    console.log(e.innerHTML)
    const project_id = id.slice(1, id.len)

    if (!e.classList.contains("sent")) {
        saveApplication(e, project_id);
    }

}


function saveApplication(e, project_id) {
    // find teammates
    // Project.findById(req.session.user_id).then((project) => {
    //     if (!project) {
    //         res.status(404).send();
    //     }
    //     else {
            const url = '/find/result/:code/:term/:section/:name';
            // The data we are going to send in our request
            let data = {
                project_id: project_id,
            }
            console.log(data)
            // Create our request constructor with all the parameters we need
            const request = new Request(url, {
                method: 'put', 
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
            fetch(request).then(function(res) {
                console.log("fetch request")
                // Handle response we get from the API
                // Usually check the error codes to see what happened
                if (res.status === 200) {
                    console.log("success")
                    // change the display
                    if (e.classList.contains("unclicked")) {
                        e.innerHTML= "<img class='greenIcon' src='/images/check_green.png'><span class='green'>Request Sent</span>";
                        e.classList.remove("unclicked");
                    }
                    e.classList.add("sent");

                    window.alert('Success: sent an invitation')
                   
                } else if (res.status === 406) {
                    window.alert('You are already in this group!')
                } else {
                    console.log("fail")
                    window.alert('Could not send invitation')
                }
                console.log(res);
                
            }).catch((error) => {
                console.log(error)
            })

}




// Clear the localStorage

// localStorage.removeItem( 'code' );
// localStorage.removeItem( 'term' );
// localStorage.removeItem( 'section' ); 
// localStorage.removeItem( 'name' ); 