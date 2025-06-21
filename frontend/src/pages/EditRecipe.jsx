import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    category: "",
    photoUrl: "",
    cookingTime: "",
  });
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    handleInputChange("ingredients", newIngredients);
    const lastIngredient =
      formData.ingredients[formData.ingredients.length - 1];
    if (error && lastIngredient.trim() !== "") {
      setError("");
    }
  };

  const addIngredient = () => {
    const lastIngredient =
      formData.ingredients[formData.ingredients.length - 1];
    if (lastIngredient.trim() !== "") {
      setError("");
      handleInputChange("ingredients", [...formData.ingredients, ""]);
    } else {
      setError("Please fill in the last ingredient before adding a new one");
    }
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      handleInputChange("ingredients", newIngredients);
      const lastIngredient =
        formData.ingredients[formData.ingredients.length - 1];
      if (error && lastIngredient.trim() !== "") {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.put(`/api/recipes/${id}`, {
        title: formData.title,
        ingredients: formData.ingredients.filter((i) => i.trim() !== ""),
        instructions: formData.instructions,
        category: formData.category,
        photoUrl: formData.photoUrl,
        cookingTime: formData.cookingTime
          ? Number(formData.cookingTime)
          : undefined,
      });
      navigate("/");
    } catch (err) {
      setError("Failed to update recipe");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`/api/recipes/${id}`);
      setFormData({
        title: res.data.title,
        ingredients: res.data.ingredients,
        instructions: res.data.instructions,
        category: res.data.category,
        photoUrl: res.data.photoUrl,
        cookingTime: res.data.cookingTime,
      });
    };
    fetchRecipe();
  }, [id]);

  if (!formData) return <div className="text-center py-16">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        ✏️ Edit Recipe
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Ingredients
          </label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
                placeholder={`Ingredient ${index + 1}`}
                required
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {error && (
            <div className="text-sm text-red-500 mb-2">{error}</div>
          )}
          <button
            type="button"
            onClick={addIngredient}
            className="text-blue-500 hover:underline"
          >
            ➕ Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Instructions
          </label>
          <textarea
            value={formData.instructions}
            onChange={(e) => handleInputChange("instructions", e.target.value)}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white min-h-[120px]"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            onChange={(e) => handleInputChange("category", e.target.value)}
            value={formData.category}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

        {/* Cooking Time */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            value={formData.cookingTime}
            onChange={(e) => handleInputChange("cookingTime", e.target.value)}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
            placeholder="e.g., 30"
            required
            min={0}
          />
        </div>

        {/* Photo Url */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Photo URL
          </label>
          <input
            type="text"
            value={formData.photoUrl}
            onChange={(e) => handleInputChange("photoUrl", e.target.value)}
            className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:text-white"
            placeholder="https://example.com/photo.jpg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg text-white text-lg font-semibold transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Updating..." : "Update Recipe"}
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
