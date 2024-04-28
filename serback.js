const express = require('express');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');

const app = express();
const port = process.env.PORT || 3000; // Set port for server

// Configure body parser to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
  const { username, mobile, email, country, password } = req.body;

  // Validate user data (implement your own validation logic here)
  if (!username || !mobile || !email || !country || !password) {
    return res.status(400).send('Please fill in all required fields');
  }

  // Prepare user data for spreadsheet
  const userData = [
    ['Username', 'Mobile Number', 'Email', 'Country', 'Password'],
    [username, mobile, email, country, password],
  ];

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(userData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Signup Data');

  XLSX.writeFile(workbook, 'signup_data.xlsx');

  // Respond to successful signup (potentially redirect to login page)
  res.send('Signup successful! You can now log in.');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
