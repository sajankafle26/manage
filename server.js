const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// JSON Data
let products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Mouse",
    price: 1000,
  },
];

// Get All Products
app.get("/products", (req, res) => {
  res.json(products);
});

// Get Single Product
app.get("/products/:id", (req, res) => {
  const product = products.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

// Create Product
app.post("/products", (req, res) => {
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update Product
app.put("/products/:id", (req, res) => {
  const index = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products[index] = {
    ...products[index],
    ...req.body,
  };

  res.json(products[index]);
});

// Delete Product
app.delete("/products/:id", (req, res) => {
  products = products.filter(
    (p) => p.id !== parseInt(req.params.id)
  );

  res.json({
    message: "Product deleted",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
