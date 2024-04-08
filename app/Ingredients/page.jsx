"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const IngredientsPage = () => {
  const router = useRouter();
  const { recipeId } = router.query;
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/mealplanner/dsky/shopping-list?recipeId=${recipeId}`);
        if (response.ok) {
          const data = await response.json();
          setIngredients(data.ingredients);
        } else {
          console.error('Failed to fetch ingredients');
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    if (recipeId) {
      fetchIngredients();
    }
  }, [recipeId]);

  return (
    <div>
      <h1>Ingredients for Recipe ID: {recipeId}</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsPage;