import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-category-master",
  templateUrl: "./category-master.component.html",
  styleUrls: ["./category-master.component.css"]
})
export class CategoryMasterComponent implements OnInit {
  categories: any = [];
  categoryForm: FormGroup;
  isEditMode: boolean = false;
  currentCategoryId: number;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: ["", Validators.required]
    });

    this.getCategories();
  }

  getCategories() {
    this.http.get("/categories").subscribe((response: any) => {
      this.categories = response;
    });
  }

  saveCategory() {
    if (this.isEditMode) {
      this.http
        .put(`/categories/${this.currentCategoryId}`, this.categoryForm.value)
        .subscribe((response: any) => {
          this.categories = this.categories.map((category: any) => {
            if (category.id === this.currentCategoryId) {
              return response;
            }
            return category;
          });
          this.cancelEdit();
        });
    } else {
      this.http
        .post("/categories", this.categoryForm.value)
        .subscribe((response: any) => {
          this.categories.push(response);
          this.categoryForm.reset();
        });
    }
  }

  editCategory(category: any) {
    this.isEditMode = true;
    this.currentCategoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name
    });
  }

  deleteCategory(category: any) {
    if ("Are you sure you want to delete this category?") {
      this.http.delete(`/categories/${category.id}`).subscribe(() => {
        this.categories = this.categories.filter(
          (c: any) => c.id !== category.id
        );
      });
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.currentCategoryId = null;
    this.categoryForm.reset();
  }
}
