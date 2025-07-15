import { useState } from 'react';
import { uploadProductsToFirebase } from '../Utils/uploadProducts';

export const useProductUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadProducts = async () => {
    setUploading(true);
    try {
      const result = await uploadProductsToFirebase();
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setUploading(false);
    }
  };

  return { uploadProducts, uploading };
};
