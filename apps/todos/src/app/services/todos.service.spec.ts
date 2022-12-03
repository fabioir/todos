import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { TodosService } from './todos.service';
import { fakeAllFoundTodos, fakeTodo } from './todos.service.fakes';

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

  describe('findOne', () => {
    it('should fetch and return a todo', (done) => {
      service.findOne(fakeTodo.id).subscribe((allFoundTodos) => {
        expect(allFoundTodos).toEqual(fakeTodo);
        done();
      });

      httpTestingController
        .expectOne(`${environment.apiRoot}/todos/${fakeTodo.id}`)
        .flush(fakeTodo);
    });

    it('should throw an error if an invalid id is used', () =>
      expect(() =>
        service.findOne(undefined as unknown as number).subscribe()
      ).toThrowError('Invalid id'));
  });
});
