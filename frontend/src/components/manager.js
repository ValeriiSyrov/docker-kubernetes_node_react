import React from 'react';
import { connect } from "react-redux";
import { succeed_action } from "../redux/actions"
import AddField from "./AddField"

function Manager({ tasks, succeed }) {
  return (
    <>
      <AddField />
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
                        <i className="far fa-sad-tear" ></i>
                        <i className="far fa-laugh-wink" data-id={todo._id} onClick={(e) => succeed(e.currentTarget.dataset.id)}></i>
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
  );
}

const mapStateToProps = state => {
  return state
};

const mapDispatchToProps = dispatch => {
  return {
    succeed: (id) => {
      dispatch(succeed_action(id))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);

