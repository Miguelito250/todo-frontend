import { Component, Input, WritableSignal } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  @Input() toggleSidebar!: () => void;

  public getUserInitials(): string {
    return "JD"
  }
}
