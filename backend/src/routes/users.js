import express from 'express';
const route_users = express.Router();

// default users for testing
// in real applications, this data would come from a database (MySQL)
export let users = [
  {
    id: 1,
    username: "Andrea",
    email: "andy2@gmail.com",
    phone: "3002828298",
    address: "Cra 45 #4-09"
  },
  {
    id: 2,
    username: "Samuel",
    email: "samuel@gmail.com",
    phone: "3043828298",
    address: "Cra 3 #4-08"
  },
];

// Function to validate if all inputs are strings
function string_validation(username, email, phone, address) {
  let data = [username, email, phone, address];
  return data.every(item => typeof item === 'string');
}

// GET all users
route_users.get('/', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error, could not GET users' });
  }
});

// POST user
route_users.post('/', (req, res) => {
  try {
    const { username, email, phone, address } = req.body;

    // Validate if all required fields are present
    if (!username || !email || !phone || !address) {
      return res.status(400).json({ error: 'JSON incomplete' });
    }

    // Validate type of data
    if (!string_validation(username, email, phone, address)) {
      return res.status(400).json({ error: 'type of data invalid' });
    }

    // Validate unique username or email
    if (users.some(u => u.username === username || u.email === email)) {
      return res.status(400).json({ message: "username or email already in use" });
    }

    // Generate new id
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const new_user = { id: newId, username, email, phone, address };
    users.push(new_user);

    return res.status(201).json(new_user);
  } catch (error) {
    console.error("❌ Error POST /users:", error);
    res.status(500).json({ error: 'Internal server error, could not POST user' });
  }
});

// PUT update user
route_users.put('/:id', (req, res) => {
  try {
    const { username, email, phone, address } = req.body;
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);
    if (index < 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!username || !email || !phone || !address) {
      return res.status(400).json({ error: 'JSON incomplete' });
    }

    if (!string_validation(username, email, phone, address)) {
      return res.status(400).json({ error: 'type of data invalid' });
    }

    const updated_user = { id, username, email, phone, address };
    users[index] = updated_user;

    return res.json(updated_user);
  } catch (error) {
    console.error("❌ Error PUT /users:", error);
    res.status(500).json({ error: 'Internal server error, could not UPDATE user' });
  }
});

// DELETE user
route_users.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index < 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const deletedUser = users.splice(index, 1);

    return res.json({ message: "User deleted", user: deletedUser[0] });
  } catch (error) {
    console.error("Error DELETE /users:", error);
    res.status(500).json({ error: 'Internal server error, could not DELETE user' });
  }
});

export default route_users;
