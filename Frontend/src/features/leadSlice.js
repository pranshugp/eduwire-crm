import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

// Thunks for async actions

// Admin only
export const fetchAllLeads = createAsyncThunk('leads/fetchAll', async () => {
  const res = await axios.get('/leads');
  return res.data;
});

// Counsellor only
export const fetchMyLeads = createAsyncThunk('leads/fetchMine', async () => {
  const res = await axios.get('/leads/mine');
  return res.data;
});

// Admin & Counsellor
export const createLead = createAsyncThunk('leads/create', async (leadData) => {
  const res = await axios.post('/leads', leadData);
  return res.data;
});

// Admin & Counsellor
export const updateLead = createAsyncThunk('leads/update', async ({ id, data }) => {
  const res = await axios.put(`/leads/${id}`, data);
  return res.data;
});

// Admin & Counsellor
export const getLeadById = createAsyncThunk('leads/leadbyid', async ({ id, data }) => {
  const res = await axios.get(`/leads/${id}`, data);
  return res.data;
});

// Admin & Counsellor
export const addFollowUp = createAsyncThunk('leads/addFollowUp', async ({ id, followUp }) => {
  const res = await axios.put(`/${id}/follow-up`, followUp);
  return res.data;
});

// Student only
export const requestLeadEdit = createAsyncThunk('leads/requestEdit', async ({ id, request }) => {
  const res = await axios.put(`/${id}/request-edit`, request);
  return res.data;
});

// Admin only
export const exportCSV = createAsyncThunk('leads/exportCSV', async () => {
  const res = await axios.get('/export/csv');
  return res.data;
});

const leadSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLeadState: (state) => {
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchAllLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchMyLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchMyLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createLead.fulfilled, (state, action) => {
        state.leads.push(action.payload);
      })

      .addCase(updateLead.fulfilled, (state, action) => {
        const index = state.leads.findIndex(lead => lead._id === action.payload._id);
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })

      .addCase(addFollowUp.fulfilled, (state, action) => {
        const index = state.leads.findIndex(lead => lead._id === action.payload._id);
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })

      .addCase(requestLeadEdit.fulfilled, (state, action) => {
        const index = state.leads.findIndex(lead => lead._id === action.payload._id);
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })

      .addCase(exportCSV.fulfilled, (state) => {
        // CSV export logic handled on backend. Optionally handle confirmation message.
      });
  }
});

export const { clearLeadState } = leadSlice.actions;
export default leadSlice.reducer;
