# Todos

Simple Angular application that allows to create, read, update and delete todos.

## API

The API used as a backend is [dummyjson.com](https://dummyjson.com/docs/todos)

## UI

The user interface is build using [tailwindcss.com](https://tailwindcss.com/) to provide the styles. In order to better explore this tool's possibilities, no components library is used.

## Application State

NgRx is used to manage the application state. @ngrx/entity helps to reduce boilerplate code for managing a list of Todos.

## Effects

Components are better isolated from side effects by introducing @ngrx/effects [effects](apps/todos/src/app/effects/todo.effects.ts)

## Continuous Integration

On every push, github actions executes some checks and builds the project using the dependencies indicated in the package-lock.json.

See [main.yml](.github/workflows/main.yml)
