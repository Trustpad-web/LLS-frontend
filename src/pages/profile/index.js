import React from 'react';
// next
import Head from 'next/head';
// @mui
import { Button, Box, Divider, Container, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hook
import { useAuthContext } from '../../auth/useAuthContext';
import useResponsive from '../../hooks/useResponsive';
// components
import { CustomAvatar } from '../../components/custom-avatar';
import { FollowDialog } from '../../components/dialog';
import DashboardLayout from '../../layouts/dashboard';

// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const avatarList = [
  { id: 1, url: '/assets/images/avatars/avatar_1.jpg', name: '1' },
  { id: 2, url: '/assets/images/avatars/avatar_2.jpg', name: '2' },
  { id: 3, url: '/assets/images/avatars/avatar_3.jpg', name: '3' },
  { id: 4, url: '/assets/images/avatars/avatar_4.jpg', name: '4' },
  { id: 5, url: '/assets/images/avatars/avatar_5.jpg', name: '5' },
  { id: 6, url: '/assets/images/avatars/avatar_6.jpg', name: '6' },
  { id: 7, url: '/assets/images/avatars/avatar_7.jpg', name: '7' },
  { id: 8, url: '/assets/images/avatars/avatar_8.jpg', name: '8' },
  { id: 9, url: '/assets/images/avatars/avatar_9.jpg', name: '9' },
  { id: 10, url: '/assets/images/avatars/avatar_10.jpg', name: '10' },
  { id: 11, url: '/assets/images/avatars/avatar_11.jpg', name: '11' },
  { id: 12, url: '/assets/images/avatars/avatar_12.jpg', name: '12' },
  { id: 13, url: '/assets/images/avatars/avatar_13.jpg', name: '13' },
  { id: 14, url: '/assets/images/avatars/avatar_14.jpg', name: '14' },
  { id: 15, url: '/assets/images/avatars/avatar_15.jpg', name: '15' },
  { id: 16, url: '/assets/images/avatars/avatar_16.jpg', name: '16' },
  { id: 17, url: '/assets/images/avatars/avatar_17.jpg', name: '17' },
  { id: 18, url: '/assets/images/avatars/avatar_18.jpg', name: '18' },
  { id: 19, url: '/assets/images/avatars/avatar_19.jpg', name: '19' },
  { id: 20, url: '/assets/images/avatars/avatar_20.jpg', name: '20' },
  { id: 21, url: '/assets/images/avatars/avatar_21.jpg', name: '21' },
  { id: 22, url: '/assets/images/avatars/avatar_22.jpg', name: '22' },
  { id: 23, url: '/assets/images/avatars/avatar_23.jpg', name: '23' },
  { id: 24, url: '/assets/images/avatars/avatar_24.jpg', name: '24' },
  { id: 25, url: '/assets/images/avatars/avatar_25.jpg', name: '25' },
  { id: 26, url: '/assets/images/avatars/avatar_26.jpg', name: '26' },
  { id: 27, url: '/assets/images/avatars/avatar_27.jpg', name: '27' },
  { id: 28, url: '/assets/images/avatars/avatar_28.jpg', name: '28' },
];

const userFollowerList = [
  {
    id: 1,
    avatarUrl: '/assets/images/avatars/humans/human_1.png',
    userName: 'James Bator',
    followers: '2.1 million',
  },
  {
    id: 2,
    avatarUrl: '/assets/images/avatars/humans/human_2.png',
    userName: 'Abram Carder',
    followers: '2.1 million',
  },
  {
    id: 3,
    avatarUrl: '/assets/images/avatars/humans/human_3.png',
    userName: 'Jakob Passaquindici Arcand',
    followers: '2.1 million',
  },
  {
    id: 4,
    avatarUrl: '/assets/images/avatars/humans/human_4.png',
    userName: 'Lindsey Siphron',
    followers: '2.1 million',
  },
  {
    id: 5,
    avatarUrl: '/assets/images/avatars/humans/human_5.png',
    userName: 'Aspen Curtis',
    followers: '2.1 million',
  },
  {
    id: 6,
    avatarUrl: '/assets/images/avatars/humans/human_6.png',
    userName: 'Carter Stanton',
    followers: '2.1 million',
  },
];

const userFollowingList = [
  {
    id: 1,
    avatarUrl: '/assets/images/avatars/humans/human_8.png',
    userName: 'Ann Bergson',
    followers: '2.1 million followers',
  },
  {
    id: 2,
    avatarUrl: '/assets/images/avatars/humans/human_7.png',
    userName: 'Abram Carder',
    followers: '2.1 million followers',
  },
  {
    id: 3,
    avatarUrl: '/assets/images/avatars/humans/human_6.png',
    userName: 'Jakob Passaquindici Arcand',
    followers: '2.1 million followers',
  },
  {
    id: 4,
    avatarUrl: '/assets/images/avatars/humans/human_5.png',
    userName: 'Lindsey Siphron',
    followers: '2.1 million followers',
  },
  {
    id: 5,
    avatarUrl: '/assets/images/avatars/humans/human_4.png',
    userName: 'Aspen Curtis',
    followers: '2.1 million followers',
  },
  {
    id: 6,
    avatarUrl: '/assets/images/avatars/humans/human_3.png',
    userName: 'Carter Stanton',
    followers: '2.1 million followers',
  },
];

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const { user } = useAuthContext();
  const theme = useTheme();

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');
  const isTabletL = useResponsive('between', 'md', 'lg');
  const isTabletP = useResponsive('between', 'sm', 'md');
  const isMobile = useResponsive('between', 'xs', 'sm');

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [type, setType] = React.useState('Following');

  const handleOpenDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  return (
    <>
      <Head>
        <title>Long Story Short | Profile</title>
      </Head>

      <Container
        sx={{
          maxWidth: { xl: 1316, lg: 1232, md: 1036, sm: 648, xs: 358 },
          width: '100%',
          paddingInline: '0px !important',
        }}
      >
        <Stack spacing={isMobile ? 2 : 6}>
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
            <CustomAvatar
              src="/assets/avatar.png"
              alt={user.displayName || ''}
              name={user.displayName || ''}
              sx={{
                backgroundColor: 'transparent',
                width: 140,
                height: 140,
                [theme.breakpoints.down('sm')]: {
                  width: 80,
                  height: 80,
                },
              }}
            />
            <Stack
              spacing="12px"
              sx={{
                ml: '16px',
                textAlign: 'left',
                [theme.breakpoints.up('sm')]: {
                  width: '350px',
                },
                color: theme.palette.primary.contrastText,
                [theme.breakpoints.down('sm')]: {
                  justifyContent: 'center',
                  flex: '1',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '22px',
                    [theme.breakpoints.down('sm')]: { fontSize: '18px' },
                    fontWeight: '600',
                  }}
                >
                  Joe Einhorn
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: '48px',
                    paddingY: '8px',
                    paddingX: '14px',
                    [theme.breakpoints.down('sm')]: {
                      paddingY: '6px',
                      paddingX: '12px',
                    },
                    color: theme.palette.primary.contrastText,
                    borderColor: theme.palette.primary.contrastText,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: '500',
                      fontSize: '14px',
                      lineHeight: '21px',
                      [theme.breakpoints.down('sm')]: {
                        fontSize: '12px',
                        lineHeight: '18px',
                      },
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Edit profile
                  </Typography>
                </Button>
              </Box>

              {isDesktopL || isDesktopN || isTabletL || isTabletP ? (
                <>
                  <Typography fontSize="14px">
                    Write anything here like status or type of products you like
                  </Typography>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '4px',
                        justifyContent: 'start',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: '16px', fontWeight: '800' }}>100</Typography>
                      <Typography fontSize="14px">Products</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        gap: '4px',
                        justifyContent: 'start',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderBottom: '1px solid #000000',
                      }}
                      onClick={() => {
                        setType('Followers');
                        handleOpenDialog();
                      }}
                    >
                      <Typography sx={{ fontSize: '16px', fontWeight: '800' }}>500</Typography>
                      <Typography fontSize="14px">Followers</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        gap: '4px',
                        justifyContent: 'start',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderBottom: '1px solid #000000',
                      }}
                      onClick={() => {
                        setType('Following');
                        handleOpenDialog();
                      }}
                    >
                      <Typography sx={{ fontSize: '16px', fontWeight: '800' }}>100</Typography>
                      <Typography fontSize="14px">Following</Typography>
                    </Box>
                  </Box>
                </>
              ) : null}
            </Stack>
          </Stack>

          {isMobile ? (
            <>
              <Typography fontSize="12px" mb="12px">
                Write anything here like status or type of products you like
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '48px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '4px',
                    justifyContent: 'start',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>100</Typography>
                  <Typography fontSize="12px">Products</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: '4px',
                    justifyContent: 'start',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderBottom: '1px solid #000000',
                  }}
                  onClick={() => {
                    setType('Followers');
                    handleOpenDialog();
                  }}
                >
                  <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>500</Typography>
                  <Typography fontSize="12px">Followers</Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: '4px',
                    justifyContent: 'start',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderBottom: '1px solid #000000',
                  }}
                  onClick={() => {
                    setType('Following');
                    handleOpenDialog();
                  }}
                >
                  <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>100</Typography>
                  <Typography fontSize="12px">Following</Typography>
                </Box>
              </Box>
            </>
          ) : null}

          <Divider />

          <Box
            sx={{
              rowGap: '55px',
              columnGap: 'normal',
              display: 'grid',
              [theme.breakpoints.up('xl')]: {
                rowGap: '55px',
              },
              [theme.breakpoints.up('lg')]: {
                rowGap: '42px',
                gridTemplateColumns: 'repeat(7, 1fr)',
              },
              [theme.breakpoints.up('md')]: {
                rowGap: '45px',
                gridTemplateColumns: 'repeat(6, 1fr)',
              },
              [theme.breakpoints.up('sm')]: {
                rowGap: '53px',
                gridTemplateColumns: 'repeat(4, 1fr)',
              },
              [theme.breakpoints.up('xs')]: {
                rowGap: '24px',
                gridTemplateColumns: 'repeat(3, 1fr)',
              },
            }}
          >
            {avatarList.map((avatar) => (
              <CustomAvatar
                key={avatar.id}
                src={avatar.url}
                alt={avatar.name}
                name={avatar.name}
                sx={{
                  margin: 'auto',
                  width: 140,
                  height: 140,
                  [theme.breakpoints.down('lg')]: {
                    width: 128,
                    height: 128,
                  },
                  [theme.breakpoints.down('sm')]: {
                    width: 100,
                    height: 100,
                  },
                  backgroundColor: 'transparent',
                }}
              />
            ))}
          </Box>
          <FollowDialog
            isOpenDialog={isOpenDialog}
            handleOpenDialog={handleOpenDialog}
            type={type}
            userFollowingList={type === 'Following' ? userFollowingList : userFollowerList}
          />
        </Stack>
      </Container>
    </>
  );
}
