const createStock = async (req, res) => {
  try {
    const { id, quantity } = req.body;
  } catch (err) {
    res.send("Error for creating stocks" + err.message);
  }
};
