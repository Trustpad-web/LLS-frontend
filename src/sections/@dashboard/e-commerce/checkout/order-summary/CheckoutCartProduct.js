import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Divider, Typography, Link } from '@mui/material';
// utils
import { fCurrency } from '../../../../../utils/formatNumber';
// components
import Image from '../../../../../components/image';
import { IncrementerButton } from '../../../../../components/custom-input';

// ----------------------------------------------------------------------

CheckoutCartProduct.propTypes = {
  row: PropTypes.object,
  onDelete: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
};

export default function CheckoutCartProduct({ row, onDelete, onDecrease, onIncrease }) {
  const { name, price, cover, quantity, available } = row;

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        mx: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Image
          alt="product image"
          src={cover}
          sx={{
            width: { xs: 120, sm: 140, md: 140, lg: 172, xl: 172 },
            height: { xs: 120, sm: 140, md: 140, lg: 172, xl: 172 },
            borderRadius: 1.5,
            mr: 2,
          }}
        />

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 1, sm: 1, md: 1, lg: 2, xl: 2 },
            flex: 1,
          }}
        >
          <Typography
            noWrap
            variant="subtitle1"
            sx={{
              fontSize: 20,
              fontWeight: 600,
              maxWidth: { xs: 200, sm: 200, md: 220, lg: 260, xl: 260 },
            }}
          >
            {name}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Link sx={{ fontSize: 14, fontWeight: 500, color: '#0F172A', cursor: 'pointer' }}>
              Add to favorites
            </Link>
            <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
            <Link
              onClick={onDelete}
              sx={{ fontSize: 14, fontWeight: 500, color: '#EF4444', cursor: 'pointer' }}
            >
              Remove
            </Link>
          </Stack>

          <Stack
            flex
            flexDirection="row"
            justifyContent="space-between"
            gap={1}
            alignItems="center"
            sx={{
              display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
            }}
          >
            <Box
              sx={{
                width: 96,
                textAlign: 'right',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <IncrementerButton
                quantity={quantity}
                onDecrease={onDecrease}
                onIncrease={onIncrease}
                disabledDecrease={quantity <= 1}
                disabledIncrease={quantity >= available}
              />

              {/* <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                available: {available}
              </Typography> */}
            </Box>

            <Box align="right" sx={{ fontSize: 24, fontWeight: 300 }}>
              {fCurrency(price * quantity)}
            </Box>

            {/* <Box align="right">
              <Tooltip title="Remove this item from the cart">
                <IconButton onClick={onDelete}>
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooltip>
            </Box> */}
          </Stack>
        </Stack>
      </Box>

      <Stack
        gap={4}
        alignItems="start"
        sx={{
          width: '400px',
          display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' },
          flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
        }}
      >
        {/* <Box>{fCurrency(price)}</Box> */}

        <Box
          sx={{
            width: 96,
            textAlign: 'right',
            display: 'block',
          }}
        >
          <IncrementerButton
            quantity={quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={quantity <= 1}
            disabledIncrease={quantity >= available}
          />

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            available: {available}
          </Typography>
        </Box>

        <Box align="right" sx={{ fontSize: 24, fontWeight: 300 }}>
          {fCurrency(price * quantity)}
        </Box>

        {/* <Box align="right">
          <Tooltip title="Remove this item from the cart">
            <IconButton onClick={onDelete}>
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Tooltip>
        </Box> */}
      </Stack>
    </Stack>
  );
}
