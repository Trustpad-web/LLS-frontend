import PropTypes from 'prop-types';
// @mui
import { Divider, Stack, Typography } from '@mui/material';
import Image from '../../../components/image';
// utils
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

ProductListCard.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductListCard({ products }) {
  return (
    <Stack>
      <Divider sx={{ mx: 2, mt: 2, mb: 1 }} />
      {products && products.map((row) => <ProductItemCard key={row.id} row={row} />)}
    </Stack>
  );
}

// ------------------------------------------------------------------------

ProductItemCard.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    cover: PropTypes.string,
    quantity: PropTypes.number,
  }),
};

export function ProductItemCard({ row }) {
  const { name, price, cover, quantity } = row;

  return (
    <Stack flexDirection="row" gap={2} sx={{ mx: 2, my: 2 }}>
      <Stack width={64}>
        <Image
          alt="product image"
          src={cover}
          sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
        />
      </Stack>

      <Stack flexDirection="column" gap={1}>
        <Stack
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          alignItems="start"
          gap={2}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            Product
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
            {name}
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          alignItems="start"
          gap={2}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            Price Per Unit
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
            {fCurrency(price)}
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          alignItems="start"
          gap={2}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            Quantity
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
            {quantity}
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          alignItems="start"
          gap={2}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            Shipping Method
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
            Pick Up
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
