import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, DialogContent, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// next
import { useRouter } from 'next/router';
// components
import BaseDialog from './BaseDialog';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';
import { LoginCustomLink } from '../link';

export default function CheckMailDialog({ isOpenDialog, handleOpenDialog }) {
  const theme = useTheme();
  const router = useRouter();

  const handleVerify = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleOpenDialog();
    router.push(PATH_PAGE.users.loginSteps(LOGIN_STEPS.MAIL_VERIFIED));
  };

  React.useEffect(() => {
    if (!isOpenDialog) return;
    handleVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenDialog]);

  return (
    <BaseDialog isOpenDialog={isOpenDialog} handleOpenDialog={handleOpenDialog}>
      <DialogContent
        sx={{
          paddingX: '32px',
          paddingY: '40px',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Stack gap="24px" justifyContent="center">
          <Box
            component="img"
            src="/logo/logo_full.svg"
            sx={{
              width: '93.835px',
              height: '96px',
              marginX: 'auto',
            }}
          />
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '32.4px',
              letterSpacing: '-0.01em',
              textAlign: 'center',
            }}
          >
            Check your email.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{ fontWeight: '300', fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}
            >
              We’ve sent you an email.
            </Typography>
            <Typography
              sx={{ fontWeight: '300', fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}
            >
              Click the link inside to continue
            </Typography>
            <Typography
              sx={{
                fontWeight: '300',
                fontSize: '16px',
                lineHeight: '24px',
                textAlign: 'center',
                pt: '24px',
              }}
            >
              Didn’t received the Email?{' '}
              <LoginCustomLink style={{ fontSize: '16px' }}>Resend</LoginCustomLink>
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

CheckMailDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
};
