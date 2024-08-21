import { useState } from 'react';
// @mui
import { Grid, Box } from '@mui/material';
import { useTheme } from '@mui/system';
// components
import ShippingAddress from './ShippingAddress';
import PaymentMethods from './PaymentMethods';
import DeliveryInfo from './DeliveryInfo';
import { CheckoutBillingNewAddressForm } from '../../../../sections/@dashboard/e-commerce/checkout';
import { PaymentNew } from '../../../../sections/payment';

export default function BillingAndShippingInfo() {
  const [isOpenShippingAddress, setIsOpenShippingAddress] = useState(false);
  const [isOpenPaymentMethod, setIsOpenPaymentMethod] = useState(false);

  const theme = useTheme();

  const handleCreateBilling = () => {
    setIsOpenShippingAddress(false);
  };

  const handleCreatePaymentMethod = () => {
    setIsOpenPaymentMethod(false);
  };

  const handleClose = () => {
    setIsOpenShippingAddress(false);
    setIsOpenPaymentMethod(false);
  };

  return (
    <Box
      sx={{
        padding: { sm: '24px 64px', xs: '24px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        maxWidth: { xl: '784px', xs: '100%' },
        width: '100%',
        color: theme.palette.primary.contrastText,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {isOpenShippingAddress || isOpenPaymentMethod ? (
            <>
              {isOpenShippingAddress && (
                <CheckoutBillingNewAddressForm
                  isNew
                  onClose={handleClose}
                  onCreateBilling={handleCreateBilling}
                />
              )}
              {isOpenPaymentMethod && (
                <PaymentNew
                  onClose={handleClose}
                  onCreatPaymentMethod={handleCreatePaymentMethod}
                />
              )}
            </>
          ) : (
            <>
              <ShippingAddress
                onOpen={() => {
                  setIsOpenShippingAddress(true);
                }}
              />
              <PaymentMethods
                onOpen={() => {
                  setIsOpenPaymentMethod(true);
                }}
              />
              <DeliveryInfo />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
