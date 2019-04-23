// Get form
const form = document.querySelector("#login");

// Add event listener: when enter is pressed, try to login.
form.addEventListener('onclick', login);
function handle(e) {
    if(e.keyCode === 13){
        e.preventDefault(); 
        login();
    }
}

// When login, check the credentials, load corresponding html.
function login() {
    const email = document.getElementById('email').value;
    const psw = document.getElementById('password').value;
    if (email == '' || psw == '') {
        window.alert("请输入信息")
        return;
    }
    const data = {email: email, password: psw}
    console.log(data)

    fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
    }).then(res => {
        if (res.status == 404) {
            window.alert("用户名或密码不正确")
        } else {
            location.href = res.url;
        }
    })
    
}