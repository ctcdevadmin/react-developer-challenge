import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStocks = createAsyncThunk(
    'api/stocks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo') 
            return response?.data
        } catch (error: any) {
            console.log(error?.message);
            return rejectWithValue(error?.message)
        }
    }
)

interface InitialState {
    loading: boolean,
    stocks: any,
    error: string
}


const initialState: InitialState = {
    loading: false,
    stocks: {},
    error: ''
}

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getStocks.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getStocks.fulfilled, (state, action) => {
            state.loading = false
            state.stocks = action.payload
        })
        builder.addCase(getStocks.rejected, (state, action) => {
            state.loading = false
            state.stocks = null
            state.error = action.payload as string
        })
    },
})

export default stockSlice.reducer;
