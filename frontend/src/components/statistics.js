import React from 'react';
import { connect } from "react-redux";
import {Pie} from 'react-chartjs-2';

function Statistics({ tasks }) {
  let analyzed_tasks = analyze(tasks)
   
  const data = {
    labels: Object.keys(analyzed_tasks),
    datasets: [{
      data: Object.values(analyzed_tasks),
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  };

  return (
    <div className="stat">
    <Pie data={data} />
    </div>
  )
}

function analyze(tasks) {
  let result = {
    failed: 0,
    in_progress: 0,
    success: 0
  };

  tasks.map(el => {
    switch (el.status) {
      case "failed":
        result.failed += 1
        break;
      case "in progress":
        result.in_progress += 1
        break;
      case "success":
        result.success += 1
        break;

      default:
        break;
    }
  })

  return result
}

const mapStateToProps = state => {
  return state
};

export default connect(mapStateToProps)(Statistics);