import { useState } from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ recipeName, cuisine, cookTime }) {
  const [favourite, setFavourite] = useState(false);

  return (
    <div className="recipe-card">
      <h3>{recipeName}</h3>
      <p>Cuisine: {cuisine}</p>
      <p>Cook Time: {cookTime}</p>
      {favourite && <p>Status: Favourite</p>}
      <button id="favourite-btn" onClick={() => setFavourite(!favourite)}>
        {favourite ? 'Remove from Favourites' : 'Add to Favourites'}
      </button>
    </div>
  );
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string,
  cuisine: PropTypes.string,
  cookTime: PropTypes.string,
};

export default RecipeCard;
