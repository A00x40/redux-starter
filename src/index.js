import store from './store'
import * as actionCreators from './actionCreators'

const unsubscribe = store.subscribe( () => {
    console.log("Store Changed " , store.getState())
})

store.dispatch( actionCreators.addBug("Bug1") )

store.dispatch( actionCreators.removeBug(1) )