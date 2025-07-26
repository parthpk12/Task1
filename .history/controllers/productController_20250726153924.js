const db = require("../configs/db");

const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.send("Details missing for the product");
    }

    await db.query(
      "insert into products(name,description,price) values ($1,$2,$3)",
      [name, description, price]
    );

    res.json({
      message: "Product created successfully",
    });
  } catch (err) {
    res.send("Error for Creating Product" + err.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const {rows : allProducts} = await db.query("select * from products");

    console.log(allProducts);

    res.json({
      message: "All prodcuts Fetched",
      data: allProducts,
    });
  } catch (err) {
    res.send("Error fetching all products" + err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("delete from set is_deleted = 'truw products where id = $2", [id]);

    res.json({
      message: "Product deleted Successfully",
    });
  } catch (err) {
    res.send("Error for delete product" + err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    console.log("data for update",name,description,price);

    await db.query(
      "update products set name=$1,description=$2, price=$3 where id=$4",
      [name, description, price, id]
    );

    res.json({
      message: "Problem updated successfully",
    });
  } catch (err) {
    res.status(400).send("Error for update product" + err.message);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
