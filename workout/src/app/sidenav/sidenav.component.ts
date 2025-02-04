import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {


  constructor(private route:Router){}

  home(){
    this.route.navigateByUrl("/home")
  }
  list(){
    this.route.navigateByUrl("/list")
  }
  progress(){
    this.route.navigateByUrl("/progress")
  }
}
