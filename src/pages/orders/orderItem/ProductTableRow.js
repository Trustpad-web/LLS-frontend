import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, Typography } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Image from '../../../components/image';

// ----------------------------------------------------------------------

ProductTableRow.propTypes = {
  row: PropTypes.object,
};

export default function ProductTableRow({ row }) {
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          alt="product image"
          src={row && row.cover}
          sx={{ width: 64, height: 64, borderRadius: 2.5, mr: 2 }}
        />

        <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
          {row && row.name}
        </Typography>
      </TableCell>

      <TableCell>Pick Up</TableCell>

      <TableCell sx={{ fontWeight: 700 }}>{fCurrency(row && row.price)}</TableCell>

      <TableCell sx={{ fontWeight: 700 }}>{row && row.quantity}</TableCell>

      <TableCell sx={{ fontWeight: 700 }}>{row && fCurrency(row.price * row.quantity)}</TableCell>
    </TableRow>
  );
}
