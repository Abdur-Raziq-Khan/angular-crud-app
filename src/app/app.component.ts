import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { Router } from '@angular/router';
import { Todo } from './models/Todo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  todoForm: FormGroup;

  todoo: Todo[];
  todos: any;
  todo: any;

  jsonDataArr: any;

  tod = new Array<Todo>();
  users: Array<Object> = [];

  constructor(private fb: FormBuilder,
              private todoService: TodoService,
              private router: Router) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      task: [''],
      status: [''],
      createdAt: ['']
    });

    // this.todoService.getTodos().subscribe(data => {
    //   todos = data;
    //   console.log(data);
    // });

      // this.todo =  this.todoService.getTodos();
      this.getTodos();
      this.getJsonData();
  }

  onSubmit(form: FormGroup) {
    if(this.todoForm.valid) {
      this.todoService.todos(this.todoForm.value).subscribe(result => {
        console.log("Todo added successfully.");
        // this.router.navigate(["/login"]);
      });
    }
  }

  getTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
      // this.todo = JSON.stringify(data);
      // console.log("todo is: " + JSON.stringify(this.todos));
      console.log(data);
    });
  }

  getJsonData() {
    this.todoService.getJsonData().subscribe(response => {
      this.jsonDataArr = response;
      // console.log(response);
    });
  }

}