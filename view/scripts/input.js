const form = document.querySelector('#contact')
form.addEventListener('submit', sub)

function sub(e) {
    e.preventDefault()
    const name = document.querySelector('#name').value
    const phone = document.querySelector('#phone').value
    fetch(`/customer/${name}/${phone}`, {method: 'post'}).then(res => console.log(res))
    alert('添加成功')
    document.querySelector('#name').value = ''
    document.querySelector('#phone').value = ''
}