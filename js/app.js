console.log('hello')
showNotes()

var addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    var addText = document.getElementById('addText')
    var addTitle = document.getElementById('addTitle')
    var notes = localStorage.getItem('notes')
    if (notes == null) {
        noteObj = []
    }
    else {
        // to get all the notes from the local storage
        noteObj = JSON.parse(notes)
    }
    // to push new note to the local storage
    var date = new Date()
    var dateString = date.toString().slice(4,15)
    console.log(dateString)
    var newObj = {
        title: addTitle.value,
        text: addText.value,
        createdDate : dateString
    }
    noteObj.push(newObj)
    console.log(noteObj)
    localStorage.setItem("notes", JSON.stringify(noteObj))
    addText.value = ''
    addTitle = ''
    showNotes()
    console.log(noteObj)
})
function showNotes() {
    var notes = localStorage.getItem('notes')
    if (notes == null) {
        noteObj = []
    }
    else {
        noteObj = JSON.parse(notes)
    }
    var html = ''
    noteObj.forEach(function (element, index) {
        html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <p>Created At: ${element.createdDate}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
        </div>
    </div>`
    });
    var noteCard = document.getElementById('notes')
    if (noteObj.length != 0) {
        noteCard.innerHTML = html
    }
    else {
        noteCard.innerHTML = `Nothing to show`
    }
}
function deleteNote(index) {
    var notes = localStorage.getItem("notes")
    if (notes == null) {
        noteObj = []
    }
    else {
        noteObj = JSON.parse(notes)
    }
    noteObj.splice(index, 1)
    notes = localStorage.setItem("notes", JSON.stringify(noteObj))
    showNotes()
}

var search = document.getElementById('searchTxt')
search.addEventListener('input', function () {
    var inputTxt = search.value
    var noteCard = document.getElementsByClassName("noteCard")
    Array.from(noteCard).forEach(function (element) {
        var cardTxt = element.getElementsByTagName('p')[0].innerText
        if (cardTxt.includes(inputTxt)) {
            element.style.display = "block"
        }
        else {
            element.style.display = "none"
        }
    })
})
