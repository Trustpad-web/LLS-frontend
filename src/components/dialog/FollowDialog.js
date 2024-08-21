import React from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Button,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Pagination,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '@mui/material/styles';
// components
import { CustomAvatar } from '../custom-avatar';
import BaseDialog from './BaseDialog';
// hook
import useResponsive from '../../hooks/useResponsive';

export default function FollowDialog({ isOpenDialog, handleOpenDialog, userFollowingList, type }) {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'sm');

  return (
    <BaseDialog
      isOpenDialog={isOpenDialog}
      handleOpenDialog={handleOpenDialog}
      width={!isMobile ? '520px' : '100%'}
      radius={0}
    >
      <DialogTitle
        sx={{
          paddingTop: '32px',
          paddingX: '32px',
          paddingBottom: '24px',
          fontWeight: '600',
          fontSize: '24px',
          lineHeight: '36px',
          color: theme.palette.primary.contrastText,
        }}
      >
        {type}
        <Typography
          sx={{ fontSize: '14px', lineHeight: '21px', fontWeigh: '15px', letterSpacing: '-0.01em' }}
        >
          {type === 'Following' ? 'The people you follow' : 'The people following you'}
        </Typography>
        <CloseIcon
          onClick={handleOpenDialog}
          sx={{
            position: 'absolute',
            right: 32,
            top: 32,
            cursor: 'pointer',
            color: theme.palette.primary.contrastText,
          }}
        />
      </DialogTitle>
      <DialogContent
        sx={{
          paddingBottom: '32px',
          paddingX: '32px',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Stack gap="24px">
          <TextField
            variant="filled"
            fullWidth
            label="Search"
            sx={{
              height: '56px',
              '& .MuiInputBase-root': {
                borderRadius: '16px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack gap="16px">
            {userFollowingList.map((userFollowing, index) => (
              <Box
                key={`list-${index}`}
                sx={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CustomAvatar
                  src={userFollowing.avatarUrl}
                  alt={userFollowing.userName}
                  name={userFollowing.userName}
                  sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: 'transparent',
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    py: '9.5px',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: 'auto' }}>
                    <Typography
                      noWrap
                      sx={{
                        fontSize: '18px',
                        fontWeight: '600',
                        maxWidth: { xs: 130, sm: 200, md: 220, lg: 260, xl: 260 },
                      }}
                    >
                      {userFollowing.userName}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: '700' }}>
                      {userFollowing.followers}
                    </Typography>
                  </Box>

                  {type === 'Following' ? (
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: '48px',
                        color: theme.palette.primary.light,
                        paddingY: '10px',
                        paddingX: '18px',
                        borderColor: theme.palette.primary.contrastText,
                        backgroundColor: theme.palette.primary.contrastText,
                        ':hover': {
                          backgroundColor: theme.palette.primary.contrastText,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: '400',
                          fontSize: '14px',
                          lineHeight: '21px',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        Unfollow
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: '48px',
                        paddingY: '10px',
                        paddingX: '18px',
                        color: theme.palette.primary.contrastText,
                        borderColor: theme.palette.primary.contrastText,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: '400',
                          fontSize: '14px',
                          lineHeight: '21px',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        Follow
                      </Typography>
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
          <Pagination
            shape="rounded"
            count={10}
            variant="outlined"
            siblingCount={isMobile ? 0 : 1}
            sx={{ marginX: 'auto' }}
          />
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

FollowDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  userFollowingList: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};
