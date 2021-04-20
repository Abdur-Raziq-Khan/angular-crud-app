import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})

export class EditTodoComponent implements OnInit {
  todoUpdateForm: FormGroup;
  id: string;
  // id: Number;
  todos: any = {};
  data: any = {};
  
  constructor(private fb: FormBuilder,
              private todoService: TodoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.todoUpdateForm = this.fb.group({
      task: [''],
      detail: ['']
    });

    // this.route.paramMap
    this.route.params.subscribe(params => {
      this.id = params.id;
      // this.id = +params['id'];
      // this.id = params.get('id');
      this.todoService.getTodoById(this.id).subscribe(res => {
        console.log(res);
debugger
        this.todos = res.data;
        this.todoUpdateForm.get('task').setValue(this.todos.task);
        this.todoUpdateForm.get('detail').setValue(this.todos.detail);
      });
    })
  }

  onSubmit(form: FormGroup) {
    if(this.todoUpdateForm.valid) {
      this.todoService.updateTodo(this.id, this.todoUpdateForm.value).subscribe(result => {
        console.log("Todo updated successfully.");
         this.router.navigate(["home"]);
      });
    }
  }

}

