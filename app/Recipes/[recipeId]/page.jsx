"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import NutritionWidget from '@/app/Components/NutritionWidget';
import IngredientsPage from '@/app/Components/IngredientsPage.jsx';

const RecipeDetailPage = ({ params }) => {
  const router = useRouter();
  const { recipeId } = params;
  const [ingredients, setIngredients] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);

  const apiKey = "4ea43c3d4d094e73bd1279ff484b7acf";

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          setRecipeDetails(data);
          setShoppingList(data?.extendedIngredients.map(ingredient => ({ name: ingredient.original, isChecked: false })) || []);
        } else {
          console.error('Failed to fetch recipe details');
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId, apiKey]);
useEffect(() => {
  const fetchNutritionalInfo = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`);
      if (response.ok) {
        const data = await response.json();
        setNutritionInfo(data);
      } else {
        console.error('Failed to fetch nutritional information');
      }
    } catch (error) {
      console.error('Error fetching nutritional information:', error);
    }
  };

  fetchNutritionalInfo();
}, [recipeId, apiKey]);

  const handleCheckboxChange = (index) => {
    const updatedShoppingList = [...shoppingList];
    updatedShoppingList[index].isChecked = !updatedShoppingList[index].isChecked;
    setShoppingList(updatedShoppingList);
  };

  const addToShoppingList = () => {
    const selectedIngredients = shoppingList.filter(ingredient => ingredient.isChecked).map(ingredient => ingredient.name);
    console.log("Selected Ingredients:", selectedIngredients);
    // router.push(`/ShoppingList/${selectedIngredients.join(',')}`);
    router.push('/ShoppingList');
  };

  if (!recipeDetails) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        <h1 className="text-3xl font-bold mb-4">{recipeDetails.title}</h1>
        <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}></div>
        <Image src={recipeDetails.image} alt={recipeDetails.title} width={300} height={300} className="mb-4 rounded-lg" />
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Preparation Time</h2>
          <p>{recipeDetails.readyInMinutes} minutes</p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          {recipeDetails.analyzedInstructions.length > 0 ? (
            recipeDetails.analyzedInstructions[0].steps.map((step, index) => (
              <p key={index}><span className="font-semibold">{step.number}:</span> {step.step}</p>
            ))
          ) : (
            <p>No instructions available</p>
          )}
        </div>
        <div className="flex space-x-4 mb-8">
          <button onClick={addToShoppingList} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Shopping List
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add to Meal Plan
          </button>
        </div>
      </div>
      
      <div className="bg-white py-8">
        <h2 className="text-2xl font-bold text-center mb-4">Ingredients</h2>
        <IngredientsPage ingredients={ingredients} />
        <ul className="list-disc pl-6">
          {recipeDetails.extendedIngredients.map((ingredient, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={shoppingList[index] ? shoppingList[index].isChecked : false}
                onChange={() => handleCheckboxChange(index)}
              />
              <label>{ingredient.original}</label>
            </li>
          ))}
        </ul>
      </div>
      {nutritionInfo && (
        <div className="bg-white py-8">
          <h2 className="text-2xl font-bold text-center mb-4">Nutritional Information</h2>
          <NutritionWidget recipeId={recipeDetails.id} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;