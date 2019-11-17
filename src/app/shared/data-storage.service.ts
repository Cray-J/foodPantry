import {Injectable} from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { exhaustMap, take } from "rxjs/internal/operators";
import { pipe } from "rxjs/Rx";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipesService: RecipeService,
              private authService: AuthService) {

  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://food-pantry-2cc40.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
      return this.http
        .get<Recipe[]>('https://food-pantry-2cc40.firebaseio.com/recipes.json?auth=',
          {
            params: new HttpParams().set('auth', user.token)
          }
      );
    }),
        map((recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ?  recipe.ingredients : []};
          });
        })),
        tap(recipes => this.recipesService.setRecipes(recipes))).subscribe(user => {
    });
  }
}
