import { createStore , applyMiddleware } from 'redux'
import * as actions from './actionTypes'
import reducer from './reducer'

const checkDescription = (store) => (next) => (action) => {
    if(action.type === actions.ADD_BUG && action.payload.description === "") {
        return alert("Please Fill the description")
    }

    return next(action)
}

const store = createStore( reducer , applyMiddleware(checkDescription) )

export default store
