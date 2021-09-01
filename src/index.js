import store from './store'

const unsubscribe = store.subscribe( () => {
    console.log("Store Changed " , store.getState())
})

store.dispatch({
    type : "ADD_BUG" , 
    payload : {
        description : "bug1"
    }
})

store.dispatch({
    type : "REMOVE_BUG" , 
    payload : {
        id: 1
    }
})