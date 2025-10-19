abstract class CakeRecipe {
  public bakeCake(): void {
    this.preheatOven();
    this.mixIngredients();
    this.bake();
    this.coolingDown();
    this.decorate();
  }

  protected preheatOven(): void {
    console.log("Preheating the oven to 350 degree0s F (175 degrees C).");
  }

  protected bake(): void {
    console.log("Baking the cake...");
  }

  protected coolingDown(): void {
    console.log("Cooling down the cake...");
  }

  //mandatory implementation
  protected abstract mixIngredients(): void;

  protected decorate(): void {
    console.log("Decorating the cake...");
  }
}

class ChocolateCake extends CakeRecipe {
  protected mixIngredients(): void {
    console.log(
      "Mixing  for the chocolate cake: chocolate, sugar, butter, flour, egges, coca powder"
    );
  }

  protected decorate(): void {
    console.log("Adding chocolate icing for decoration");
  }
}

class VanillaCake extends CakeRecipe {
  protected mixIngredients(): void {
    console.log(
      "Mixing ingredients for the vanilla cake: sugar, butter, flour, eggs, vanilla extract"
    );
  }
}

function bake(cake: CakeRecipe): void {
  cake.bakeCake();
}
console.log("bake chocolate cake ===========");
bake(new ChocolateCake());

console.log("bake vanilla cake ==========");
bake(new VanillaCake());
