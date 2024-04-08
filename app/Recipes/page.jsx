
"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image.js";
import Link from "next/link";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
    // const apiKey = "43090ee37698431d9400a53ec4cf8e5d";
   const apiKey = "ae9fab0183fd48e9b6af4a983da4897f";
  //  const apiKey = "4ea43c3d4d094e73bd1279ff484b7acf";
  

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=20&apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  if (!recipes.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border rounded-md overflow-hidden">
        
              <Link href={`/Recipes/${recipe.id}`} passHref> 
                <Image
                  src={recipe.image}
                  width={300}
                  height={300}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
                  <p className="text-sm">{recipe.summary}</p>
                </div>
             
            </Link>
            <div className="bg-gray-100 p-4 flex justify-between">
              <span className="text-sm">Rating: {recipe.spoonacularScore}/100</span>
              <span className="text-sm">Cooking Time: {recipe.readyInMinutes} mins</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecipePage;