import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeHolderComponent } from './recipe-holder/recipe-holder.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { InStockComponent } from './in-stock/in-stock.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ImportDataComponent } from './import-data/import-data.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'

  },


  {
    path: 'landing', component: LandingPageComponent
  },

  {
    path: 'recipes/:recipe', component: RecipeHolderComponent
  },


  {
    path: 'shopping-list', component: ShoppingListComponent
  },

  {
    path: 'accessories', component: AccessoriesComponent
  },

  {
    path: 'in-stock', component: InStockComponent
  },

  {
    path: 'import-data', component: ImportDataComponent
  },



  {
    path: 'error', component: ErrorPageComponent
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
