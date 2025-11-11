import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Box, Button, Container, Typography, TextField, Paper, Grid, FormControlLabel,
  Checkbox, Modal, Table, TableBody, TableCell, TableContainer,TableRow,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from '../context/AuthContext';

// Define the columns based on the new schema
const columnsConfig = [
  { field: 'ItemID', headerName: 'Item ID', width: 100 },
  { field: 'OrderID', headerName: 'Order ID', width: 120 },
  { field: 'ItemName', headerName: 'Item Name', width: 200 },
  { field: 'Barcode', headerName: 'Barcode', width: 150 },
  { field: 'Status', headerName: 'Status', width: 100 },
  { field: 'Received', headerName: 'Received', width: 100, type: 'boolean' }, // Specify boolean type for rendering
  { field: 'Count', headerName: 'Count', width: 80, type: 'number' },
];

const DataTable = () => {
  const [data, setData] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showColumnOptions, setShowColumnOptions] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableRow, setEditableRow] = useState(null);

  const { isAdmin, session } = useAuth(); // Removed unused 'user'
  const columns = useMemo(() => columnsConfig, []);

 useEffect(() => {
  // Load saved column preferences
  const savedPreferences = localStorage.getItem('columnPreferences');
  let initialVisibility = {};
  const currentFields = columns.map(col => col.field);

  if (savedPreferences) {
    try {
      initialVisibility = JSON.parse(savedPreferences);
      // Validate saved preferences against current columns
      currentFields.forEach(field => {
        if (initialVisibility[field] === undefined) {
          initialVisibility[field] = true; // Default new columns to visible
        }
      });
      // Remove stale keys from visibility state
      Object.keys(initialVisibility).forEach(key => {
        if (!currentFields.includes(key)) {
          delete initialVisibility[key];
        }
      });
    } catch (e) {
      console.error("Failed to parse/validate column preferences:", e);
      // Fallback to default visibility (all true)
      currentFields.forEach(field => {
        initialVisibility[field] = true;
      });
    }
  } else {
    // Default visibility (all true)
    currentFields.forEach(field => {
      initialVisibility[field] = true;
    });
  }
  setVisibleColumns(initialVisibility);
}, [columns]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3006/data');
      const responseData = Array.isArray(response.data) ? response.data : [];
      setData(responseData.map((row) => ({ ...row, id: row.ItemID })));
      setFilteredData(responseData.map((row) => ({ ...row, id: row.ItemID })));
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
      setFilteredData([]);
    }
  };
  fetchData();
}, []);


const handleSearch = () => {
  if (!searchTerm.trim()) {
    setFilteredData(data.map((row) => ({ ...row, id: row.ItemID })));
    return;
  }
  const terms = searchTerm.toLowerCase().split(' ').filter(term => term);
  const filtered = data.filter((row) =>
    terms.every((term) =>
      columns
        .filter(col => visibleColumns[col.field])
        .some((col) => {
          const value = row[col.field];
          return value !== null && value !== undefined &&
                 value.toString().toLowerCase().includes(term);
        })
    )
  );
  setFilteredData(filtered.map((row) => ({ ...row, id: row.ItemID })));
};

const handleRowClick = (row) => {
  if (!isAdmin) return; // Extra check
    setSelectedRow(row);
    setEditableRow({ ...row });
    setIsModalOpen(true); // Open modal only after setting state
  };

const closeModal = () => {
  setIsModalOpen(false);
  setIsEditMode(false); // Reset edit mode on close
  // No need to clear selectedRow/editableRow here, they get set on next click
};

const handleCheckboxChange = (field) => {
  setVisibleColumns((prev) => {
    const updated = { ...prev, [field]: !prev[field] };
    localStorage.setItem('columnPreferences', JSON.stringify(updated));
    return updated;
  });
};

const handleEditChange = (key, value) => {
  // Ensure editableRow is not null before updating
  setEditableRow((prev) => (prev ? { ...prev, [key]: value } : null));
};


const saveEdits = async () => {
  if (!editableRow || !editableRow.ItemID || !session) {
    console.error("Cannot save edits, missing data or user session.");
    return;
  }
  try {
    const token = session.access_token;
    await axios.put(
      'http://localhost:3006/update-row',
      editableRow,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    );
    const updateItem = (prevData) =>
      prevData.map((item) =>
        item.ItemID === editableRow.ItemID ? { ...editableRow, id: editableRow.ItemID } : item
      );
    setData(updateItem);
    setFilteredData(updateItem);
    closeModal(); // Close modal on successful save
  } catch (error) {
    console.error('Error saving edits:', error);
    // TODO: Add user-friendly error notification
  }
};

 return (
  <Container maxWidth="lg">
    <Box py={4}>
      <Typography variant="h4" gutterBottom align="center">
        Inventory Management Table
      </Typography>
      <Box display="flex" mb={2}>
        <TextField
          fullWidth
          placeholder="Search across visible columns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
          onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box mb={2} textAlign="left">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowColumnOptions(!showColumnOptions)}
        >
          Adjust Columns
        </Button>
      </Box>
      {showColumnOptions && (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Select Columns</Typography>
          <Grid container spacing={1}>
            {columns.map((column) => (
              <Grid item xs={6} sm={4} md={3} key={column.field}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!visibleColumns[column.field]}
                      onChange={() => handleCheckboxChange(column.field)}
                    />
                  }
                  label={column.headerName}
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={2} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowColumnOptions(false)}
            >
              Done
            </Button>
          </Box>
        </Paper>
      )}
      <DataGrid
        rows={filteredData}
        columns={columns.filter((col) => visibleColumns[col.field])}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
        autoHeight
        getRowId={(row) => row.ItemID}
        onRowClick={(params) => handleRowClick(params.row)} // handleRowClick now checks isAdmin
        sx={{
          '& .MuiDataGrid-row:not(:hover)': {
            cursor: isAdmin ? 'pointer' : 'default',
          },
          '& .MuiDataGrid-row:hover': {
            cursor: isAdmin ? 'pointer' : 'default',
            backgroundColor: isAdmin ? 'action.hover' : 'inherit',
          },
        }}
      />

      {/* Modal only renders its content when selectedRow is set */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            maxHeight: '80vh',
            overflow: 'auto',
          }}
        >
          <Typography variant="h5" gutterBottom>
            {isEditMode ? 'Edit Item Details' : 'Item Details'}
          </Typography>
          {selectedRow && (
             <TableContainer>
               <Table size="small">
                 <TableBody>
                   {columnsConfig.map(({ field, headerName }) => (
                     <TableRow key={field}>
                       <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>{headerName}</TableCell>
                       <TableCell>
                        {isEditMode ? (
                             <TextField
                               disabled={field === 'ItemID'}
                               value={editableRow ? editableRow[field] ?? '' : ''} // Safely access editableRow
                               onChange={(e) => handleEditChange(field, e.target.value)}
                               fullWidth
                               variant="outlined"
                               size="small"
                               type={columns.find(c => c.field === field)?.type === 'number' ? 'number' : 'text'} // Basic type handling
                             />
                           ) : (
                             // Display formatting for boolean
                             typeof selectedRow[field] === 'boolean'
                               ? selectedRow[field] ? 'Yes' : 'No'
                               : selectedRow[field] ?? 'N/A'
                           )}
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
           )}
          <Box textAlign="right" mt={2}>
            {isAdmin && !isEditMode && (
               <Button
                 variant="contained"
                 color="secondary"
                 onClick={() => setIsEditMode(true)} // Switch to edit mode
                 disabled={!selectedRow} // Disable if no row selected (belt-and-suspenders)
               >
                 Edit
               </Button>
             )}
             {isAdmin && isEditMode && (
               <>
                 <Button
                   variant="contained"
                   color="primary"
                   onClick={saveEdits}
                   sx={{ mr: 1 }}
                   disabled={!editableRow} // Disable if editableRow is null
                 >
                   Save
                 </Button>
                 <Button
                   variant="outlined"
                   color="secondary"
                   onClick={() => setIsEditMode(false)} // Cancel edit mode
                 >
                   Cancel
                 </Button>
               </>
             )}
            <Button
              variant="contained"
              color="default"
              onClick={closeModal}
              sx={{ ml: 2 }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  </Container>
  );

  };
  export default DataTable;
  
  