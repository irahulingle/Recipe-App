import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`/api/recipes/${id}`);
      setRecipe(res.data);
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/recipes/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  if (!recipe) return <div className="text-center py-16">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-20 pb-10">
      {recipe.photoUrl && (
        <img
          src={recipe.photoUrl}
          alt={recipe.title}
          className="w-full h-[400px] object-cover rounded-xl shadow mb-6"
        />
      )}

      <h1 className="capitalize text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
        {recipe.title}
      </h1>

      <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-6">
        <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full text-sm">
          {recipe.category}
        </span>
        <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
          ⏱ {recipe.cookingTime} min
        </span>
      </div>

      {/* Ingredients */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
        Ingredients
      </h2>
      <ul className="pl-5 list-disc text-gray-700 dark:text-gray-300 mb-6 space-y-1">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {/* Instructions */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Instructions
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        {recipe.instructions}
      </p>

      {/* Actions */}
      {user && user._id === recipe.createdBy && (
        <div className="flex flex-wrap gap-4">
          <Link to={`/edit-recipe/${id}`}>
            <button className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
              ✏️ Edit
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            🗑 Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
