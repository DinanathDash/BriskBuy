import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useProductUpload } from '../hooks/useProductUpload';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

const DevPanel = () => {
  const { uploadProducts, uploading } = useProductUpload();

  const handleUpload = async () => {
    const result = await uploadProducts();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-64">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Dev Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleUpload} 
            disabled={uploading}
            size="sm"
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? 'Uploading...' : 'Upload Sample Products'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevPanel;
