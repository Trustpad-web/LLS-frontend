import React, { useEffect } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCart, deleteCart } from '../../../redux/slices/product';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { SettingsNavPopover } from '../../../layouts/dashboard/subNav';
// hook
import useResponsive from '../../../hooks/useResponsive';
import LikedItemList from './likedItemList/LikedItemList';
// section
import CartWidget from '../../../sections/@dashboard/e-commerce/CartWidget';

// ----------------------------------------------------------------------

LikedItem.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function LikedItem() {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const { cart } = checkout;

  useEffect(() => {
    dispatch(getCart(cart));
  }, [dispatch, cart]);

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');

  return (
    <>
      <Head>
        <title>Long Story Short | Settings - Liked Item</title>
      </Head>
      {(isDesktopL || isDesktopN) && <SettingsNavPopover />}
      <Container sx={{ width: '100%', margin: '0px !important', padding: '0px !important' }}>
        <Box
          sx={{
            padding: { sm: '24px 64px', xs: '24px' },
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            maxWidth: { lg: '954px', xs: '100%' },
            width: '100%',
            // color: theme.palette.primary.contrastText,
          }}
        >
          <LikedItemList products={cart} onDelete={handleDeleteCart} />
        </Box>
      </Container>
      <CartWidget totalItems={checkout.totalItems} />
    </>
  );
}

// ----------------------------------------------------------------------
