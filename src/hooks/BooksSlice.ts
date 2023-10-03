import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Book = {
    id: number;
    title: string;
    author: string;
    description: string;
};

type BooksState = {
    books: Book[];
    loading: boolean;
    error: string | null;
};

const initialState: BooksState = {
    books: [],
    loading: false,
    error: null,
};

export const fetchBooks = createAsyncThunk<Book[], string>(
    'books/fetchBooks',
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}book`, {
            withCredentials: true,
          });
        return response.data;
    }
);

export const addBook = createAsyncThunk<Book, Omit<Book, 'id'>>(
    'books/addBook',
    async (book: Omit<Book, 'id'>) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}book`, book, {
            withCredentials: true,
          });
        return response.data;
    }
);

export const updateBook = createAsyncThunk(
    'books/updateBook',
    async (book: Book) => {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}book`, book, {
            withCredentials: true,
        });
        return response.data;
    }
);

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async (bookId: { id: number }) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}book`, {
            data: bookId,
            withCredentials: true,
        });
        return bookId.id;  
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.loading = false;
                state.books.push(action.payload);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.loading = false;
                const index = state.books.findIndex(book => book.id === action.payload.id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.books = state.books.filter(book => book.id !== action.payload); // remove the deleted book by ID
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            });
    } 

});

export default booksSlice.reducer;
