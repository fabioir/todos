import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { TodoEffects } from './effects/todo.effects';
import { fromTodoReducer } from './state';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, ListComponent, ItemComponent],
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
