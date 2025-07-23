const createStock = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    if(!id || !quantity){
     return res.send("Filed missing");
    }

    
  } catch (err) {
    res.send("Error for creating stocks" + err.message);
  }
};
