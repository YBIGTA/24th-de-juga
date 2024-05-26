import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import {Button} from "@mui/material";
import {useSelector} from "react-redux";


export function StockTable() {
  const stocks = useSelector((state) => state.stocks.selectedStocks);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (stocks && Array.isArray(stocks)) {
      const updatedRows = stocks.map((stock, index) => ({
        id: index,
        name: `${stock.name} (${stock.code})`,
        investment: stock.investment || 'N/A', // 투자금액이 없으면 'N/A'로 표시
      }));
      setRows(updatedRows);
    }
  }, [stocks]);

  const columns = [
    { width: 120, label: '종목명', dataKey: 'name' },
    { width: 80, label: '투자금액 (원)', dataKey: 'investment' },
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const rowContent = (index, row) => (
    <React.Fragment>
      <TableCell key="name" align="center">
        {row.name}
      </TableCell>
      <TableCell key="investment" align="center">
        {row.investment}
      </TableCell>
    </React.Fragment>
  );

  return (
    <Paper style={{ height: 320, width: 300 }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}


