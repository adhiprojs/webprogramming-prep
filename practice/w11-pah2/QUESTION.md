# Recipe Book with Favourite Toggle (React)

Build a recipe book page. `App` shows a title and three recipe cards built with a reusable `RecipeCard` component. Each card shows the recipe name, cuisine and cook time, and has a button that toggles the recipe as a favourite.

## Components

- `src/App.js` - default export `App`, no props. Renders 3 `RecipeCard`s.
- `src/components/RecipeCard.jsx` - default export `RecipeCard`. Props: `recipeName`, `cuisine`, `cookTime` (strings); define `RecipeCard.propTypes` with all three. Its root element must have class `recipe-card`.
- Optional styles: `App.css`, `components/RecipeCard.css`.

## Requirements

1. `App` shows the title `Recipe Book`. *(renders_page_title)*
2. `App` renders 3 elements with class `recipe-card`. *(renders_all_recipe_cards)*
3. With `recipeName="Masala Dosa"`, `RecipeCard` shows `Masala Dosa` in its own element. *(renders_recipe_name)*
4. With `cuisine="South Indian"`, it shows `Cuisine: South Indian` in one element. *(renders_recipe_cuisine)*
5. With `cookTime="30 mins"`, it shows `Cook Time: 30 mins` in one element. *(renders_recipe_cook_time)*
6. It shows a button with the text `Add to Favourites` initially. *(renders_add_to_favourites_button)*
7. That button has `id="favourite-btn"`. Clicking it changes its text to `Remove from Favourites` and shows a line `Status: Favourite`. *(toggles_favourite_status_on_click)*
8. `RecipeCard.propTypes` has the properties `recipeName`, `cuisine` and `cookTime`. *(validates_proptypes)*

## Watch out

- `getByText("Recipe Book")` is exact; do not reuse it for another element.
- `id="favourite-btn"` is queried with `document.querySelector`; in `App` with several cards the id repeats, but the test only uses it on a single `RecipeCard`.
- `Status: Favourite` must be in a single element and only appear after the click (state-driven), and `Remove from Favourites` replaces `Add to Favourites`.
- `getByText("Add to Favourites")` is exact and must match only one element.
- Count uses `.recipe-card`, so put the class on exactly one element per card.

## Files

- `reactapp/src/App.js`
- `reactapp/src/components/RecipeCard.jsx`
- `reactapp/src/App.css`
- `reactapp/src/components/RecipeCard.css`

## How it's graded

Jest + React Testing Library (react-scripts test) runs `src/tests/App.test.js`.
