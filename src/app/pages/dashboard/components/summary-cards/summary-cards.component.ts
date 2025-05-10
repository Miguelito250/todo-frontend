import { Component, Input } from '@angular/core';
import { Dashboard } from '@models/dashboard.model';

@Component({
  selector: 'app-summary-cards',
  imports: [],
  templateUrl: './summary-cards.component.html',
  styleUrl: './summary-cards.component.scss',
})
export class SummaryCardsComponent {
  @Input() summary: Dashboard;
  public colors: string[];

  constructor() {
    this.colors = ['red', 'yellow', 'green'];
    this.summary = {
      completedTasks: 0,
      inProgressTasks: 0,
      totalTasks: 0,
      pendingTasks: 0,
    };
  }
}
