import { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/system';
import { Container, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hook
import FormProvider from '../../components/hook-form';
// sections
import { ShopTagFiltered, ShopProductList } from '../../sections/@dashboard/e-commerce/shop';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
// context
import { useSettingsContext } from '../../components/settings';
// componenets
import {
  CaptchaDialog,
  ApplicationStepDialog,
  AcceptInvitationDialog,
  PaymentDialog,
  FixPaymentDialog,
} from '../../components/dialog';
import { CustomAvatar, CustomAvatarGroup } from '../../components/custom-avatar';
import Iconify from '../../components/iconify';
// mock
import _mock from '../../_mock';

// ----------------------------------------------------------------------

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Home() {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { products, checkout } = useSelector((state) => state.product);
  const { open } = useSelector((state) => state.coolstaff);

  const [isCaptchaDialog, setIsCaptchaDialog] = useState(true);
  const [isCompleteDialog, setIsCompleteDialog] = useState(false);
  const [isInvitationDialog, setIsInvitationDialog] = useState(false);
  const [isPaymentDialog, setIsPaymentDialog] = useState(false);
  const [isFixPaymentDialog, setIsFixPaymentDialog] = useState(false);

  const [refreshLoading, setRefreshLoading] = useState(false);
  const [loadingButtonHide, setLoadingButtonHide] = useState(false);

  const onSetLoadingButtonHide = async () => {
    setLoadingButtonHide(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoadingButtonHide(false);
  };

  const refresh = async () => {
    setRefreshLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSetLoadingButtonHide();
    setRefreshLoading(false);
  };

  const handleCaptchaDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsCaptchaDialog(!isCaptchaDialog);
  };

  const handleCompleteDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsCompleteDialog(!isCompleteDialog);
  };

  const handleInvitationDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsInvitationDialog(!isInvitationDialog);
  };

  const handlePaymentDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsPaymentDialog(!isPaymentDialog);
  };

  const handleFixPaymentDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsFixPaymentDialog(!isFixPaymentDialog);
  };

  useEffect(() => {
    if (!open && !isCaptchaDialog) setIsCompleteDialog(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isCaptchaDialog]);

  const defaultValues = {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: [0, 200],
    rating: '',
    sortBy: 'featured',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  const isDefault =
    (!dirtyFields.gender &&
      !dirtyFields.category &&
      !dirtyFields.colors &&
      !dirtyFields.priceRange &&
      !dirtyFields.rating) ||
    false;

  const values = watch();

  const dataFiltered = applyFilter(products, values);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleResetFilter = () => {
    reset();
  };

  return (
    <>
      <Head>
        <title>Long Story Short | Home</title>
      </Head>

      <FormProvider methods={methods}>
        <Container
          maxWidth={themeStretch ? false : 'lg'}
          sx={{
            width: 'fit-content',
            paddingInline: '0px !important',
            marginRight: {
              xl: 'calc(50vw - 318px) !important',
              lg: 'calc(50vw - 318px) !important',
              md: 'auto',
            },
          }}
        >
          <Stack>
            {!isDefault && (
              <>
                <Typography variant="body2" gutterBottom>
                  <strong>{dataFiltered.length}</strong>
                  &nbsp;Products found
                </Typography>

                <ShopTagFiltered isFiltered={!isDefault} onResetFilter={handleResetFilter} />
              </>
            )}
          </Stack>
          <LoadingButton
            fullWidth
            variant="contained"
            loading={refreshLoading === true}
            startIcon={
              refreshLoading ? (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <></>
              ) : (
                <Iconify icon="ph:arrow-up-bold" sx={{ color: theme.palette.primary.dark }} />
              )
            }
            sx={{
              ...(loadingButtonHide && { display: 'none' }),
              position: 'fixed',
              top: '160px',
              left: 'calc(50vw - 60px)',
              zIndex: 999,
              width: '120px',
              height: '40px',
              borderRadius: 20,
              color: theme.palette.primary.contrastText,
              background: theme.palette.primary.lighter,
              boxShadow: `0px 3px 20px -2px rgba(100, 116, 139, 0.2), 0px 2px 4px 0px rgba(100, 116, 139, 0.14), 0px 1px 5px 0px rgba(100, 116, 139, 0.12)`,
              ':hover': {
                background: theme.palette.primary.light,
                boxShadow: `0px 0px 17px rgb(255 255 255)`,
              },
            }}
            onClick={refresh}
          >
            {refreshLoading ? (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            ) : (
              <CustomAvatarGroup key="medium" size="tiny" max={4}>
                <CustomAvatar key={1} alt="Remy Sharp" src={_mock.image.product(1)} />
                <CustomAvatar key={2} alt="Remy Sharp" src={_mock.image.product(2)} />
                <CustomAvatar key={3} alt="Remy Sharp" src={_mock.image.product(5)} />
                <CustomAvatar key={4} alt="Remy Sharp" src={_mock.image.product(1)} />
              </CustomAvatarGroup>
            )}
          </LoadingButton>

          <ShopProductList
            products={products}
            loading={(!products.length && isDefault) || refreshLoading}
          />

          <CartWidget totalItems={checkout.totalItems} />
        </Container>
      </FormProvider>
      <CaptchaDialog isOpenDialog={isCaptchaDialog} handleOpenDialog={handleCaptchaDialogOpen} />
      <ApplicationStepDialog
        isOpenDialog={isCompleteDialog}
        handleOpenDialog={handleCompleteDialogOpen}
        handleOpenNextDialog={handleInvitationDialogOpen}
      />
      <AcceptInvitationDialog
        isOpenDialog={isInvitationDialog}
        handleOpenDialog={handleInvitationDialogOpen}
        handleOpenNextDialog={handlePaymentDialogOpen}
        handleOpenPreviewDialog={handleCompleteDialogOpen}
      />
      <PaymentDialog
        isOpenDialog={isPaymentDialog}
        handleOpenDialog={handlePaymentDialogOpen}
        handleOpenNextDialog={handleFixPaymentDialogOpen}
      />
      <FixPaymentDialog
        isOpenDialog={isFixPaymentDialog}
        handleOpenDialog={handleFixPaymentDialogOpen}
        handleOpenNextDialog={handleFixPaymentDialogOpen}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(products, filters) {
  const { gender, category, colors, priceRange, rating, sortBy } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }

  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }

  // FILTER PRODUCTS
  if (gender.length) {
    products = products.filter((product) => gender.includes(product.gender));
  }

  if (category !== 'All') {
    products = products.filter((product) => product.category === category);
  }

  if (colors.length) {
    products = products.filter((product) => product.colors.some((color) => colors.includes(color)));
  }

  if (min !== 0 || max !== 200) {
    products = products.filter((product) => product.price >= min && product.price <= max);
  }

  if (rating) {
    products = products.filter((product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRating > convertRating(rating);
    });
  }

  return products;
}
