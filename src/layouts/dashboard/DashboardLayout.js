import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// auth
import AuthGuard from '../../auth/AuthGuard';
// components
// import { useSettingsContext } from '../../components/settings';
// config
// import { NAV } from '../../config-global';
//
import Main from './Main';
import Header from './header';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';
// import NavDocs from './nav/NavDocs';
import NavSideBar from './nav/NavSideBar';
import CoolStaff from '../../components/cool-staff/CoolStaff';

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default function DashboardLayout({ children }) {
  // const { themeLayout } = useSettingsContext();

  const { pathname } = useRouter();

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const [open, setOpen] = useState(false);

  const isHomePage = pathname.includes('home');
  const isNotificationPage = pathname.includes('notifications');
  const isSearchPage = pathname.includes('search');
  const isOrderPage = pathname.includes('orders');
  const isSettingPage = pathname.includes('settings');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let renderNavVertical;

  if (isDesktopL && !isNotificationPage) renderNavVertical = <NavVertical />;
  if (isDesktopN || isNotificationPage || isOrderPage || isSettingPage)
    renderNavVertical = <NavMini />;
  if (isTabletL || isTabletP || isMobile)
    renderNavVertical = <NavHorizontal onOpenNav={handleOpen} />;

  const renderContent = () => (
    <>
      {(isHomePage || isNotificationPage || isSearchPage || isOrderPage || isSettingPage) && (
        <Header onOpenNav={handleOpen} />
      )}
      {(isTabletL || isTabletP || isMobile) && (
        <NavSideBar openNav={open} onCloseNav={handleClose} />
      )}

      <CoolStaff />

      <Box
        sx={{
          display: { lg: 'flex', md: 'flex' },
          displayDirection: 'flex-row',
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}

        <Main>{children}</Main>
      </Box>
    </>
  );
  return <AuthGuard> {renderContent()} </AuthGuard>;
}
