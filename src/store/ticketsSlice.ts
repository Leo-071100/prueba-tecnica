import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTickets, updateTicketStatus } from '../api/ticketsApi';

export type TicketStatus = 'open' | 'in_progress' | 'resolved';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: TicketStatus;
  assignee: string;
}

interface TicketsState {
  items: Ticket[];
  loading: boolean;
  error: string | null;
  selectedStatus: TicketStatus | 'all';
}

const initialState: TicketsState = {
  items: [],
  loading: false,
  error: null,
  selectedStatus: 'all',
};

export const loadTickets = createAsyncThunk('tickets/load', async () => {
  return await fetchTickets();
});

export const changeTicketStatus = createAsyncThunk(
  'tickets/changeStatus',
  async ({ id, status }: { id: number; status: TicketStatus }) => {
    return await updateTicketStatus(id, status);
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setSelectedStatus(state, action: PayloadAction<TicketStatus | 'all'>) {
      state.selectedStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadTickets.rejected, (state) => {
        state.loading = false;
        state.error = 'No fue posible cargar los tickets';
      })
      .addCase(changeTicketStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { setSelectedStatus } = ticketsSlice.actions;
export default ticketsSlice.reducer;
