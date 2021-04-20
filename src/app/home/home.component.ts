import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { Todo } from '../models/Todo';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  todoo: Todo[];
  todos: any;
  todo: any;

  jsonDataArr: any;

  tod = new Array<Todo>();
  users: Array<Object> = [];

  constructor(private todoService: TodoService,
              private router: Router) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
      // this.todo = JSON.stringify(data);
      // console.log("todo is: " + JSON.stringify(this.todos));
      console.log(data);
    });
  }

  editTodo(todoId: string) {
    this.router.navigate([`/edit/${todoId}`]);
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      console.log("deleted");
      this.getTodos();
    });
  }

}
