import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DraftTodo, Todo } from '../models/todo.model';
import { fakeAllFoundTodosFactory, fakeTodoFactory } from '../utils/todo.fakes';
import { TodosService } from './todos.service';

const fakeTodo = fakeTodoFactory();
const fakeAllFoundTodos = fakeAllFoundTodosFactory([fakeTodo]);

describe('TodosService', () => {
  let service: TodosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(TodosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findAll', () => {
    it('should fetch and return a list of all todos', (done) => {
      service.findAll().subscribe((allFoundTodos) => {
        expect(allFoundTodos).toEqual(fakeAllFoundTodos);
        done();
      });

      httpTestingController
        .expectOne(`${environment.apiRoot}/todos`)
        .flush(fakeAllFoundTodos);
    });
  });

  describe('create', () => {
    it('should create and return a todo', (done) => {
      const draftTodo: DraftTodo = {
        completed: false,
        todo: 'Send party invitations',
        userId: 4321,
      };
      const id = 1235;

      service.create(draftTodo).subscribe((createdTodo) => {
        expect(createdTodo).toEqual({ ...draftTodo, id });
        done();
      });

      httpTestingController
        .expectOne(`${environment.apiRoot}/todos/add`)
        .flush({ ...draftTodo, id });
    });

    it('should throw an error if todo content is missing', () =>
      expect(() =>
        service.create({ todo: '', completed: false, userId: 4321 }).subscribe()
      ).toThrowError('Missing content'));
  });

  describe('update', () => {
    it('should update and return a todo', (done) => {
      const updatedTodo: Todo = {
        ...fakeTodo,
        todo: 'Feed the fish',
      };

      service.update(updatedTodo).subscribe((createdTodo) => {
        expect(createdTodo).toEqual(updatedTodo);
        done();
      });

      httpTestingController
        .expectOne(`${environment.apiRoot}/todos/${updatedTodo.id}`)
        .flush(updatedTodo);
    });

    it('should throw an error if todo content is missing', () =>
      expect(() =>
        service.update({ ...fakeTodo, todo: '' }).subscribe()
      ).toThrowError('Missing content'));

    it('should remove the id from the body', (done) => {
      const updatedTodo: Todo = {
        ...fakeTodo,
        todo: 'Feed the fish',
      };

      service.update(updatedTodo).subscribe((createdTodo) => {
        expect(createdTodo).toEqual(updatedTodo);
        done();
      });

      httpTestingController
        .expectOne((req: HttpRequest<Todo>) => req.body?.id === undefined)
        .flush(updatedTodo);
    });
  });

  describe('delete', () => {
    it('should delete and return a todo', (done) => {
      const deletionData = {
        isDeleted: true,
        deletedOn: '2022-12-03T16:49:51.688Z',
      };

      service.delete(fakeTodo.id).subscribe((deletedTodo) => {
        expect(deletedTodo).toEqual({ ...fakeTodo, ...deletionData });
        done();
      });

      httpTestingController
        .expectOne(`${environment.apiRoot}/todos/${fakeTodo.id}`)
        .flush({ ...fakeTodo, ...deletionData });
    });

    it('should throw an error if an invalid id is used', () =>
      expect(() =>
        service.delete(undefined as unknown as number).subscribe()
      ).toThrowError('Invalid id'));
  });
});
