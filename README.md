import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule
  ]
})<div style="width: 400px; margin: auto;">
  <h2>Todo App</h2>

  <input [(ngModel)]="newTodo" placeholder="Enter task" />
  <button (click)="addTodo()">Add</button>

  <ul>
    <li *ngFor="let todo of todos">
      
      <input type="checkbox"
             [checked]="todo.completed"
             (change)="toggleComplete(todo)" />

      <span [style.text-decoration]="todo.completed ? 'line-through' : 'none'">
        {{ todo.title }}
      </span>

      <button (click)="deleteTodo(todo.id!)">Delete</button>
    </li>
  </ul>
</div>import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  addTodo() {
    if (!this.newTodo.trim()) return;

    const todo: Todo = {
      title: this.newTodo,
      completed: false
    };

    this.todoService.addTodo(todo).subscribe(() => {
      this.newTodo = '';
      this.loadTodos();
    });
  }

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }
}import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class AppModule { }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodoComponent {

  todos: Todo[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  addTodo() {
    if (!this.newTodo.trim()) return;

    const todo: Todo = {
      title: this.newTodo,
      completed: false
    };

    this.todoService.addTodo(todo).subscribe(() => {
      this.newTodo = '';
      this.loadTodos();
    });
  }

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }
}
