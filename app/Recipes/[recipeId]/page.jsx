// "use client"
// import { useState, useEffect } from "react";
// import { findUnique } from "@/lib/prisma.js";

// const RecipePage = ({ params }) => {
//   const [recipeDetails, setRecipeDetails] = useState(null);
//   const { recipeId } = params;

//   useEffect(() => {
//     const fetchRecipeDetails = async () => {
//       try {
//         const recipe = await findUnique({
//           where: { id: recipeId }
//         });
//         setRecipeDetails(recipe);
//       } catch (error) {
//         console.error('Error fetching recipe details:', error);
//       }
//     };

//     if (recipeId) {
//       fetchRecipeDetails();
//     }
//   }, [recipeId]);

//   if (!recipeDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{recipeDetails.title}</h1>
//       {/* Render other recipe details here */}
//     </div>
//   );
// };

// export default RecipePage;
"use client"
import { useRouter } from 'next/router';

const RecipeDetails = () => {
  // Access the router object using the useRouter hook
  const router = useRouter();

  // Extract the recipeId from the query parameters
  const { recipeId } = router.query;

  // Now you can use the recipeId in your component logic
  // For example, you can fetch data for the recipe based on this ID

  return (
    <div>
      <h1>Recipe Details</h1>
      <p>Recipe ID: {recipeId}</p>
      {/* Add more UI elements */}
    </div>
  );
};

export default RecipeDetails;