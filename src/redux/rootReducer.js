import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';
import counterReducer from './slices/counterSlice'; // Import the counter slice's reducer

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter'], // Only persist the counter slice
};

// Combine reducers
const rootReducer = combineReducers({
  counter: counterReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
