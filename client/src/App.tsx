import TickerTable from './components/TickerTable';
import React from 'react';
import { Container } from '@mui/material';

export default function App() {
  return (
    <Container sx = {{alignItems: 'center'}} >
      <TickerTable />
    </Container>
    
  );
}
