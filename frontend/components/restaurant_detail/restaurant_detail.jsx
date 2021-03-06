import React from 'react';
import * as d3 from "d3";
import Chart from '../../../assets/vendors/d3act/Chart';

class RestaurantDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
          data: [
              { xValue: '1', yValue: 0 },
              { xValue: '5', yValue: 0 },
          ]
      };
  }

  componentDidMount(){
    if(Object.keys(this.props.filteredRestaurants).length){
      let data = this.getData(this.props.filteredRestaurants);
      this.setState({data});
    }
  }

  componentWillReceiveProps(newProps){
    if(Object.keys(newProps.filteredRestaurants).length){
      let data = this.getData(newProps.filteredRestaurants);
      this.setState({data});
    }
  }
  getData(filteredData){
    let aggrigate = {};
    filteredData.forEach((restaurant) =>{
      let category = restaurant.rating;
      if (aggrigate[category]){
        aggrigate[category] = aggrigate[category] + 1;
      }else {
        aggrigate[category] = 1;
      }
    });

    let data = [];
    Object.entries(aggrigate).forEach((category)=> {
      data.push({xValue: category[0], yValue: category[1] });
    });

    data.sort((a,b) => b.xValue - a.xValue);
    return data;
  }

  render(){
    return (
    <div>
      <div className='chart-container bar-chart'>
          <h2 className='chart-header'>RESTAURANT RATINGS</h2>
          <Chart
              type={"bar"}
              width={500}
              height={500}
              margin={{ top: 40, right: 40, bottom: 70, left: 70 }}
              showTooltips={true}
              ylabel={'# of Restaurants'}
              data={this.state.data}
          />
      </div>
    </div>
  );
  }
}

export default RestaurantDetail;
