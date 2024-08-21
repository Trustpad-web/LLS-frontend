import PropTypes from 'prop-types';
// import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { AppBar, Typography, Toolbar } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
// import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV, SUB_NAV } from '../../../config-global';
// components
// import { useSettingsContext } from '../../../components/settings';
import { CustomSelection } from '../../../components/custom-selection';
// import { CustomToogleButtom } from '../../../components/custom-tooglle-button';
import { CustomToogleSearchbar } from '../../../components/custom-toogle-searchbar';
import { settingSubNavConfig, orderSubNavConfig } from '../nav/config-navigation';

// ----------------------------------------------------------------------

const categoryList = [
  'New',
  'Men',
  'Women',
  'Accessories',
  'Art',
  'Home',
  'Gadgets',
  'Toys',
  'Jwerlry',
  'Furniture',
];

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const { pathname } = useRouter();

  // const [category, setCategory] = useState(categoryList[0]);
  // const [isOpen, setIsOpen] = useState(null);

  // const { themeLayout } = useSettingsContext();

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  // const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP);

  const isNotificationPage = pathname.includes('notifications');
  const isHomePage = pathname.includes('home');
  const isSearchPage = pathname.includes('search');
  const isOrderPage = pathname.includes('orders');
  const isSettingsPage = pathname.includes('settings');

  const renderContent = (
    <>
      {(isNotificationPage || isHomePage) && (
        <CustomSelection isCategory selectionList={categoryList} />
      )}
      {isSearchPage && <CustomToogleSearchbar />}
      {isOrderPage && (isDesktopL || isDesktopN) && (
        <Typography
          sx={{
            fontSize: { xl: 24, lg: 24, md: 20, sm: 20, xs: 18 },
            fontWeight: 600,
            color: theme.palette.primary.contrastText,
          }}
        >
          {ParseOrderPageTitle()}
        </Typography>
      )}
      {isSettingsPage && (isDesktopL || isDesktopN) && (
        <Typography
          sx={{
            fontSize: { xl: 24, lg: 24, md: 20, sm: 20, xs: 18 },
            fontWeight: 600,
            color: theme.palette.primary.contrastText,
          }}
        >
          {ParseSettingsPageTitle()}
        </Typography>
      )}
      {isOrderPage && (isTabletL || isTabletP || isMobile) && (
        <CustomSelection isCategory={false} selectionList={orderSubNavConfig[0].items} />
      )}
      {isSettingsPage && (isTabletL || isTabletP || isMobile) && (
        <CustomSelection isCategory={false} selectionList={settingSubNavConfig[0].items} />
      )}
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktopL && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...((isNotificationPage || isOrderPage || isSettingsPage) && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + SUB_NAV.W_NOTIFICATION}px)`,
          }),
          ...(isSearchPage && {
            width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
          }),
        }),
        ...(isDesktopN && {
          width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...((isNotificationPage || isOrderPage || isSettingsPage) && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + SUB_NAV.W_NOTIFICATION}px)`,
          }),
        }),
        ...((isTabletL || isTabletP) && {
          height: HEADER.H_TABLET,
          top: HEADER.H_TABLET_OFFSET,
          ...bgBlur({
            color: alpha(theme.palette.background.default, 1),
          }),
          ...(isNotificationPage && {
            display: 'none',
          }),
        }),
        ...(isMobile && {
          height: `(${HEADER.H_TABLET - 5}px)`,
          justifyContent: 'center',
          top: HEADER.H_MOBILE_OFFSET,
          ...bgBlur({
            color: alpha(theme.palette.background.default, 1),
          }),
          ...(isNotificationPage && {
            display: 'none',
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 4 },
          py: { lg: '20px' },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

// ------------------------------------------------------------

function ParseOrderPageTitle() {
  const { pathname } = useRouter();

  return orderSubNavConfig[0].items.filter((item) => pathname.includes(item.path))[0]?.title;
}

function ParseSettingsPageTitle() {
  const { pathname } = useRouter();

  return settingSubNavConfig[0].items.filter((item) => pathname.includes(item.path))[0]?.title;
}
