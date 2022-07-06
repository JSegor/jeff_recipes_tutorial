import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ImportDataComponent } from './import-data/import-data.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { InStockComponent } from './in-stock/in-stock.component';
import { RecipeHolderComponent } from './recipe-holder/recipe-holder.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ImportDataComponent,
    NavigatorComponent,
    AccessoriesComponent,
    ErrorPageComponent,
    InStockComponent,
    RecipeHolderComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
