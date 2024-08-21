import { useState } from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, IconButton, Link, Stack, Fab } from '@mui/material';
import { useTheme } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// _mock_
// eslint-disable-next-line import/no-unresolved
import _mock from 'src/_mock';
// hook
// eslint-disable-next-line import/no-unresolved
import useResponsive from 'src/hooks/useResponsive';
import { _ecommerceNewProducts } from '../../../../_mock/arrays';
// routes
import { PATH_PAGE } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// redux
import { useDispatch } from '../../../../redux/store';
import { addToCart } from '../../../../redux/slices/product';
// components
import Label from '../../../../components/label';
import ProductCarousel from './ProductCarousel';
import { CustomAvatar, CustomAvatarGroup } from '../../../../components/custom-avatar';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

const COLORS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const { id, name, cover, price, colors, status, available, sizes, images } = product;

  const theme = useTheme();
  const dispatch = useDispatch();
  const [faveAdded, setFavAdded] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const RESPONSIVE = {
    SIZE: 'medium',
    TITLE: {
      FONTSIZE: 24,
      FONTWEIGHT: 600,
    },
    DESCRIPTION: {
      FONTSIZE: 14,
    },
    PRICE: {
      FONTSIZE: 32,
    },
    BUTTON: {
      FONTSIZE: 16,
      PADDING: '14px 20px',
    },
  };

  if (isDesktopL) {
    RESPONSIVE.SIZE = 'medium';
    RESPONSIVE.TITLE.FONTSIZE = 24;
    RESPONSIVE.TITLE.FONTWEIGHT = 600;
    RESPONSIVE.DESCRIPTION.FONTSIZE = 14;
    RESPONSIVE.PRICE.FONTSIZE = 32;
    RESPONSIVE.BUTTON.FONTSIZE = 16;
    RESPONSIVE.BUTTON.PADDING = '14px 20px';
  }
  if (isDesktopN) {
    RESPONSIVE.SIZE = 'medium';
    RESPONSIVE.TITLE.FONTSIZE = 24;
    RESPONSIVE.TITLE.FONTWEIGHT = 600;
    RESPONSIVE.DESCRIPTION.FONTSIZE = 14;
    RESPONSIVE.PRICE.FONTSIZE = 32;
    RESPONSIVE.BUTTON.FONTSIZE = 16;
    RESPONSIVE.BUTTON.PADDING = '14px 20px';
  }
  if (isTabletL) {
    RESPONSIVE.SIZE = 'small';
    RESPONSIVE.TITLE.FONTSIZE = 18;
    RESPONSIVE.TITLE.FONTWEIGHT = 600;
    RESPONSIVE.DESCRIPTION.FONTSIZE = 12;
    RESPONSIVE.PRICE.FONTSIZE = 24;
    RESPONSIVE.BUTTON.FONTSIZE = 12;
    RESPONSIVE.BUTTON.PADDING = '12px 16px';
  }
  if (isTabletP) {
    RESPONSIVE.SIZE = 'medium';
    RESPONSIVE.TITLE.FONTSIZE = 24;
    RESPONSIVE.TITLE.FONTWEIGHT = 600;
    RESPONSIVE.DESCRIPTION.FONTSIZE = 14;
    RESPONSIVE.PRICE.FONTSIZE = 32;
    RESPONSIVE.BUTTON.FONTSIZE = 16;
    RESPONSIVE.BUTTON.PADDING = '14px 20px';
  }
  if (isMobile) {
    RESPONSIVE.SIZE = 'small';
  }

  const linkTo = PATH_PAGE.productDetails(paramCase(id));

  const handleAddCart = async () => {
    const newProduct = {
      id,
      name,
      cover,
      available,
      price,
      colors: [colors[0]],
      size: sizes[0],
      quantity: 1,
    };
    try {
      setDisableBtn(true);
      dispatch(addToCart(newProduct));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        width: { xs: '100%', lg: '572px' },
        borderRadius: { xs: 0, md: 3 },
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
        ':hover': {
          boxShadow: '0 0 2px 0 rgba(100, 116, 139, 0.2), 1px 7px 30px -4px rgb(0 0 0 / 28%)',
        },
        p: 1,
      }}
      onMouseEnter={() => {
        setIsFocused(true);
      }}
      onMouseLeave={() => {
        setIsFocused(false);
      }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <ProductCarousel
          isFocused={isFocused}
          linkTo={linkTo}
          list={images}
          sx={{
            borderRadius: { xs: 0, md: 3 },
            boxShadow: 'none',
          }}
        />
      </Box>

      <Stack
        spacing={2}
        sx={{
          p: 3,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="start"
            spacing={1}
            sx={{
              alignItems: 'center',
              fontSize: {
                xs: '12px',
                sm: '14px',
                md: '12px',
                lg: '14px',
                xl: '14px',
              },
              color: theme.palette.primary.contrastText,
            }}
          >
            <CustomAvatarGroup key="medium" size={RESPONSIVE.SIZE} max={6}>
              {COLORS.map((color, index) => (
                <CustomAvatar key={index} alt="Remy Sharp" src={_mock.image.avatar(index + 1)} />
              ))}
            </CustomAvatarGroup>
            <Box component="span">{COLORS.length - 5}+ Likes</Box>
          </Stack>
          <Stack direction="row">
            {faveAdded ? (
              <IconButton aria-label="add to favorite" onClick={() => setFavAdded(false)}>
                <FavoriteIcon sx={{ color: theme.palette.primary.contrastText }} />
              </IconButton>
            ) : (
              <IconButton aria-label="remove from favorite" onClick={() => setFavAdded(true)}>
                <FavoriteBorderIcon sx={{ color: theme.palette.primary.contrastText }} />
              </IconButton>
            )}
          </Stack>
        </Stack>

        <Stack justifyContent="start" spacing={1}>
          <Link
            component={NextLink}
            href={linkTo}
            color={theme.palette.primary.contrastText}
            variant="subtitle2"
            fontSize={RESPONSIVE.TITLE.FONTSIZE}
            fontWeight={RESPONSIVE.TITLE.FONTWEIGHT}
            noWrap
          >
            Sylvester Stallone Richard Mille Watch
          </Link>
          <Box
            component="span"
            sx={{
              fontSize: RESPONSIVE.DESCRIPTION.FONTSIZE,
              fontWeight: 300,
              color: theme.palette.primary.contrastText,
            }}
          >
            A luxury timepiece that celebrates the 9th edition of Les Voiles de St. Barth Regatta,
            in which the brand has been the titled sponsor since 2010.
            <Link
              sx={{
                fontSize: RESPONSIVE.DESCRIPTION.FONTSIZE,
                fontWeight: 700,
                color: theme.palette.primary.contrastText,
              }}
            >
              {' '}
              Read more
            </Link>
          </Box>
        </Stack>

        <Stack
          direction={isMobile ? 'column' : 'row'}
          gap={isMobile ? 2 : ''}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: '2px' }}
        >
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              typography: 'subtitle1',
              fontSize: RESPONSIVE.PRICE.FONTSIZE,
              fontWeight: 300,
              color: theme.palette.primary.contrastText,
            }}
          >
            <Box component="span">{fCurrency('950,000')}</Box>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ width: isMobile ? '100%' : 'inherit' }}>
            <Fab
              key={id}
              color="black"
              variant="outlinedExtended"
              sx={{
                width: isMobile ? '100%' : 'inherit',
                border: `1px solid ${theme.palette.primary.light}`,
                fontWeight: 400,
                fontSize: RESPONSIVE.BUTTON.FONTSIZE,
                padding: RESPONSIVE.BUTTON.PADDING,
              }}
              disabled={disableBtn}
              onClick={handleAddCart}
            >
              Add To Cart
            </Fab>
            <Fab
              key="black"
              color="inherit"
              variant="extended"
              sx={{
                width: isMobile ? '100%' : 'inherit',
                border: `1px solid ${theme.palette.primary.darker}`,
                backgroundColor: theme.palette.primary.darker,
                color: theme.palette.grey[100],
                fontWeight: 400,
                fontSize: RESPONSIVE.BUTTON.FONTSIZE,
                padding: RESPONSIVE.BUTTON.PADDING,
                boxShadow: 'none',
                ':hover': {
                  backgroundColor: theme.palette.primary.darker,
                },
              }}
            >
              Buy now
            </Fab>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
