const form = document.querySelector('#search')
form.addEventListener('submit', sub)

function sub(e) {
    e.preventDefault()
    const method = document.querySelector('#search_method').value
    const content = document.querySelector('#search_content').value
    if (method == 1) {
        window.location.href = `/customers/byVIP/${content}`
    } else if (method == 2) {
        window.location.href = `/customers/byName/${content}`
    } else {
        window.location.href = `/customers/byContact/${content}`
    }
    

}