import { useContext } from 'react';
import { SearchMedicineContext } from '../context/SearchMedicineContext';

export const useSearchMedicine = () => {
  const context = useContext(SearchMedicineContext);
  
  if (!context) {
    throw new Error('useSearchMedicine يجب استخدامه داخل SearchMedicineProvider');
  }
  
  return context;
};
