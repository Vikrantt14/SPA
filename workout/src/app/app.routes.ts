import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ProgressComponent } from './progress/progress.component';

export const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'list', component: ListComponent },
    { path: 'progress', component:ProgressComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' } // Default rou
];
