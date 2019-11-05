import React from "react";
import { connect } from "react-redux";
import { add } from "../redux/actions";
import config from "../config"

class Suggester extends React.Component {

    state = {
        tasks: []
      }
    
      async componentWillMount(){
     
          try {
          let url = `${config.API}/suggest`;
         
          let resolve = await fetch(url)
    
          if (resolve.status===200) {
            let response = await resolve.json()
           
             this.setState({tasks: response})
          }
    
    
        } catch(e) {
          console.log(e)
        }
      
        
      }

  handleChangeStatus = (e) => {
    this.props.changeStatus(e.currentTarget.dataset.id);
    this.props.open()
  };

  render() {
      const {tasks} = this.state
    return (
        <div className="Cover" onClick={this.props.open}>
      <div className="Suggester">
              <span>
                  <span>Task</span>
                  <span>Status</span>
              </span>
          {tasks.map(el=>{
              return (
              <div data-id={el._id} onClick={this.handleChangeStatus}>
                  <span>{el.task}</span>
                  <span>{el.status}</span>
              </div>
              )
          })}
        
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeStatus: async (_id) => {
        try {
        let url = `${config.API}/changestatus`;
        let data = {
         _id,
          status: "in progress"
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
         
           return dispatch(add(response))
        }
  
  
      } catch(e) {
        console.log(e)
      }
    
      },
  }
};

export default connect(
  null,
  mapDispatchToProps
)(Suggester);