import React from'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';

let jsonData = require('./data.json');

class Charts extends React.Component{
    constructor(props){
        super(props);
        this.state={
            series:[{
              data:[{}]
            }],
            options: {
              tooltip: {
                  x: {
                      show: true,
                      format: 'dd MMM',
                      formatter: function (value) {
                          return value;
                      }
                  }
              },
              xaxis: {
                  type: "category",
                  labels: {
                      formatter: function (value) {
                        return dayjs(value).format('MMM DD HH:mm')
                      }
                  }
              },
              yaxis: {
                  tooltip: {
                      enabled: true
                  }
              }
          },
            countDate:1
        };
        
    }
    setData7DAYS=()=>{
      var tempData=[];
      this.setState({
        series:[{
          data:[{}]
        }],
        countDate:1
      })
      for(let i=1;i<jsonData.length;i++){
        //เปลี่ยนเวลา
        let curDate = jsonData[i].date;
        curDate = curDate.split(".");
        let curHour = jsonData[i].hr;
        curHour = curHour.split(":");
        let newDate = new Date(curDate[0],curDate[1]-1,curDate[2],curHour[0]-1);
        console.log(newDate)
        let Object={
          x:newDate,
          y:[jsonData[i].open,jsonData[i].high,jsonData[i].low,jsonData[i].close]
        }
        tempData.push(Object);
        //เช็ควันที่
        let curString = jsonData[i].date;
        let nxtString = jsonData[i+1].date;
        if(curString.localeCompare(nxtString)!=0){
          this.state.countDate+=1;
        }
        if(this.state.countDate==7){
          break;
        }
      }
      this.setState({
        series:[{data:tempData}]
      })
    }
    setData14DAYS=()=>{
      var tempData=[];
      this.setState({
        series:[{data:[{}]}],
        countDate:1
      })
      for(let i=1;i<jsonData.length;i++){
        let curDate = jsonData[i].date;
        curDate = curDate.split(".");
        let curHour = jsonData[i].hr;
        curHour = curHour.split(":");
        let newDate = new Date(curDate[0],curDate[1]-1,curDate[2],curHour[0]-1);
        let Object={
          x:newDate,
          y:[jsonData[i].open,jsonData[i].high,jsonData[i].low,jsonData[i].close]
        }
        tempData.push(Object);
        let curString = jsonData[i].date;
        let nxtString = jsonData[i+1].date;
        if(curString.localeCompare(nxtString)!=0){
          this.state.countDate+=1;
        }
        if(this.state.countDate==14){
          break;
        }
      }
      this.setState({
        series:[{data:tempData}]
      })
    }
    setData30DAYS=()=>{
      var tempData=[];
      this.setState({
        series:[{data:[{}]}],
        countDate:1
      })
      for(let i=1;i<jsonData.length;i++){
        let curDate = jsonData[i].date;
        curDate = curDate.split(".");
        let curHour = jsonData[i].hr;
        curHour = curHour.split(":");
        let newDate = new Date(curDate[0],curDate[1]-1,curDate[2],curHour[0]-1);
        let Object={
          x:newDate,
          y:[jsonData[i].open,jsonData[i].high,jsonData[i].low,jsonData[i].close]
        }
        tempData.push(Object);
        let curString = jsonData[i].date;
        let nxtString = jsonData[i+1].date;
        if(curString.localeCompare(nxtString)!=0){
          this.state.countDate+=1;
        }
        if(this.state.countDate==30){
          break;
        }
      }
      this.setState({
        series:[{data:tempData}]
      })
    }
    componentWillMount(){
      this.setData30DAYS()
    }
    render(){
        return(
            <div>
                <button onClick={this.setData7DAYS}>7DAY</button><button onClick={this.setData14DAYS}>14D</button><button onClick={this.setData30DAYS}>30D</button>
                <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={500}/><br />
          </div>  
        )
    }
}
export default Charts;