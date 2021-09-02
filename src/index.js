import store from './store'
import * as actionCreators from './actionCreators'

/** UI */
const bugDescription = document.getElementById("bug")
const bugAdd = document.getElementById("add-bug")

const bugId = document.getElementById("bug-id")
const bugRemove = document.getElementById("remove-bug")

const bugList = document.getElementById("bug-list")
const bugRender = () => {
    if(store.getState().length !== 0) {
        store.getState().map( bug => {
            let listItem = document.getElementById(bug.id)
            if(!listItem) {
                var li = document.createElement("li");
                var text = document.createTextNode(`Id: ${bug.id}, ` + `Descripion: ${bug.description}`);
                li.appendChild(text)
                li.id = bug.id
                bugList.appendChild(li)
            }
        })
    }
}

/** STORE SUBSCRIBE */
const unsubscribe = store.subscribe( () => {
    alert("Store Changed")
    console.log(store.getState())
    bugRender()
})

/** UI EVENTS */
bugAdd.addEventListener( "click" , () => {
    if(bugDescription.value !== "") {
        store.dispatch(actionCreators.addBug(bugDescription.value))
    } else {
        alert("Please Fill the description")
    }
})

bugRemove.addEventListener( "click" , () => {
    let id = bugId.value
    var regex=/^[0-9]+$/;
    if (id.match(regex)) {
        store.dispatch(actionCreators.removeBug(parseInt(id)))
    } else {
        alert("Bug id must be a non negative number")
    }
})