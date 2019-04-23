const form = document.querySelector('#contact')
form.addEventListener('submit', sub)

function sub(e) {
    e.preventDefault()
    const name = document.querySelector('#name').value
    if (!isNaN(name[0])) {
        alert('姓名不能以数字开头')
        return
    }
    const phone = document.querySelector('#phone').value
    const sex = document.querySelector('#sex').value
    const comment = document.querySelector('#comment').value
    const age = document.querySelector('#age').value
    const vip = document.querySelector('#vip').value
    fetch(`/customer/${name}/${phone}/${sex}/${comment}/${age}/${vip}`, {method: 'post'}).then(res => console.log(res))
    alert('添加成功')
    document.querySelector('#name').value = ''
    document.querySelector('#phone').value = ''
    document.querySelector('#sex').value = ''
    document.querySelector('#age').value = ''
    document.querySelector('#comment').value = ''
    document.querySelector('#vip').value = ''
}