const form = document.querySelector('#contact')
form.addEventListener('submit', sub)

function sub(e) {
    e.preventDefault()
    const name = document.querySelector('#name').value
    const phone = document.querySelector('#phone').value
    const sex = document.querySelector('#sex').value
    const comment = document.querySelector('#comment').value
    const age = document.querySelector('#age').value
    const vip = document.querySelector('#vip').value
    console.log(`/customer/${name}/${phone}/${sex}/${comment}/${age}/${vip}`)
    const data = {name:name, phone:phone,sex:sex,comment:comment, age:age,vip:vip}
    fetch(`/customer/update`,  {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
    }).then(res => console.log(res)).catch(err => {
    console.log(err)
    })
    alert('更改成功')
    window.location.href = `/find`
}