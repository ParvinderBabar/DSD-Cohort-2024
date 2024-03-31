"use client"
import { useState, useEffect } from "react";

const RecipePage = ({ params }) => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { recipeId } = params;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
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

    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipeDetails.title}</h1>
      {/* Render other recipe details here */}
    </div>
  );
};

export default RecipePage;