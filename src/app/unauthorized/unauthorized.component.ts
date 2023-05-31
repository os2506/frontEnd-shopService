import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized-container">
      <h1>Unauthorized</h1>
      <p>You don't have permission to access this page OR Your user doesn't exist !</p>
    </div>
  `,
  styles: [
    `
    .unauthorized-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: bold;
    }

    p {
      font-size: 1.2rem;
    }
    `
  ]
})
export class UnauthorizedComponent {
  // Component code here
}