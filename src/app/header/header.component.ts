import { Component } from '@angular/core';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username!: string;

  constructor(private usernameService: UsernameService) {}

  ngOnInit() {
    this.usernameService.getUsername().subscribe(username => {
      this.username = username;
    });
  }
}
