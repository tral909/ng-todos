import { Component, OnInit } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  // вынесено в сервис, нет взаимодействия м/у app.component и todos.component
  // @Input() todos: Todo[] = [];
  // @Output() onToggle = new EventEmitter<number>();

  private loading: boolean = true;

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.fetchTodos()
      .pipe(delay(500))
      .subscribe(() => {
        this.loading = false;
      });
  }

  onChange(id: number) {
    this.todosService.onToggle(id);
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id);
  }

}
