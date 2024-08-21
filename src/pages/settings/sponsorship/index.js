import React from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Box } from '@mui/material';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { SettingsNavPopover } from '../../../layouts/dashboard/subNav';
import { AddSponsorDialog } from '../../../components/dialog';
import SponsorShipList from './section/SponsorShipList';
// hook
import useResponsive from '../../../hooks/useResponsive';

// ----------------------------------------------------------------------

Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Orders() {
  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');

  const [isAddSponsorshipDialog, setIsAddSponsorshipDialogOpen] = React.useState(false);

  const handleAddSponsor = () => {
    setIsAddSponsorshipDialogOpen(!isAddSponsorshipDialog);
  };

  return (
    <>
      <Head>
        <title>Long Story Short | Settings - Sponsorship</title>
      </Head>
      {(isDesktopL || isDesktopN) && <SettingsNavPopover />}
      <Container sx={{ width: '100%', margin: '0px !important', padding: '0px !important' }}>
        <Box
          sx={{
            padding: { sm: '24px 64px', xs: '24px' },
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            maxWidth: { lg: '876px', xs: '100%' },
            width: '100%',
          }}
        >
          <SponsorShipList handleAddSponsor={handleAddSponsor} />
        </Box>
        <AddSponsorDialog
          isOpenDialog={isAddSponsorshipDialog}
          handleOpenDialog={handleAddSponsor}
        />
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
