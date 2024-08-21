import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Card, Button, Avatar, Typography, Stack } from '@mui/material';
// import { useTheme } from '@mui/system';
// mock
import _mock from '../../../../_mock';
// components
import { CustomAvatar, CustomAvatarGroup } from '../../../../components/custom-avatar';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

const COLORS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
];

ProfileFollowers.propTypes = {
  followers: PropTypes.array,
};

export default function ProfileFollowers({ followers }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(1, 1fr)',
        xl: 'repeat(1, 1fr)',
      }}
      sx={{
        marginTop: {
          xs: 10,
          sm: 2,
          md: 0,
          lg: 3,
          xl: 3,
        },
        marginX: {
          xs: 0,
          sm: 0,
          md: 0,
          lg: 3,
          xl: 3,
        },
        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: 480,
          xl: 480,
        },
      }}
    >
      {followers.map((follower) => (
        <FollowerCard key={follower.id} follower={follower} />
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
  follower: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    isFollowed: PropTypes.bool,
    avatarUrl: PropTypes.string,
  }),
};

function FollowerCard({ follower }) {
  // const { name, country, avatarUrl, isFollowed } = follower;
  const { name, avatarUrl, isFollowed } = follower;

  const [toggle, setToogle] = useState(isFollowed);

  // const theme = useTheme();

  return (
    <Card
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Stack sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
        <Stack
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Avatar
              alt={name}
              src={avatarUrl}
              sx={{
                width: { zl: 60, lg: 60, md: 60, sm: 60, xs: 48 },
                height: { zl: 60, lg: 60, md: 60, sm: 60, xs: 48 },
              }}
            />
            <Box
              sx={{
                pl: 2,
                pr: 1,
                flexGrow: 1,
                minWidth: 0,
              }}
            >
              <Typography variant="subtitle2" noWrap sx={{ fontSize: 22, fontWeight: 600 }}>
                {name}
              </Typography>

              <Stack
                spacing={0.5}
                direction="row"
                alignItems="center"
                sx={{ color: 'text.secondary' }}
              >
                {/* <Iconify icon="eva:pin-fill" width={16} sx={{ flexShrink: 0 }} /> */}

                <Typography
                  variant="body2"
                  component="span"
                  noWrap
                  sx={{ fontSize: 16, fontWeight: 800 }}
                >
                  1 Million +
                </Typography>

                <Typography
                  variant="body2"
                  component="span"
                  noWrap
                  sx={{ fontSize: 14, fontWeight: 400 }}
                >
                  Followers
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Button
            size="small"
            onClick={() => setToogle(!toggle)}
            variant={toggle ? 'text' : 'contained'}
            startIcon={toggle && <Iconify icon="eva:checkmark-fill" />}
            sx={{
              padding: '24px 24px',
              borderRadius: 48,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: 21,
              backgroundColor: toggle ? 'white' : '#0F172A',
              color: toggle ? '#0F172A' : 'white',
            }}
          >
            {toggle ? 'Followed' : 'Follow'}
          </Button>
        </Stack>
        <Stack>
          <CustomAvatarGroup key="medium" size="medium" max={11} countmore>
            {COLORS.map((color, index) => (
              <CustomAvatar key={index} alt="Remy Sharp" src={_mock.image.avatar(index + 1)} />
            ))}
          </CustomAvatarGroup>
        </Stack>
      </Stack>
    </Card>
  );
}
