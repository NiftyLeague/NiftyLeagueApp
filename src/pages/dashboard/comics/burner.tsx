import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ComicsBurner = () => {
  const navigate = useNavigate();
  const handleReturnPage = () => navigate('/dashboard/items');
  return (
    <>
      <Button
        variant="contained"
        sx={{ height: 28 }}
        onClick={handleReturnPage}
      >
        ← Back to Comics &amp; Wearables
      </Button>
      <Box sx={{ mt: 5, p: 2, border: '1px dashed grey' }}>
        <div></div>
      </Box>
    </>
  );
};

export default ComicsBurner;
