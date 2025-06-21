import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get(
        `/api/recipes/${
          category && category !== "All" ? `?category=${category}` : ""
        }`
      );
      console.log(res.data);
      setRecipes(res.data);
    };
    fetchRecipes();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold shadow-sm border transition-colors duration-300
              ${
                category === cat
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
              }`}
            key={cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe Cards */}
      {recipes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No recipes found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe._id}`}
              key={recipe._id}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition duration-300"
            >
              {recipe.photoUrl && (
                <img
                  src={recipe.photoUrl}
                  alt={recipe.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transform transition duration-300"
                />
              )}
              <div className="p-4 space-y-1">
                <h2 className="text-xl font-bold capitalize text-gray-900 dark:text-white">
                  {recipe.title}
                </h2>
                <p className="text-sm text-gray-900 dark:text-gray-400">
                  {recipe.category} &bull; {recipe.cookingTime} mins
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
