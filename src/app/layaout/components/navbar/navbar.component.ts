import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private readonly _authService: AuthService = inject(AuthService);
  @Input() toggleSidebar!: () => void;

  public fullname: string;

  constructor(){
    this.fullname = ""
  }

  ngOnInit(): void {
    this.fullname = this._authService.fullName ?? "Sin nonbre"
  }

  public getUserInitial(): string {
    return this.fullname[0];
  }
}
