"use client";

import { useState, useEffect } from "react";

type Food = {
  id: number;
  name: string;
  description?: string;
  price: number;
};

export default function AdminFoods() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Fetch foods
  const fetchFoods = async () => {
    const res = await fetch("/api/foods");
    const data = await res.json();
    setFoods(data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Add food
  const handleAdd = async () => {
    const res = await fetch("/api/foods", {
      method: "POST",
      body: JSON.stringify({ name, description, price }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setName(""); setDescription(""); setPrice("");
      fetchFoods();
    } else alert("Failed to add food");
  };

  // Delete food
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/foods/${id}`, { method: "DELETE" });
    if (res.ok) fetchFoods();
    else alert("Failed to delete food");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Foods</h1>

      <div className="mb-6 flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 rounded"/>
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 rounded"/>
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="border p-2 rounded"/>
        <button onClick={handleAdd} className="bg-green-500 text-white p-2 rounded">Add</button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food.id}>
              <td className="border p-2">{food.name}</td>
              <td className="border p-2">{food.description}</td>
              <td className="border p-2">{food.price}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(food.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
