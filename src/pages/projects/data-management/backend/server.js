const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js'); // Added Supabase client

const app = express();
const port = 3006;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure allowed origins
const allowedOrigins = [
  'http://10.167.49.197:3005', // Keep existing one if needed
  'http://localhost:3000'     // Add frontend development origin
];

app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey'],
    credentials: true,
}));

app.options('*', cors()); // Enable pre-flight across-the-board

// --- Supabase Setup ---
// Load URL and Service Role Key from environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'https://yefrbkudmdakbykrpsfz.supabase.co'; // Use provided URL as fallback
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error("FATAL ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable is not set.");
  process.exit(1); // Exit if the crucial service key is missing
}

// Initialize Supabase client with the Service Role Key for backend operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// --- Admin Check Function (Updated) ---
const adminEmail = 'bfurkanbayarr@gmail.com'; // Move admin email here

const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using Supabase auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Supabase auth error:', error.message);
      return res.status(401).json({ message: `Authentication error: ${error.message}` });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user not found.' });
    }

    // Check if the authenticated user's email matches the admin email
    if (user.email !== adminEmail) {
      return res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }

    // Attach user info to request if needed later (optional)
    req.user = user;
    next(); // User is admin, proceed to the next middleware/route handler

  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(500).json({ message: 'Internal server error during token verification.' });
  }
};

// Set up file upload destination and naming convention
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null,`${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// --- Simplified Endpoints ---

// Update row (Admin Only - Protected by verifyAdmin)
app.put('/update-row', verifyAdmin, async (req, res) => {
  // No need for isAdmin check here anymore, verifyAdmin handles it
  const updatedRow = req.body;
  const { ItemID } = updatedRow; // Use ItemID as the primary key

  if (!ItemID) {
    return res.status(400).json({ message: 'ItemID is required for updating.' });
  }

  // Remove ItemID from the update payload as it's used in the filter
  const updateData = { ...updatedRow };
  delete updateData.ItemID;

  try {
    const { data, error } = await supabase
      .from('inventory_items') // TODO: Replace with your actual Supabase table name
      .update(updateData)
      .eq('ItemID', ItemID) // Filter by ItemID
      .select(); // Optionally select the updated row

    if (error) {
      console.error('Error updating row in Supabase:', error);
      // Provide more specific error message if possible
      return res.status(500).json({ message: `Error updating row: ${error.message}` });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Row not found or no changes made.' });
    }

    res.json({ message: 'Row updated successfully!', updatedRow: data[0] });

  } catch (err) {
    console.error('Unexpected error during row update:', err);
    res.status(500).json({ message: 'Unexpected server error during update.' });
  }
});

// Upload CSV data (Admin Only - Protected by verifyAdmin)
app.post('/upload', verifyAdmin, upload.single('file'), async (req, res) => {
  // No need for isAdmin check here anymore, verifyAdmin handles it
  console.log('Upload endpoint hit by authenticated admin.');

  if (!req.file) {
    console.error('No file uploaded.');
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = path.resolve(__dirname, req.file.path);
  const results = [];
  // Define the expected columns in the CSV (must match the new schema)
  const expectedHeaders = ['ItemID', 'OrderID', 'ItemName', 'Barcode', 'Status', 'Received', 'Count'];

  try {
    // Parse CSV
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        // Expect headers matching the simplified schema
        .pipe(csv.parse({ headers: true, skipEmptyLines: true }))
        .on('data', (row) => {
          // Basic validation: check if essential fields exist (e.g., ItemID)
          if (!row.ItemID) {
            console.warn('Row missing ItemID, skipped:', row);
            return; // Skip rows without a primary key
          }
          // Select only the columns relevant to the new schema
          const cleanRow = {};
          expectedHeaders.forEach(header => {
            cleanRow[header] = row[header] !== undefined ? row[header] : null; // Handle missing optional columns
          });
          results.push(cleanRow);
        })
        .on('end', (rowCount) => {
          console.log(`CSV parsing completed. Rows parsed: ${rowCount}, Valid rows for insert: ${results.length}`);
          fs.unlinkSync(filePath); // Clean up uploaded file
          resolve();
        })
        .on('error', (err) => {
          console.error('CSV parsing error:', err);
          fs.unlinkSync(filePath); // Clean up uploaded file on error
          reject(err);
        });
    });

    if (results.length === 0) {
      console.error('No valid data found for insertion.');
      return res.status(400).json({ message: 'No valid data rows found in the file.' });
    }

    // Insert data into Supabase table
    // Using upsert to handle potential conflicts on ItemID (if it's unique)
    // If ItemID is not unique, change to insert()
    const { data, error } = await supabase
      .from('inventory_items') // TODO: Replace with your actual Supabase table name
      .upsert(results, { onConflict: 'ItemID' }) // Upsert based on ItemID conflict
      .select(); // Optionally select the inserted/updated rows

    if (error) {
      console.error('Error inserting/updating data in Supabase:', error);
      return res.status(500).json({ message: `Database error during bulk insert/update: ${error.message}` });
    }

    console.log(`Successfully inserted/updated ${data ? data.length : 0} rows.`);
    res.status(200).json({ message: `File processed successfully. ${data ? data.length : 0} rows inserted/updated.` });

  } catch (err) {
    console.error('Unexpected error during file processing:', err);
    res.status(500).json({ message: `Unexpected server error: ${err.message}` });
  }
});

// Get data (Publicly Accessible - No auth check needed here)
app.get('/data', async (req, res) => {
  try {
    // Fetch all data from the inventory_items table
    const { data, error } = await supabase
      .from('inventory_items') // TODO: Replace with your actual Supabase table name
      .select('*'); // Select all columns defined in the table

    if (error) {
      console.error('Error fetching data from Supabase:', error);
      return res.status(500).json({ message: `Error fetching data: ${error.message}` });
    }

    // Send the data back to the frontend
    res.json(data || []); // Send data or an empty array if null

  } catch (err) {
    console.error('Unexpected error fetching data:', err);
    res.status(500).json({ message: 'Unexpected server error.' });
  }
});

// Start server
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});