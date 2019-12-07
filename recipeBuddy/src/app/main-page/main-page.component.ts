import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  addPage() {
    //Code here to move to add page
  }
  submitSearch() {
    //Code here to submit search
  }
  shoppingCart() {
    //Code here to move to shopping cart
  }
}
