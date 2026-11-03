import RecipeCard from './components/RecipeCard';

function App() {
  return (
    <div>
      <h1>Recipe Book</h1>
      <RecipeCard recipeName="Masala Dosa" cuisine="South Indian" cookTime="30 mins" />
      <RecipeCard recipeName="Butter Chicken" cuisine="North Indian" cookTime="45 mins" />
      <RecipeCard recipeName="Pav Bhaji" cuisine="Street Food" cookTime="40 mins" />
    </div>
  );
}

export default App;
