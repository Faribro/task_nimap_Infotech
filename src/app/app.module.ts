import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { CategoryComponent } from "./category-master.component";
import { ProductComponent } from "./product-master.component";

@NgModule({
  declarations: [AppComponent, CategoryComponent, ProductComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
