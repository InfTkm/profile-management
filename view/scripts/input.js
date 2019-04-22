const form = document.querySelector('#contact')
form.addEventListener('submit', sub)

function sub(e) {
    e.preventDefault()
    const name = document.querySelector('#name').value
    const phone = document.querySelector('#phone').value
    const sex = document.querySelector('#sex').value
    const comment = document.querySelector('#comment').value
    const age = document.querySelector('#age').value
    fetch(`/customer/${name}/${phone}/${sex}/${comment}/${age}`, {method: 'post'}).then(res => console.log(res))
    alert('添加成功')
    document.querySelector('#name').value = ''
    document.querySelector('#phone').value = ''
}