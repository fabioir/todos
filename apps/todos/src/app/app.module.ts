import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { FormFieldsComponent } from './components/form-fields/form-fields.component';
import { FormComponent } from './components/form/form.component';
import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TodoEffects } from './effects/todo.effects';
import { fromTodoReducer } from './state';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ListComponent,
    ItemComponent,
    FormComponent,
    ButtonComponent,
    FormFieldsComponent,
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
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
