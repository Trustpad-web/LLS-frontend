// import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// form
import { useForm } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, CardHeader, Grid, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/system';
// components
import FormProvider from '../../../../../components/hook-form';
import EmptyContent from '../../../../../components/empty-content';

//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutCartProductList from './CheckoutCartProductList';
import CheckoutPaymentInfo from '../CheckoutPaymentInfo';
import BillingInfoSection from './BillingInfoSection';

// ----------------------------------------------------------------------

CheckoutOverview.propTypes = {
  onReset: PropTypes.func,
  checkout: PropTypes.object,
  onBackStep: PropTypes.func,
  onGotoStep: PropTypes.func,
  onNextStep: PropTypes.func,
  onDeleteCart: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CheckoutOverview({
  checkout,
  onReset,
  onNextStep,
  onBackStep,
  onGotoStep,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  const { cart, total, discount, subtotal, shipping, billing, paymentMethodId, paymentMethods } =
    checkout;

  const paymentMethod = paymentMethods.filter((item) => item.id === paymentMethodId)[0];
  const isEmptyCart = !cart.length;

  if (isEmptyCart) onGotoStep(0);

  const defaultValues = {
    delivery: shipping,
    payment: paymentMethodId,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (event) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      onNextStep();
      onReset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, boxShadow: '0 0 2px 0 rgb(100 116 139 / 62%)' }}>
            <CardHeader
              title={
                <>
                  <Typography variant="h6">Order Items</Typography>
                  <Typography variant="body2">List of items you’ve ordered</Typography>
                </>
              }
              sx={{ mb: 3 }}
            />

            {!isEmptyCart ? (
              <CheckoutCartProductList
                products={cart}
                onDelete={onDeleteCart}
                onIncreaseQuantity={onIncreaseQuantity}
                onDecreaseQuantity={onDecreaseQuantity}
              />
            ) : (
              <EmptyContent
                title="Cart is empty"
                description="Look like you have no items in your shopping cart."
                img="/assets/illustrations/illustration_empty_cart.svg"
              />
            )}
          </Card>
          <Stack
            gap={4}
            width="100%"
            justifyContent="space-between"
            sx={{
              display: { xs: 'flex', sm: 'none', md: 'flex' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <CheckoutPaymentInfo
              enableEdit
              onEdit={onBackStep}
              paymentMethod={paymentMethod}
              sx={{ width: '100%' }}
            />
            <CheckoutSummary
              enableEdit
              total={total}
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              onEdit={() => onGotoStep(0)}
              sx={{ width: '100%' }}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack flexDirection="row" gap={2}>
            <Stack
              flexDirection="column"
              gap={2}
              width="100%"
              justifyContent="start"
              sx={{ display: { xs: 'none', sm: 'flex', md: 'none' } }}
            >
              <CheckoutPaymentInfo
                enableEdit
                onEdit={onBackStep}
                paymentMethod={paymentMethod}
                sx={{ width: '100%' }}
              />
              <CheckoutSummary
                enableEdit
                total={total}
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                onEdit={() => onGotoStep(0)}
                sx={{ width: '100%' }}
              />
            </Stack>
            <Stack spacing={4} width="100%">
              <BillingInfoSection onEdit={() => onGotoStep(1)} billing={billing} />
              <Stack spacing={2}>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  onClick={() => onGotoStep(0)}
                  sx={{
                    color: '#0F172A',
                    borderRadius: 6,
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  Edit
                </Button>
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={isEmptyCart}
                  loading={isSubmitting}
                  sx={{
                    backgroundColor: '#0F172A',
                    color: 'white',
                    borderRadius: 6,
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  Complete Order
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
