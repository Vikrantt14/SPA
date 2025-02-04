import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData: any;

  constructor() {}

  getUserData() {
    return [
      {
        name: 'John',
        workouts: [
          { type: 'Cycling', minutes: '60' },
          { type: 'Running', minutes: '30' },
          { type: 'Swimming', minutes: '50' },
        ]
      },
      {
        name: 'Steve',
        workouts: [
          { type: 'Running', minutes: '80' },
        ]
      },
      {
        name: 'Parkor',
        workouts: [
          { type: 'Swimming', minutes: '60' },
          { type: 'Yoga', minutes: '55' },
        ]
      },
      {
        name: 'Otis',
        workouts: [
          { type: 'Gymnastics', minutes: '40' },
          { type: 'Swimming', minutes: '30' },
        ]
      },
      {
        name: 'Mia',
        workouts: [
          { type: 'Yoga', minutes: '45' },
          { type: 'Pilates', minutes: '60' },
        ]
      },
      {
        name: 'David', 
        workouts: [
          { type: 'Weightlifting', minutes: '75' },
          { type: 'Cycling', minutes: '40' },
        ]
      },
        {
        name: 'Sophia', 
        workouts: [
          { type: 'Running', minutes: '90' },
          { type: 'Swimming', minutes: '45' },
        ]
      },
      {
        name: 'Ethan',
        workouts: [
          { type: 'Basketball', minutes: '30' },
          { type: 'Yoga', minutes: '60' },
          { type: 'Weightlifting', minutes: '60' },
        ]
      },
      {
        name: 'Ava', 
        workouts: [
          { type: 'Yoga', minutes: '60' },
        ]
      },
    ];
  }

  allWorkouts: string[] = [];

  ngOnInit(): void {
    // Extract all workout types from userData and flatten the array
    this.allWorkouts = this.userData
      .map((user: { workouts: any; }) => user.workouts)
      .flat()
      .map((workout: { type: any; }) => workout.type);
  }
}
