const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to update customer data
app.post('/update-customer', (req, res) => {
  const updatedCustomer = req.body;

  // Read the existing data
  fs.readFile(path.join(__dirname, 'src', 'data', 'data.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
      return;
    }

    // Parse the existing data
    const customers = JSON.parse(data);

    // Find and update the customer
    const customerIndex = customers.findIndex(item => item.FIN === updatedCustomer.FIN);
    if (customerIndex !== -1) {
      customers[customerIndex] = {
        ...customers[customerIndex],
        ...updatedCustomer
      };

      // Write the updated data back to the file
      fs.writeFile(path.join(__dirname, 'src', 'data', 'data.json'), JSON.stringify(customers, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing data file');
          return;
        }

        res.status(200).send('Customer data updated successfully');
      });
    } else {
      res.status(404).send('Customer not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
