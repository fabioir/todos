import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { fromTodoReducer } from './state';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './effects/todo.effects';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      [fromTodoReducer.todoFeatureKey]: fromTodoReducer.reducer,
    }),
    EffectsModule.forRoot([TodoEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
