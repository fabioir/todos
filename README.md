# Todos

Simple Angular application that allows to create, read, update and delete todos.

## API

The API used as a backend is [dummyjson.com](https://dummyjson.com/docs/todos)

## Application State

NgRx is used to manage the application state. @ngrx/entity helps to reduce boilerplate code for managing a list of Todos.

## Continuous Integration

On every push, github actions executes some checks and builds the project using the dependencies indicated in the package-lock.json.

See [main.yml](.github/workflows/main.yml)
