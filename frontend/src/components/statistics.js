import React from 'react';
import {Pie} from 'react-chartjs-2';
import config from "../config"

class Statistics extends React.Component {
  state = {
    analyzed_tasks: {}
  }

  async componentWillMount(){
 
      try {
      let url = `${config.API_STATS}/stats`;
     
      let resolve = await fetch(url)

      if (resolve.status===200) {
        let response = await resolve.json()
       
         this.setState({analyzed_tasks: response})
      }


    } catch(e) {
      console.log(e)
    }
  
    
  }

  render() {
    const {analyzed_tasks} = this.state
   
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
}



export default Statistics;