const db = require("./db");


// Helper function to find a profile by ID
function findProfileById(id) {
  return profile.find((profile) => profile.id === id);
}

// Create a new profile
const newProfile = async (req, res) => {
  const { name, address, numberTelepon } = req.body;
  
  // Create an insert query
  const insertQuery =
    "INSERT INTO profile (name, address, number_telepon) VALUES ($1, $2, $3) RETURNING *";
  const values = [name, address, numberTelepon ];

  // Execute the insert query
  try {
    const result = await db.query(insertQuery, values);
    const newProfile = result.rows[0];
    const response = {
      message: "Profile created successfully",
      profile: newProfile,
    };
    res.status(201).json(response);
  } catch (err) {
    console.error("Error creating profile:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the profile" });
      
  }
};

// Get all profiles
const getAllProfile = async (req, res) => {
  // Create a select query to retrieve all profiles
  const selectQuery = "SELECT * FROM profile";
  try {
    // Execute the select query
    const result = await db.query(selectQuery);
    const profile = result.rows;
    res.json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "An error occurred while fetching profile" });
  }
};

// Get a profile by ID
const getProfile = async (req, res) => {
  const id = req.params.id;

  // Create a select query
  const selectQuery = "SELECT * FROM profile WHERE id = $1";
  const values = [id];

  // Execute the select query
  try {
    const result = await db.query(selectQuery, values);
    const existingProfile = result.rows[0];
    if (existingProfile) {
      res.json(existingProfile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the profile" });
  }
};
// Update a profile
const updateProfile = async (req, res) => {
  const id = req.params.id;
  const { name, address, numberTelepon } = req.body;
  // Create an update query
  const updateQuery =
    "UPDATE profile SET name = $1, address = $2, number_telepon = $3 WHERE id = $4";
  const values = [name, address, numberTelepon, id];

  // Execute the update query
  try {
    const result = await db.query(updateQuery, values);
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Profile not found" });
    } else {
      const updatedProfile = { id, name, address, numberTelepon };
      const response = {
        message: "Profile updated successfully",
        profile: updatedProfile,
      };
      res.json(response);
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile" });
  }
};

// Delete a profile
const deleteProfile = async (req, res) => {
  const id = req.params.id;
  // Create a delete query
  const deleteQuery = "DELETE FROM profile WHERE id = $1";
  const values = [id];

  // Execute the delete query

  try {
    const result = await db.query(deleteQuery, values);
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Profile not found" });
    } else {
      const response = {
        message: "Profile deleted successfully",
        deletedProfileId: id,
      };
      res.json(response);
    }
  } catch (err) {
    console.error("Error deleting profile:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the profile" });
  }
};

module.exports = {
  getAllProfile,
  newProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
