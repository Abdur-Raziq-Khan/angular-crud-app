import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TodoService } from '../services/todo.service';
@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  todoForm: FormGroup;
  constructor(private fb: FormBuilder,
              private todoService: TodoService) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      task: [''],
      detail: ['']
    });
  }

  onSubmit(form: FormGroup) {
    if(this.todoForm.valid) {
      this.todoService.todos(this.todoForm.value).subscribe(result => {
        console.log("Todo added successfully.");
        // this.router.navigate(["/login"]);
      });
    }
  }

}
