import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  date?: any;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  // public todos: Todo[] = [
  //   {id: 1, title: 'Купить хлеб', completed: false, date: new Date()},
  //   {id: 2, title: 'Купить масло', completed: true, date: new Date()},
  //   {id: 3, title: 'Купить пиво', completed: false, date: new Date()}
  // ];

  public todos: Todo[] = [];

  constructor(private http: HttpClient) { }

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .pipe(tap(todos => this.todos = todos));
  }

  onToggle(id: number) {
    const todo = this.todos.find(td => td.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }
}
