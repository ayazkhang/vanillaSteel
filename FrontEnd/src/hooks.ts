import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';

// Custom hook to use the typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
