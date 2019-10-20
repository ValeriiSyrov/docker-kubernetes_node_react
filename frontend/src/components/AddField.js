import React from "react";
import { connect } from "react-redux";
import { add } from "../redux/actions";
import config from "../config"

class AddField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleAddTodo = () => {
    this.props.addItem(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <div className="Add">
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="add-todo" onClick={this.handleAddTodo}>
          Add Todo
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: async (content) => {
      try {
      let url = `${config.API}/add`;
      let data = {
        task: content,
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
  
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(AddField);