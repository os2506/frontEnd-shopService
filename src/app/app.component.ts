import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  selectedCategory!: string;
  showDashboard: boolean = false;
  
  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }

  onAdminMenuClicked() {
    this.showDashboard = true;
  }
}
