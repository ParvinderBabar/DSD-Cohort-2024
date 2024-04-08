"use client"
// import React from 'react';
import React, { useEffect } from 'react';
import { useRouter,searchParams } from 'next/navigation';

const ShoppingList = () => {
  const router = useRouter();
    const searchParams = useSearchParams();

  const ingredients = router.query && router.query.ingredients;
console.log("Router Query:", router.query);
console.log("Ingredients:", ingredients);



  const selectedIngredients = ingredients ? ingredients.split(',') : [];

  useEffect(() => {
    console.log("Selected Ingredients:", selectedIngredients);
  }, [selectedIngredients]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
      <ul className="list-disc pl-6">
        {/* Display the list of ingredients */}
        {selectedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};
 

 
export default ShoppingList;