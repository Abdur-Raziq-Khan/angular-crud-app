import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Todo } from '../models/Todo';

import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  constructor(private http: HttpClient,
    private router: Router) { }

  todos(data):Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json", 
      "Accept": "application/json",
      // 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    });
    return this.http.post(`${baseUrl}todo`, data, { headers: headers });
    // .pipe(carchError(this.handleError));
  }

  updateTodo(todoId: string, data):Observable<any> {
debugger
    let headers = new HttpHeaders({
      "Content-Type": "application/json", 
      // "Accept": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT'
    });
    return this.http.put(`${baseUrl}todo/${todoId}`, data, { headers: headers });
  }

  getTodos() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json", 
      "Accept": "application/json",
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'POST'
    });
    return this.http.get(`${baseUrl}todos`);
  }

  getTodoById(todoId: string) {
    return this.http.get(`${baseUrl}todo/${todoId}`);
  }

  deleteTodo(todoId: string) {
    return this.http.delete(`${baseUrl}todo/${todoId}`);
  }

  getJsonData() {
    // let headers = new HttpHeaders({
    //   "Content-Type": "application/json", 
    //   "Accept": "application/json",
    //   'Access-Control-Allow-Origin': '*',
    // });
    return this.http.get('http://jsonplaceholder.typicode.com/posts');
  }

}
