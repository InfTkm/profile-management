const form = document.querySelector('#search')
form.addEventListener('submit', sub)

function sub(e) {
    e.preventDefault()
    const content = document.querySelector('#search_content').value
    console.log(content)
    window.location.href = `/customers/byContact/${content}`

}