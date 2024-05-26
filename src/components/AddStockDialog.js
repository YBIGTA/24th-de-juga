import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AddStockDialog({ open, onClose, onAdd, stockName, stockCode }) {
  // const [stockCode, setStockCode] = useState('');
  const [investment, setInvestment] = useState('');

  const handleAddStock = () => {
    // Validation here if needed
    onAdd(stockCode, investment);
    setInvestment('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{stockName} ({stockCode}) 추가</DialogTitle>
      <DialogContent>
        {/*<DialogContentText>*/}
        {/*  투자한 금액을 입력해주세요.*/}
        {/*</DialogContentText>*/}

        <TextField
          margin="dense"
          id="investment"
          label="투자금액 (원)"
          type="number"
          fullWidth
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleAddStock}>추가</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddStockDialog;
