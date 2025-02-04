import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { ListComponent } from '../list/list.component';
import { UserDataService } from '../service/user-data.service';
import { NgChartsModule } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, NgChartsModule, ListComponent,],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {
  userData: any[] = [];
  
  userChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 50 
      }
    }
  };
  activeUser: any;

  constructor(private route: Router, private userDataService: UserDataService) {}

  ngOnInit() {
    this.userData = this.userDataService.getUserData();
    console.log('User Data:', this.userData);
    if (this.userData.length > 0) {
      this.updateChart(this.userData[0]);
    }
  }

  updateChart(user: any) {
    this.activeUser = user; 
  
    this.userChartData = {
      labels: user.workouts.map((w: any) => w.type),
      datasets: [
        {
          label: 'Minutes',
          data: user.workouts.map((w: any) => w.minutes),
          backgroundColor: 'lightblue',
          borderWidth: 0
        }
      ]
    };
  }
}
