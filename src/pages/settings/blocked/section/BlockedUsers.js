import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Stack } from '@mui/system';
import { Typography, Divider, Card, CardHeader, Pagination, CardContent } from '@mui/material';
// layouts
import useResponsive from '../../../../hooks/useResponsive';
import DashboardLayout from '../../../../layouts/dashboard';
import BlockedUserList from '../../../../components/blocked-user-list/BlockedUserList';

// ----------------------------------------------------------------------

BlockedUsers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

BlockedUsers.propTypes = {
  handleAddSponsor: PropTypes.func,
};

const BLOCKED_USERS = [
  {
    id: 0,
    userAvatar: '/assets/images/avatars/humans/human_1.png',
    userName: 'Hanna Septimus',
    products: 50,
  },
  {
    id: 1,
    userAvatar: '/assets/images/avatars/humans/human_2.png',
    userName: 'Gustavo Rosser',
    products: 250,
  },
  {
    id: 2,
    userAvatar: '/assets/images/avatars/humans/human_3.png',
    userName: 'Maria Franci',
    products: 248,
  },
  {
    id: 3,
    userAvatar: '/assets/images/avatars/humans/human_4.png',
    userName: 'Zain Bergson',
    products: 130,
  },
  {
    id: 4,
    userAvatar: '/assets/images/avatars/humans/human_5.png',
    userName: 'Alfredo Mango',
    products: 200,
  },
  {
    id: 5,
    userAvatar: '/assets/images/avatars/humans/human_6.png',
    userName: 'Talan Donin',
    products: 190,
  },
];

export default function BlockedUsers({ handleAddSponsor }) {
  const isMobile = useResponsive('down', 'sm');
  return (
    <Card
      sx={{
        boxShadow: 'none',
        maxWidth: { xl: '876px', lg: '876px', md: '100%', sm: '696px', xs: '100%' },
      }}
    >
      <CardHeader
        title={
          <Typography sx={{ fontWeight: '600', fontSize: '20px' }}>
            People that you have blocked
          </Typography>
        }
        sx={{
          padding: '0px',
          pb: '24px',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      />

      <Divider />

      <CardContent sx={{ padding: '0px', pt: '24px' }}>
        {BLOCKED_USERS.length === 0 && (
          <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
            New beneficiaries that you sponsor will be displayed here.
          </Typography>
        )}
        <Stack>
          {BLOCKED_USERS.map((row) => (
            <BlockedUserList key={row.id} row={row} />
          ))}
        </Stack>
      </CardContent>
      <Pagination
        shape="rounded"
        count={10}
        variant="outlined"
        siblingCount={isMobile ? 0 : 1}
        sx={{ '& .MuiPagination-ul': { justifyContent: 'center' } }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------
