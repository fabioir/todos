import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TodoEffects } from './effects/todo.effects';
import { fromTodoReducer } from './state';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ListComponent,
    ItemComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      [fromTodoReducer.todoFeatureKey]: fromTodoReducer.reducer,
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([TodoEffects]),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
