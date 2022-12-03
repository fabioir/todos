import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllFoundTodos } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor() {}

  findAll(): Observable<AllFoundTodos[]> {
    throw 'Not implemented';
  }
}
