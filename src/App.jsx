import { useReducer, useState } from "react";
import "./App.css";
const snacks = [
  {
    id: 1,
    product_name: "Granola Bar",
    product_weight: "21g",
    price: 299,
    calories: 150,
    ingredients: ["Oats", "Honey", "Nuts", "Dried Fruits"],
  },
  {
    id: 2,
    product_name: "Fruit and Nut Mix",
    product_weight: "73g",
    price: 749,
    calories: 353,
    ingredients: [
      "Almonds",
      "Cashews",
      "Dried Cranberries",
      "Dried Blueberries",
    ],
  },
  {
    id: 3,
    product_name: "Veggie Chips",
    product_weight: "28g",
    price: 279,
    calories: 130,
    ingredients: ["Sweet Potatoes", "Beets", "Kale", "Sea Salt"],
  },
  {
    id: 4,
    product_name: "Protein Balls",
    product_weight: "100g",
    price: 499,
    calories: 318,
    ingredients: ["Dates", "Almond Butter", "Protein Powder", "Chia Seeds"],
  },
];

function App() {
  const [showData, setShowData] = useState(snacks);
  const [weightAsc, setWeightAsc] = useState(false);
  const [priceAsc, setPriceAsc] = useState(false);
  const [caloriesAsc, setCaloriesAsc] = useState(false);

  const handleChange = (event) => {
    console.log("word", event);
    const searchItem = event.toLowerCase();
    const found = snacks.filter((product) =>
      product.product_name.toLowerCase().includes(searchItem)
    );
    setShowData(found);
  };

  const handleSorting = (val) => {
    let sorted = [];

    if (val === 1) {
      if (weightAsc) {
        sorted = [...snacks].sort((a, b) => {
          return parseInt(a.product_weight) - parseInt(b.product_weight);
        });
      } else {
        sorted = [...snacks].sort((a, b) => {
          return parseInt(b.product_weight) - parseInt(a.product_weight);
        });
      }
      setShowData(sorted);
      setWeightAsc((prev) => !prev);
    } else if (val === 2) {
      if (priceAsc) {
        sorted = [...snacks].sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        sorted = [...snacks].sort((a, b) => {
          return b.price - a.price;
        });
      }
      setShowData(sorted);
      setPriceAsc((prev) => !prev);
    } else if (val === 3) {
      if (caloriesAsc) {
        sorted = [...snacks].sort((a, b) => {
          return a.calories - b.calories;
        });
      } else {
        sorted = [...snacks].sort((a, b) => {
          return b.calories - a.calories;
        });
      }
      setShowData(sorted);
      setCaloriesAsc((prev) => !prev);
    }
  };

  return (
    <>
      <h1>Snacks Table</h1>
      <input
        className="input-box"
        type="text"
        placeholder="search snack"
        onChange={(e) => handleChange(e.target.value)}
      />

      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th onClick={() => handleSorting(1)}>Product Weight</th>
              <th onClick={() => handleSorting(2)}>Price (INR)</th>
              <th onClick={() => handleSorting(3)}>Calories</th>
              <th>Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(showData).map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.product_name}</td>
                <td>{item.product_weight}</td>
                <td>{item.price}</td>
                <td>{item.calories}</td>
                <td>{item.ingredients}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
