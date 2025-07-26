const db = require("../configs/db");

const createStock = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    if (!id || !quantity) {
      return res.send("Missing field for stock create");
    }

    await db.query("insert into stock (product_id, quantity) values ($1,$2)", [
      id,
      quantity,
    ]);

    res.json({
      message: "Stock created successfully",
    });
  } catch (err) {
    res.send("Error for creating stocks" + err.message);
  }
};

const updateStock = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    console.log(req.body);

    if (!id || !quantity) {
      return res.send("Missing fields for update stock");
    }

    await db.query("update stock set quantity = $1 where product_id = $2", [
      quantity,
      id,
    ]);

    res.json({
      message: "Stock updated successfully",
    });
  } catch (err) {
    res.send("Problem with stock update" + err.message);
  }
};

const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("delete from stock where product_id = $1", [id]);

    res.json({
      message: "Stock for product deleted successfully",
    });
  } catch (err) {
    res.send("Error for delete stock" + err.message);
  }
};

const getAllStocks = async (req, res) => {
  try {
    const { rows: stockData } = await db.query(
      "select p.name,p.description,p.price,s.quantity from stock s join products p on p.id = s.product_id"
    );

    console.log(stockData);

    res.json({
      message: "Stock fetched successfully",
      data: stockData,
    });
  } catch (err) {
    res.status(400).send("Error for fetching stocks" + err.message);
  }
};

module.exports = { createStock, updateStock, deleteStock, getAllStocks };
