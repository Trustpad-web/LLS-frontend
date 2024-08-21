import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, DialogContent, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// next
import { useRouter } from 'next/router';
// components
import BaseDialog from './BaseDialog';
import { CustomAvatar } from '../custom-avatar';
import { LoginButton } from '../button';
import { UploadBox } from '../upload';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';

export default function UploadPhotoDialog({ isOpenDialog, handleOpenDialog }) {
  const theme = useTheme();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    handleOpenDialog();
    router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.UPLOAD_ID_FRONT));
  };

  return (
    <BaseDialog isOpenDialog={isOpenDialog} handleOpenDialog={handleOpenDialog}>
      <DialogContent
        sx={{
          paddingX: '32px',
          paddingY: '40px',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Stack gap="24px" justifyContent="center" alignContent="center">
          <Box
            component="img"
            src="/logo/logo_full.svg"
            sx={{
              width: '93.835px',
              height: '96px',
              marginX: 'auto',
            }}
          />
          <Box
            display="flex"
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <CustomAvatar
              name="Joe Einhorn"
              sx={{
                width: '100px',
                height: '100px',
                fontWeight: '800',
                fontSize: '40px',
                lineHeight: '60px',
                backgroundColor: '#F1F5F9',
                color: '#475569',
              }}
            />
            <Typography
              sx={{
                fontWeight: '600',
                fontSize: '20px',
                lineHeight: '30px',
              }}
            >
              Joe Einhorn
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography
              sx={{ fontWeight: '300', fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}
            >
              Upload or take a new pic for your profile.
            </Typography>
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <UploadBox
                sx={{
                  height: '125px',
                  width: '100%',
                  margin: '0px',
                  flexShrink: '1',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFFFF',
                  borderColor: '#94A3B8',
                  color: theme.palette.primary.contrastText,
                  ':hover': {
                    color: theme.palette.primary.contrastText,
                  },
                }}
                placeholder={
                  <Stack sx={{ gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                      component="img"
                      src="/assets/icons/auth/ic_upload.svg"
                      sx={{ width: '32px', height: '32px' }}
                    />
                    <Typography
                      sx={{
                        fontWeight: '600',
                        fontSize: '14px',
                        lineHeight: '21px',
                        textAlign: 'center',
                      }}
                    >
                      Upload a Picture
                    </Typography>
                  </Stack>
                }
              />
              <Box
                sx={{
                  height: '125px',
                  width: '100%',
                  flexShrink: '1',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFFFF',
                  border: 'dashed 1px #94A3B8',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: '#FFFFFFFF',
                    opacity: '0.72',
                  },
                }}
              >
                <Stack sx={{ gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                  <Box
                    component="img"
                    src="/assets/icons/auth/ic_camera.svg"
                    sx={{ width: '32px', height: '32px' }}
                  />
                  <Typography
                    sx={{
                      fontWeight: '600',
                      fontSize: '14px',
                      lineHeight: '21px',
                      textAlign: 'center',
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    Take a Picture
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
          <LoginButton loading={loading} handleSubmit={handleSubmit}>
            Continue
          </LoginButton>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

UploadPhotoDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};
