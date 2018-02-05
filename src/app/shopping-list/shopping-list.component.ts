import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {LoggingService} from '../shared/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [LoggingService]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ];

  constructor(private loggingService: LoggingService) { }

  ngOnInit() {
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.loggingService.logStatusChange('new ingredient added');
    this.ingredients.push(ingredient);
  }

}
