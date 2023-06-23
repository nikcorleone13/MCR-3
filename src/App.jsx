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

const snackReducer = (state, action) => {
  console.log("sort", state, action.type, action.payload);

  switch (action.type) {
    case "WEIGHTASC": {
      const sort = [...action.payload].sort((a, b) => {
        return parseInt(a.product_weight) - parseInt(b.product_weight);
      });
      console.log("sorted asc", sort);
      return sort;
    }
    case "WEIGHTDSC": {
      const sort = [...action.payload].sort((a, b) => {
        return parseInt(b.product_weight) - parseInt(a.product_weight);
      });
      console.log("sorted asc", sort);
      return sort;
    }
    case "PRICEASC": {
      const sort = [...action.payload].sort((a, b) => {
        return parseInt(a.price) - parseInt(b.price);
      });
      console.log("sorted asc", sort);
      return sort;
    }
    case "PRICEDSC": {
      const sort = [...action.payload].sort((a, b) => {
        return parseInt(b.price) - parseInt(a.price);
      });
      console.log("sorted asc", sort);
      return sort;
    }
    case "CALORIESASC": {
      const sort = [...action.payload].sort((a, b) => {
        return parseInt(a.calories) - parseInt(b.calories);
      });
      console.log("sorted asc", sort);
      return sort;
    }
    case "CALORIESDSC": {
      const sort = [...action.payload].sort((a, b) => {
        return parseInt(b.calories) - parseInt(a.calories);
      });
      console.log("sorted asc", sort);
      return sort;
    }
    default:
      return state;
  }
};

function App() {
  const [state, snackDispatch] = useReducer(snackReducer, snacks);

  const [showData, setShowData] = useState(snacks);
  const [weightAsc, setWeightAsc] = useState(false);
  const [priceAsc, setPriceAsc] = useState(false);
  const [caloriesAsc, setCaloriesAsc] = useState(false);

  const handleChange = (event) => {
    console.log("word", event);
  };

  const handleSorting = (val) => {
    let sorted = [];
    console.log("val", val);
    if (val === 1) {
      weightAsc
        ? ({sorted = snackDispatch({ type: "WEIGHTASC", payload: snacks });
        setShowData(sorted)}
        )
        : setShowData(() => {
            snackDispatch({ type: "WEIGHTDSC", payload: snacks });
          });
    } else if (val === 2) {
      priceAsc
        ? snackDispatch({ type: "PRICEASC", payload: snacks })
        : snackDispatch({ type: "PRICEDSC", payload: snacks });
      setPriceAsc((prev) => !prev);
    } else if (val === 3) {
      caloriesAsc
        ? snackDispatch({ type: "CALORIESASC", payload: snacks })
        : snackDispatch({ type: "CALORIESDSC", payload: snacks });
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
