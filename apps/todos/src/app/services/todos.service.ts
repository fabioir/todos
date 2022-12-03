import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllFoundTodos } from '../models/todo.model';

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
}
