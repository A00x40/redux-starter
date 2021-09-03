import store from './store'
import * as actionCreators from './actionCreators'

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
    //bugRender()
})

class List extends React.Component {
    
    render() {
        return (
            <ul id="bug-list">
                {
                    this.props.bugs.map( (v,k) => {
                    return(
                        <li key={k}> {v.description} </li>
                    )})
                    
                }
            </ul>
        )
    }
}
class APP extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            bugs: []
        }
    }

    bugAdd () {
        let e = document.getElementById("bug")
        this.props.store.dispatch(actionCreators.addBug(e.value))
        this.setState( () => ({
            bugs : this.props.store.getState()
        }))
        e.value = ""
    }

    bugRemove () {
        let e = document.getElementById("bug-id")
        let id = e.value
        var regex=/^[0-9]+$/;
        if (id.match(regex)) {
            this.props.store.dispatch(actionCreators.removeBug(parseInt(id)))
        } else {
            alert("Bug id must be a non negative number")
        }
        this.setState( () => ({
            bugs : this.props.store.getState()
        }))
        e.value = ""
    }

    render() {
        return (
            <div>
                <div>
                <h2>Add Bug</h2>
                <input id="bug" type="text" placeholder="description" />
                <input id="add-bug" type="button" value="ADD BUG" onClick={() => this.bugAdd()} />

                <List bugs={this.state.bugs}/>
                </div>

                <div>
                <h2>Remove Bug</h2>
                <input id="bug-id" type="text" placeholder="id" />
                <input id="remove-bug" type="button" value="REMOVE BUG" onClick={() => this.bugRemove()}  />
                </div>
            </div>
        )
    }
  }

  ReactDOM.render( 
    <APP store={store}/> ,
    document.getElementById("app")
  );