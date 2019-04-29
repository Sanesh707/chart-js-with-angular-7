import { Component, OnInit } from '@angular/core';
import { WeatherReportServiceService } from './weather-report-service.service';
import { Observable, Subscriber } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { Chart } from 'chart.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myCrudOps';
  chart : any;
  constructor(private _weatherService : WeatherReportServiceService){}

  ngOnInit(){

    var resp = this._weatherService.weatherForCast();
    console.log(resp);
    let max_temp = resp['list'].map(resp => resp.temp.max);
    let min_temp = resp['list'].map(resp => resp.temp.min);
    let allDates = resp['list'].map(resp => resp.dt);

    let weather_dates = [];

    allDates.forEach((resp) => {
      let jsDate = new Date(resp * 1000);
      weather_dates.push(jsDate.toLocaleDateString('en',{ year: 'numeric', month: 'short', day: 'numeric'}));
    })

    console.log(weather_dates);

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: weather_dates,
        datasets: [
          {
            label: 'Maximum Temperature',
            data: max_temp,
            borderColor: '#F3955F',
            backgroundColor: '#F3955F',
            borderWidth: 1
          },
          {
            label: 'Minimum Temperature',
            data: min_temp,
            borderColor: '#8DDFEC',
            backgroundColor: '#8DDFEC',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text:'Moscow weather comparison'
        },
        legend: {
          display: true
        },
        scales:{
          xAxes: [{
            display: true
          }],
          yAxes:[{
            display: true
          }]
        }
      }
    })
  }
}
