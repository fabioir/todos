import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllFoundTodos, DraftTodo, Todo } from '../models/todo.model';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<AllFoundTodos> {
    return this.http.get<AllFoundTodos>(`${environment.apiRoot}/todos`);
  }

  create(draftTodo: DraftTodo): Observable<Todo> {
    if (!draftTodo.todo) {
      throw 'Missing content';
    }

    return this.http.post<Todo>(`${environment.apiRoot}/todos/add`, draftTodo);
  }

  update(updatedTodo: Todo): Observable<Todo> {
    if (!updatedTodo.todo) {
      throw 'Missing content';
    }

    return this.http.put<Todo>(
      `${environment.apiRoot}/todos/${updatedTodo.id}`,
      { ...updatedTodo, id: undefined }
    );
  }

  delete(id: number): Observable<Todo> {
    if (isNaN(id)) {
      throw 'Invalid id';
    }

    return this.http.delete<Todo>(`${environment.apiRoot}/todos/${id}`);
  }
}
