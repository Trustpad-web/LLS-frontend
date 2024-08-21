import PropTypes from 'prop-types';
import sum from 'lodash/sum';
// @mui
import { Grid, Card, Button, CardHeader, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/system';
// components
import EmptyContent from '../../../components/empty-content';
import Label from '../../../components/label';
import ProductListTable from './ProductListTable';
import ProductListCard from './ProductListCard';
// hook
import useResponsive from '../../../hooks/useResponsive';

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  checkout: PropTypes.object.isRequired,
  onNextStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function OrderItem({
  checkout,
  onNextStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  // const { cart, total, discount, subtotal } = checkout;

  const theme = useTheme();

  const totalItems = sum(
    checkout && checkout.cart ? checkout.cart.map((item) => item.quantity) : [0]
  );

  const isMobile = useResponsive('down', 'sm');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ mb: 3, boxShadow: '0 0 2px 0 rgb(100 116 139 / 62%)', width: '100%' }}>
          <CardHeader
            title={
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  gap={2}
                  sx={{ width: '100%', justifyContent: { xs: 'space-between', sm: 'start' } }}
                >
                  <Typography variant="h4">Order ID: #123456789</Typography>
                  <Label color="success" variant="outlined" sx={{ borderRadius: 20, padding: 2 }}>
                    Delivered
                  </Label>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap={2}
                    sx={{ display: { xs: 'none', md: 'flex' }, width: 'max-content' }}
                  >
                    <Typography variant="h4">$ 500,000</Typography>
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      Total Items:
                      <Typography
                        component="span"
                        sx={{ color: 'text.secondary', fontWeight: 700 }}
                      >
                        &nbsp;{totalItems}
                      </Typography>
                    </Typography>
                  </Stack>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{
                      borderRadius: 6,
                      fontSize: 16,
                      fontWeight: 400,
                      color: theme.palette.primary.contrastText,
                      padding: '12px 16px',
                      minWidth: '140px',
                      display: { xs: 'none', sm: 'flex' },
                    }}
                  >
                    Cancel Order
                  </Button>
                </Stack>
              </Stack>
            }
            subheader={
              <Stack
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                sx={{ gap: { xs: 1, sm: '12px' } }}
              >
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                  sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}
                >
                  <Typography component="span" sx={{ color: 'text.secondary' }}>
                    Total Items:
                    <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                      &nbsp;{totalItems}
                    </Typography>
                  </Typography>
                  <Typography variant="h4">$500,000</Typography>
                </Stack>
                <Stack
                  alignItems="center"
                  gap={1}
                  sx={{
                    width: '100%',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                    sx={{ justifyContent: { xs: 'space-between', sm: 'start' } }}
                  >
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      Placed On:
                    </Typography>
                    <Typography component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
                      &nbsp;09-26-2023
                    </Typography>
                  </Stack>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="start"
                    width="100%"
                    sx={{ justifyContent: { xs: 'space-between', sm: 'end' } }}
                  >
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      Arrive In:
                    </Typography>
                    <Typography component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
                      &nbsp;Today
                    </Typography>
                  </Stack>
                </Stack>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{
                    borderRadius: 6,
                    fontSize: 16,
                    fontWeight: 400,
                    color: theme.palette.primary.contrastText,
                    padding: '12px 16px',
                    minWidth: '140px',
                    width: '100%',
                    display: { xs: 'flex', sm: 'none' },
                  }}
                >
                  Cancel Order
                </Button>
              </Stack>
            }
            sx={{ pt: { xs: 2, sm: 4 }, px: { xs: 2, sm: 4 } }}
          />

          {
            // eslint-disable-next-line no-nested-ternary
            checkout && checkout.cart && checkout.cart.length > 0 ? (
              isMobile ? (
                <ProductListCard products={checkout.cart} />
              ) : (
                <ProductListTable products={checkout.cart} />
              )
            ) : (
              <EmptyContent
                title="Cart is empty"
                description="Look like you have no items in your shopping cart."
                img="/assets/illustrations/illustration_empty_cart.svg"
              />
            )
          }
        </Card>
      </Grid>
    </Grid>
  );
}
