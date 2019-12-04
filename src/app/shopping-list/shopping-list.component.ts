import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {LoggingService} from '../shared/logging.service';
import {LoggingService2 } from '../logging.service';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [LoggingService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private loggingService2: LoggingService2) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChangeSub = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
    this.loggingService2.printLog('Hello from shippingList ngOnInit');
  }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
