import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Typography, Box
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TableStage = ({ data, title }) => {
  // Function to convert table to text and copy
  const handleCopy = () => {
    const headers = [
      'Stage',
      'Came to Stage',
      'Lost / Disqualified',
      'Moved to next stage',
      'Win Rate %',
    ];

    const rows = data.map(row => {
      const isTotalRow = row.stage.toLowerCase() === 'total';
      const isWonRow = row.stage.toLowerCase() === 'won';

      const get = val => (val !== undefined && val !== null ? val : '-');

      return [
        row.stage,
        isTotalRow ? '-' : get(row.comeToStage),
        isTotalRow
          ? get(row.lostOrDisqualified)
          : isWonRow
          ? '-'
          : get(row.lostOrDisqualified),
        isTotalRow || isWonRow ? '-' : get(row.movedToNext),
        isTotalRow ? '-' : `${get(row.winRatePercent)}%`,
      ].join('\t'); // Tab separated for clean pasting into Excel
    });

    const tableString = [headers.join('\t'), ...rows].join('\n');

    navigator.clipboard.writeText(tableString).then(() => {
      alert('Table copied to clipboard!');
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* Title and Copy Icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={handleCopy} size="small">
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Table container */}
      <TableContainer component={Paper}>
        <Table
          size="small"
          sx={{
            borderCollapse: 'collapse',
            '& td, & th': {
              border: '1px solid #ddd',
            },
          }}
        >
          {/* Table headers */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Stage</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Came to Stage</TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: '#f57c00',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Lost / Disqualified
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: '#2e7d32',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Moved to next stage
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Win Rate %</TableCell>
            </TableRow>
          </TableHead>

          {/* Table body */}
          <TableBody>
            {data.map((row, idx) => {
              const isTotalRow = row.stage.toLowerCase() === 'total';
              const isWonRow = row.stage.toLowerCase() === 'won';

              return (
                <TableRow
                  key={row.stage}
                  sx={{
                    backgroundColor: idx % 2 === 1 ? '#f9f9f9' : 'white',
                  }}
                >
                  <TableCell sx={{ fontWeight: isTotalRow ? 'bold' : 'normal' }}>
                    {row.stage}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: isTotalRow || isWonRow ? 'bold' : 'normal',
                      backgroundColor: isWonRow ? '#2e7d32' : 'inherit',
                      color: isWonRow ? 'white' : 'inherit',
                    }}
                  >
                    {isTotalRow ? '-' : row.comeToStage?.toLocaleString() ?? '-'}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{ fontWeight: isTotalRow ? 'bold' : 'normal' }}
                  >
                    {isTotalRow
                      ? row.lostOrDisqualified?.toLocaleString() ?? '-'
                      : isWonRow
                      ? '-'
                      : row.lostOrDisqualified?.toLocaleString() ?? '-'}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{ fontWeight: isTotalRow ? 'bold' : 'normal' }}
                  >
                    {isTotalRow || isWonRow
                      ? '-'
                      : row.movedToNext?.toLocaleString() ?? '-'}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{ fontWeight: isTotalRow ? 'bold' : 'normal' }}
                  >
                    {isTotalRow ? '-' : `${row.winRatePercent ?? '-'}%`}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableStage;
