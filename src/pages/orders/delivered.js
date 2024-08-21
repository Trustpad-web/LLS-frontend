import { useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
// import { PATH_PAGE } from '../../routes/paths';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import FormProvider from '../../components/hook-form';
import { OrderNavPopover } from '../../layouts/dashboard/subNav';
// sections
import OrderItem from './orderItem';
// hook
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Orders() {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

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

  // const {
  //   reset,
  //   watch,
  //   formState: { dirtyFields },
  // } = methods;

  // const isDefault =
  //   (!dirtyFields.gender &&
  //     !dirtyFields.category &&
  //     !dirtyFields.colors &&
  //     !dirtyFields.priceRange &&
  //     !dirtyFields.rating) ||
  //   false;

  // const values = watch();

  // const dataFiltered = applyFilter(products, values);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');

  return (
    <>
      <Head>
        <title>Long Story Short | Orders - delivered</title>
      </Head>
      {(isDesktopL || isDesktopN) && <OrderNavPopover />}
      <FormProvider methods={methods}>
        <Container>
          {/* <ShopProductList products={dataFiltered} loading={!products.length && isDefault} /> */}
          <OrderItem checkout={checkout} />
        </Container>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------
