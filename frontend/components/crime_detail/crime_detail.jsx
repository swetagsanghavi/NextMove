import React from 'react';
import * as d3 from "d3";
import Chart from '../../../assets/vendors/d3act/Chart';

class CrimeDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
          data: [
              { xValue: "Assult", yValue: 200 },
              { xValue: "Robbery", yValue: 15 },
              { xValue: "talking", yValue: 400},
              { xValue: "sleep", yValue: 100 },
              { xValue: "love", yValue: 250 },
          ]
      };
  }


  componentDidMount(){
    if(Object.keys(this.props.filteredCrimes).length){
      let data = this.getData(this.props.filteredCrimes)
      this.setState({data});
    }
  }


  componentWillReceiveProps(newProps){
    if(Object.keys(newProps.filteredCrimes).length){
      let data = this.getData(newProps.filteredCrimes)
      this.setState({data});
    }
  }

  getData(filteredData){
    let aggrigate = {}
    filteredData.forEach((crime) =>{
      let category = this.formatCategoryname(crime.category)
      if (aggrigate[category]){
        aggrigate[category] = aggrigate[category] + 1
      }else {
        aggrigate[category] = 1
      }
    })

    let data = [];
    Object.entries(aggrigate).forEach((category)=> {
      data.push({xValue: category[0], yValue: category[1] })
    })

    data.sort((a,b) => b.yValue - a.yValue);
    return data;
  }

formatCategoryname(categoryName){
  let string = categoryName.toLowerCase();

  switch (string) {
    case 'driving under the influence':
      string = 'dui'
      break;
    case 'sex offenses, forcible':
      string = 'sextual assualt'
      break;
    default:
  }
  return string.charAt(0).toUpperCase() + string.slice(1);

}


  render(){
    return (
      <div className='BarChart'>
          <h2>Crime Chart</h2>
          <Chart
              type={"bar"}
              width={1100}
              height={500}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              showTooltips={true}
              data={this.state.data}
          />
      </div>
  );
  }
}

export default CrimeDetail;