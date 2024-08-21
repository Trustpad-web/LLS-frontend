import React from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Divider, Container, Typography, Stack, Button, useMediaQuery } from '@mui/material';
// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hook
import { useAuthContext } from '../../auth/useAuthContext';
// components
import { CustomAvatar } from '../../components/custom-avatar';
import { useSettingsContext } from '../../components/settings';
import { FollowDialog } from '../../components/dialog';

// ----------------------------------------------------------------------

UserProfilePublicViewPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

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

const StyledInfo = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    marginBottom: 16,
  },
  [theme.breakpoints.up('sm')]: {
    marginBottom: 32,
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: 48,
  },
  display: 'flex',
  justifyContent: 'center',
}));

export default function UserProfilePublicViewPage() {
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const theme = useTheme();
  const match = useMediaQuery((them) => them.breakpoints.up('sm'));

  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [type, setType] = React.useState('Following');

  const handleOpenDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  return (
    <>
      <Head>
        <title>Long Story Short | Profile - Private View</title>
      </Head>

      <Container
        sx={{
          maxWidth: { xl: 1316, lg: 1232, md: 1036, sm: 648, xs: 358 },
          width: '100%',
          paddingInline: '0px !important',
        }}
      >
        <StyledInfo>
          <CustomAvatar
            src="/assets/avatar.png"
            alt={user?.displayName}
            name={user?.displayName}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                sx={{
                  fontSize: '22px',
                  [theme.breakpoints.down('sm')]: { fontSize: '18px' },
                  fontWeight: '600',
                }}
              >
                Joe Einhorn
              </Typography>
              {match ? (
                <Box display="flex" gap="12px">
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: '48px',
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
                      Block User
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: '48px',
                      color: theme.palette.primary.light,
                      [theme.breakpoints.down('sm')]: {
                        paddingY: '6px',
                        paddingX: '12px',
                      },
                      borderColor: theme.palette.primary.contrastText,
                      backgroundColor: theme.palette.primary.contrastText,
                      ':hover': {
                        backgroundColor: theme.palette.primary.contrastText,
                      },
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
                      Follow
                    </Typography>
                  </Button>
                </Box>
              ) : null}
            </Box>

            {match ? (
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
        </StyledInfo>

        {!match ? (
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

            <Box sx={{ display: 'flex', gap: '12px', mb: '24px' }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: '48px',
                  [theme.breakpoints.down('sm')]: {
                    paddingY: '8px',
                    paddingX: '51px',
                    width: '100%',
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
                      fontSize: '14px',
                      lineHeight: '21px',
                    },
                    letterSpacing: '-0.02em',
                  }}
                >
                  Block
                </Typography>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: '48px',
                  color: theme.palette.primary.light,
                  [theme.breakpoints.down('sm')]: {
                    paddingY: '8px',
                    paddingX: '64.5px',
                    width: '100%',
                  },
                  borderColor: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.contrastText,
                  ':hover': {
                    backgroundColor: theme.palette.primary.contrastText,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Follow
                </Typography>
              </Button>
            </Box>
          </>
        ) : null}

        <Divider />

        <Box
          sx={{
            mt: '48px',
            border: '1px black solid',
            borderRadius: '24px',
            width: '100%',
            textAlign: 'center',
            height: '139px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '30px',
              letterSpacing: '-0.01em',
            }}
          >
            The Account is set to Private
          </Typography>
        </Box>
        <FollowDialog
          isOpenDialog={isOpenDialog}
          handleOpenDialog={handleOpenDialog}
          type={type}
          userFollowingList={type === 'Following' ? userFollowingList : userFollowerList}
        />
      </Container>
    </>
  );
}
