
"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";


const RecipeDetails = () => {
  const router = useRouter();
  const recipeId = router.query.recipeId; // Access the recipeId directly from router.query
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetails(recipeId);
    }
  }, [recipeId]);

  const fetchRecipeDetails = async (recipeId) => {
    try {
      const apiKey = 'ae9fab0183fd48e9b6af4a983da4897f';
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
      }
      const data = await response.json();
      setRecipeDetails(data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const handleAddToOptions = () => {
    // Implement functionality to add recipe to options
    console.log('Recipe added to options');
  };

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipeDetails.title}</h1>
      {/* Display other recipe details */}
      <button onClick={handleAddToOptions}>Add to Options</button>
    </div>
  );
};

export default RecipeDetails;