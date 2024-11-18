import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { getRecords, deleteRecord } from '../api';

const RecordsHistory = () => {
  const [records, setRecords] = useState([]);
  const [operations, setOperations] = useState([]);
  const [filters, setFilters] = useState({
    operation_name: '',
    start_date: '',
    end_date: '',
    limit: 10,
    offset: 0,
    order_by: '',
    order_dir: '',
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

  const fetchOperations = useCallback(async () => {
    try {
      const response = await fetch(`${baseURL}/operations`);
      const data = await response.json();
      setOperations(data.operations || []);
    } catch (error) {
      setErrorMessage('Failed to load operations');
      console.error('Failed to fetch operations', error);
    }
  }, []);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await getRecords(filters);
      setRecords(response.data.records || []);
      setTotalRecords(response.data.total_records || 0);
    } catch (error) {
      setErrorMessage('Failed to load records');
      console.error('Failed to fetch records', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchOperations();
  }, [fetchOperations]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleDelete = async (recordId) => {
    try {
      await deleteRecord(recordId);
      fetchRecords();
    } catch (error) {
      setErrorMessage('Failed to delete record');
      console.error('Failed to delete record', error);
    }
  };

  const handlePaginationChange = (event, page) => {
    setFilters((prev) => ({
      ...prev,
      offset: page * filters.limit,
    }));
  };

  const handleLimitChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      offset: 0,
    }));
  };

  const handleSort = (column) => {
    setFilters((prev) => ({
      ...prev,
      order_by: column,
      order_dir: prev.order_by === column && prev.order_dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Records History
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Operation</InputLabel>
            <Select
              value={filters.operation_name}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, operation_name: e.target.value }))
              }
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {operations.map((operation) => (
                <MenuItem key={operation.Type} value={operation.Type}>
                  {operation.Type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.start_date}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, start_date: e.target.value }))
            }
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.end_date}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, end_date: e.target.value }))
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={fetchRecords}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Apply Filters'}
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={filters.order_by === 'id'}
                  direction={filters.order_dir}
                  onClick={() => handleSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.order_by === 'operation_name'}
                  direction={filters.order_dir}
                  onClick={() => handleSort('operation_name')}
                >
                  Operation
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.order_by === 'amount'}
                  direction={filters.order_dir}
                  onClick={() => handleSort('amount')}
                >
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.order_by === 'user_balance'}
                  direction={filters.order_dir}
                  onClick={() => handleSort('user_balance')}
                >
                  User Balance
                </TableSortLabel>
              </TableCell>
              <TableCell>Response</TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.order_by === 'date'}
                  direction={filters.order_dir}
                  onClick={() => handleSort('date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.operation_name}</TableCell>
                <TableCell>{record.amount}</TableCell>
                <TableCell>{record.user_balance}</TableCell>
                <TableCell>{record.operation_response}</TableCell>
                <TableCell>{new Date(record.date).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalRecords}
        page={Math.floor(filters.offset / filters.limit)}
        onPageChange={handlePaginationChange}
        rowsPerPage={filters.limit}
        onRowsPerPageChange={handleLimitChange}
      />
    </Box>
  );
};

export default RecordsHistory;
