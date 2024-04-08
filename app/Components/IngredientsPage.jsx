import React from 'react';

const IngredientsPage = ({ ingredients }) => {
  return (
    <div>
      <h1>Ingredients</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsPage;