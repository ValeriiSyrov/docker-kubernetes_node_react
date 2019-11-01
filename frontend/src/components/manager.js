import React from 'react';
import { connect } from "react-redux";
import { succeed_action, failed_action, list_action } from "../redux/actions"
import AddField from "./AddField"
import config from "../config"
import Suggester from "./suggester"

class Manager extends React.Component {
  state = {
    openSuggester: false
  }

  handleOpenSuggester=()=>{
    this.setState({openSuggester: !this.state.openSuggester})
  }

  setSuccess=(e)=>{
    this.props.succeed(e.currentTarget.dataset.id)
  }

  setFailed=(e)=>{
    this.props.failed(e.currentTarget.dataset.id)
  }

  componentDidMount(){
     this.props.getList()
  }

  render (){
   
    const {tasks}=this.props
    const {openSuggester} =this.state
  return (
    <>
       {openSuggester ? <Suggester open={this.handleOpenSuggester}/> : null}
      <AddField />
      <button className="buttonSuggest" onClick={this.handleOpenSuggester}>Suggestion</button>
      <table className="list">
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0
            ? tasks.map((todo) => {
              return (
                <tr key={todo._id}>
                  <td>{todo.task}</td>
                  <td>
                    <div className="tdIcon">
                      <span>{todo.status}</span>
                      <span>
                        <i className="far fa-sad-tear" data-id={todo._id} onClick={this.setFailed}></i>
                        <i className="far fa-laugh-wink" data-id={todo._id} onClick={this.setSuccess}></i>
                      </span>
                    </div>
                  </td>

                </tr>
              )
            })
            : "No tasks, yay!"}
        </tbody>
      </table>
    </>
  )
          }
}

const mapStateToProps = store => {
  return store
};

const mapDispatchToProps = dispatch => {
  return {
    succeed: async (_id) => {
      try {
      let url = `${config.API_MANAGER}/changestatus`;
      let data = {
       _id,
        status: "success"
      }

      let resolve = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })

      if (resolve.status===200) {
        let response = await resolve.json()
       
         return dispatch(succeed_action(response))
      }


    } catch(e) {
      console.log(e)
    }
  
    },

    failed: async (_id) => {
      try {
      let url = `${config.API_MANAGER}/changestatus`;
      let data = {
       _id,
        status: "failed"
      }

      let resolve = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })

      if (resolve.status===200) {
        let response = await resolve.json()
       
         return dispatch(failed_action(response))
      }


    } catch(e) {
      console.log(e)
    }
  
    },

    getList: async (_id) => {
      try {
      let url = `${config.API_MANAGER}/list`;
     
      let resolve = await fetch(url)

      if (resolve.status===200) {
        let response = await resolve.json()
       
         return dispatch(list_action(response))
      }


    } catch(e) {
      console.log(e)
    }
  
    }

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);

