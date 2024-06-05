const db = require("./db");

// Fungsi API untuk mencari kain berdasarkan ketebalan dan pola
const searchKain = async (req, res) => {
  const { idKetebalan, idPola } = req.body;

  if (!idKetebalan || !idPola) {
    return res
      .status(400)
      .json({ error: "id_ketebalan and id_pola are required" });
  }

  const query = `
        SELECT kain.id, kain.nama, ketebalan.nama AS ketebalan, pola.nama AS pola
        FROM kain
        JOIN ketebalan ON kain.id_ketebalan = ketebalan.id
        JOIN pola ON kain.id_pola = pola.id
        WHERE kain.id_ketebalan = $1 AND kain.id_pola = $2
    `;
  const values = [idKetebalan, idPola];

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Tidak terdapat kain yang dicari' });
    }
    const response = {
        message: 'Data retrieved successfully',
        data: result.rows,
    };
    res.status(200).json(response);
  } catch (err) {
    console.error("Error retrieving data:", err.message, err.stack);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the data" });
  }
};

// Fungsi API untuk menambahkan kain
const addKain = async (req, res) => {
  const { nama, idKetebalan, idPola } = req.body;

  // Create an insert query
  const insertQuery =
    "INSERT INTO kain (nama, id_ketebalan, id_pola) VALUES ($1, $2, $3) RETURNING *";
  const values = [nama, idKetebalan, idPola];

  // Execute the insert query
  try {
    const result = await db.query(insertQuery, values);
    const addKain = result.rows[0];
    const response = {
      message: "Kain created successfully",
      kain: addKain,
    };
    res.status(201).json(response);
  } catch (err) {
    console.error("Error creating kain:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the kain" });
  }
};

// Fungsi API untuk menambahkan ketebalan
const addKetebalan = async (req, res) => {
  const { nama } = req.body;

  if (!nama) {
    return res.status(400).json({ error: "nama is required" });
  }

  const query = "INSERT INTO ketebalan (nama) VALUES ($1) RETURNING *";
  const values = [nama];

  try {
    const result = await db.query(query, values);
    const addKetebalan = result.rows[0];
    const response = {
      message: "Ketebalan added successfully",
      ketebalan: addKetebalan,
    };
    res.status(201).json(response);
  } catch (err) {
    console.error("Error creating ketebalan:", err.message, err.stack);
    res
      .status(500)
      .json({ error: "An error occurred while creating the ketebalan" });
  }
};

// Fungsi api mendapatkan list ketebalan
const getKetebalan = async (req, res) => {
    // Create a select query to retrieve all ketebalan
    const selectQuery = "SELECT * FROM ketebalan";
    try {
      // Execute the select query
      const result = await db.query(selectQuery);
      const ketebalan = result.rows;
      res.json(ketebalan);
    } catch (err) {
      console.error("Error fetching ketebalan:", err);
      res.status(500).json({ error: "An error occurred while fetching profile" });
    }
  };
  


// Fungsi API untuk menambahkan pola
const addPola = async (req, res) => {
  const { nama } = req.body;

  if (!nama) {
    return res.status(400).json({ error: "nama is required" });
  }

  const query = "INSERT INTO pola (nama) VALUES ($1) RETURNING *";
  const values = [nama];

  try {
    const result = await db.query(query, values);
    const addPola = result.rows[0];
    const response = {
      message: "Pola added successfully",
      pola: addPola,
    };
    res.status(201).json(response);
  } catch (err) {
    console.error("Error creating pola:", err.message, err.stack);
    res
      .status(500)
      .json({ error: "An error occurred while creating the pola" });
  }
};

// Fungsi api mendapatkan list pola
const getPola = async (req, res) => {
    // Create a select query to retrieve all pola
    const selectQuery = "SELECT * FROM pola";
    try {
      // Execute the select query
      const result = await db.query(selectQuery);
      const pola = result.rows;
      res.json(pola);
    } catch (err) {
      console.error("Error fetching pola:", err);
      res.status(500).json({ error: "An error occurred while fetching profile" });
    }
  };

module.exports = {
  searchKain,
  addKain,
  addKetebalan,
  addPola,
  getKetebalan,
  getPola,
};
