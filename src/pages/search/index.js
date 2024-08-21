import { useEffect } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// next
import Head from 'next/head';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
// import { PATH_PAGE } from '../../routes/paths';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import FormProvider from '../../components/hook-form';
// sections
import {
  ShopTagFiltered,
  // ShopProductSort,
  ShopProductList,
  // ShopFilterDrawer,
  // ShopProductSearch,
} from '../../sections/@dashboard/e-commerce/shop';
import { ProfileFollowers } from '../../sections/@dashboard/user/profile';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
// _mock_
import { _userFollowers } from '../../_mock/arrays';
// context
import { useSettingsContext } from '../../components/settings';
// ----------------------------------------------------------------------

Search.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Search() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { products, search, checkout } = useSelector((state) => state.product);

  // const [openFilter, setOpenFilter] = useState(false);

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

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <>
      <Head>
        <title>Long Story Short | Search</title>
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
          {search === 'products' ? (
            <ShopProductList products={dataFiltered} loading={!products.length && isDefault} />
          ) : (
            <ProfileFollowers followers={_userFollowers} />
          )}

          <CartWidget totalItems={checkout.totalItems} />
        </Container>
      </FormProvider>
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
