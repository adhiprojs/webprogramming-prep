# w11-pah2: Recipe Book (RecipeCard with favourite toggle, useEffect)

## 1. What the question asks
- `components/RecipeCard.jsx`: props `recipeName`, `cuisine`, `cookTime`; root `div.recipe-card`; `h2.recipe-name`; `p` `Cuisine: <cuisine>`; `p` `Cook Time: <cookTime>`; `button#favourite-btn`; `p#favourite-status`. State `isFavourite` (false).
  - false: button `Add to Favourites`, status `Status: Not a Favourite`
  - true: button `Remove from Favourites`, status `Status: Favourite`
  - `useEffect` with `[isFavourite]` logs the change; `propTypes` for all three props. Imports `./RecipeCard.css`.
- `App.js`: `div#app-container`, `h1#page-title` `Recipe Book`, three recipes (`Masala Dosa`, `Butter Chicken`, `Pav Bhaji`) mapped to `RecipeCard` with `key`.

## 2. What each test checks
- `getByText("Recipe Book")`; `.recipe-card` count is 3.
- Direct render (`Masala Dosa`, `South Indian`, `30 mins`): name, `Cuisine: South Indian`, `Cook Time: 30 mins`, `Add to Favourites`.
- Click `#favourite-btn` -> `Remove from Favourites` and `Status: Favourite` visible.
- `propTypes` has `recipeName`, `cuisine`, `cookTime`.

## 3. The original submission
Passes 8/8. Right: `useState`, ternaries for both texts, ids as spec, `key={recipe.id}`, PropTypes.
Fragile: `useEffect` deps `[isFavourite]` omits `recipeName` (ESLint exhaustive-deps warning only). `getByText("Status: Favourite")` is exact, so it does not match `Status: Not a Favourite`; a regex `/Favourite/` would match several elements. Missing CSS file breaks the import.

## 4. Common mistakes
- Different text for the unselected status.
- Toggle written as `setIsFavourite(true)` (no toggle back).
- ID on wrong element or using `className`.
- `useEffect` without a dependency array (runs every render).
- Forgetting `propTypes` or `key`.
- Putting state in `App` instead of per card (all cards would toggle together).

## 5. Approach in 5 steps
1. Component with 3 props and `useState(false)`.
2. Toggle handler `setIsFavourite(!isFavourite)`.
3. Render texts with ternaries, ids as spec.
4. Add `useEffect(..., [isFavourite])` and `propTypes`.
5. `App`: array of 3 recipes, `map` to cards with `key`.
