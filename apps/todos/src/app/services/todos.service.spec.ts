import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { TodosService } from './todos.service';
import { fakeAllFoundTodos } from './todos.service.fakes';

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
});
