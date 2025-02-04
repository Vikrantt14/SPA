import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  searchTerm: string = '';
  userData: any[] = [];
  filteredList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  workoutTypes: string[] = []; // List of unique workout types
  selectedWorkoutType: string = ''; // Selected workout type for filtering

  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
    this.listData();
    this.setWorkoutTypes();
  }

  listData() {
    this.userData = this.userDataService.getUserData();
    this.applyPagination();
  }

  setWorkoutTypes() {
    const types = new Set<string>();
    this.userData.forEach(user => {
      user.workouts.forEach((workout:any) => types.add(workout.type));
    });
    this.workoutTypes = Array.from(types);
  }

  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredList = this.userData.slice(startIndex, endIndex);
  }

  getWorkoutTypes(workouts: any[]): string {
    return workouts.map(workout => workout.type).join(', ');
  }

  getTotalWorkoutMinutes(workouts: any[]): number {
    return workouts.reduce((total, workout) => total + parseInt(workout.minutes), 0);
  }

  getWorkoutCount(workouts: any[]): number {
    return workouts.length;
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase().trim();
    this.searchTerm = searchTerm;
    this.currentPage = 1; 

    this.filterData();
    this.applyPagination();
  }

  onFilterChange(event: any): void {
    this.selectedWorkoutType = event.target.value;
    this.currentPage = 1; 

    this.filterData();
    this.applyPagination();
  }

  filterData() {
    const searchTerm = this.searchTerm.toLowerCase();
    const workoutType = this.selectedWorkoutType.toLowerCase();

    this.userData = this.userDataService.getUserData().filter((item: any) => {
      const workoutTypes = this.getWorkoutTypes(item.workouts).toLowerCase();
      const workoutCount = this.getWorkoutCount(item.workouts).toString().toLowerCase();
      const totalWorkoutMinutes = this.getTotalWorkoutMinutes(item.workouts).toString().toLowerCase();

      const matchesSearchTerm = (
        item.name.toLowerCase().includes(searchTerm) ||
        workoutTypes.includes(searchTerm) ||
        workoutCount.includes(searchTerm) ||
        totalWorkoutMinutes.includes(searchTerm)
      );

      const matchesWorkoutType = workoutType ? workoutTypes.includes(workoutType) : true;

      return matchesSearchTerm && matchesWorkoutType;
    });
  }

  // PAGINATION 

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyPagination();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  changeItemsPerPage(event: any) {
    this.itemsPerPage = parseInt(event.target.value);
    this.currentPage = 1;
    this.applyPagination();
  }

  get totalPages(): number {
    return Math.ceil(this.userData.length / this.itemsPerPage);
  }
}
