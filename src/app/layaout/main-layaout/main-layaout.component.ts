import { Component } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layaout',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './main-layaout.component.html',
  styleUrl: './main-layaout.component.scss'
})
export class MainLayaoutComponent {

}
