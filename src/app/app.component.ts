import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="container">
      <app-category></app-category>
      <app-product></app-product>
    </div>
  `
})
export class AppComponent {}
