import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataAccessService } from '../data-access.service';

declare var $: any

interface Ingredient {
  name: string;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  todo: any[] = [];

  done: any[] = [];

  categories: any[] = [];

  boxstatus: string = ".example-box";

  constructor(private dataAccess: DataAccessService) { }

  ngOnInit(): void {

    // this.todo.push('almond milk');
    // this.todo.push('avacados');
    // this.todo.push('apples');
    // this.todo.push('baby bella mushrooms');
    // this.todo.push('baby carrots');
    // this.todo.push('baked beans');
    // this.todo.push('bell peppers');
    // this.todo.push('bowtie pasta');
    // this.todo.push('bread');
    // this.todo.push('butter');
    // this.todo.push('cereal');
    // this.todo.push('chicken tenderloins');
    // this.todo.push('cheddar cheese');
    // this.todo.push('chocolate');
    // this.todo.push('cookies');
    // this.todo.push('cottage cheese');
    // this.todo.push('dish soap');
    // this.todo.push('flour');
    // this.todo.push('frozen beef patties');
    // this.todo.push('grapes');
    // this.todo.push('ground beef');
    // this.todo.push('hand soap');
    // this.todo.push('half and half milk');
    // this.todo.push('honey');
    // this.todo.push('lemonade');
    // this.todo.push('lettuce');
    // this.todo.push('macaroni salad');
    // this.todo.push('muffins');
    // this.todo.push('oatmeal');
    // this.todo.push('olive oil');
    // this.todo.push('onions');
    // this.todo.push('parmesan cheese');
    // this.todo.push('pork sausages');
    // this.todo.push('roast beef');
    // this.todo.push('stew meat');
    // this.todo.push('sweet relish');
    // this.todo.push('sweet potatos');
    // this.todo.push('sweet potato fries');
    // this.todo.push('syrup');
    // this.todo.push('tomato paste');
    // this.todo.push('toothpaste');
    // this.todo.push('tumeric');
    // this.todo.push('waffles');
    // this.todo.push('water');

    let self = this;


    this.categories.push({ "name": "Broth", "checked": false });
    this.categories.push({ "name": "Canned", "checked": false });
    this.categories.push({ "name": "Condiments", "checked": false });
    this.categories.push({ "name": "Confections", "checked": false });
    this.categories.push({ "name": "Dairy", "checked": false });
    this.categories.push({ "name": "Drinks", "checked": false });
    this.categories.push({ "name": "Fruit", "checked": false });
    this.categories.push({ "name": "Garden", "checked": false });
    this.categories.push({ "name": "Grains", "checked": false });
    this.categories.push({ "name": "Meat", "checked": false });
    this.categories.push({ "name": "Medication", "checked": false });
    this.categories.push({ "name": "Pasta", "checked": false });
    this.categories.push({ "name": "Pastries", "checked": false });
    this.categories.push({ "name": "Oils", "checked": false });
    this.categories.push({ "name": "Snacks", "checked": false });
    this.categories.push({ "name": "Spices", "checked": false });
    this.categories.push({ "name": "Vegetables", "checked": false });
    this.categories.push({ "name": "Vitamins and Herbs", "checked": false });
    this.categories.push({ "name": "Other", "checked": false });

    
    
    
    
    


  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  onShoppingListShow(): void {
    let temp: string[] = [];
    for (let i = 0; i < this.done.length; i++) {
      temp.push(this.done[i].name);
    }
    alert(temp);
  }

  onRefreshList(): void {
    alert("Not Implemented yet");
  }

  onClicked(event: any, name: string) {
    console.log(event);
    console.log(name);
    if (event.target.checked === true) {
      let self = this;
      this.dataAccess.fetchData(`/api/inventory/${name}`,self, (data: any[]) => { 
        let filtered = data.filter(ar => !self.done.find(rm => (rm.name === ar.name ) ));
        this.todo.push(...filtered) 
      });
    } else {
      let self = this;
      this.dataAccess.fetchData(`/api/inventory/${name}`, self, (data: any[]) => {
        self.todo = self.todo.filter(ar => !data.find(rm => (rm.name === ar.name ) ));
        
       
      });
    }
  }

  onClearShoppingList(){
    $("[type='checkbox']").prop("checked", false);
    this.done = [];
    this.todo = [];
  }


}


