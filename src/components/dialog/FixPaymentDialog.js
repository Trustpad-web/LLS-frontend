import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, DialogContent, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import { LoginButton } from '../button';
import BaseDialog from './BaseDialog';

export default function FixPaymentDialog({ isOpenDialog, handleOpenDialog, handleNextDialogOpen }) {
  const theme = useTheme();

  const [loading, setLoading] = React.useState(false);
  const [logoutLoading, setlogoutLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    handleOpenDialog();
  };

  const handleLogoutSubmit = async () => {
    if (logoutLoading) return;
    setlogoutLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setlogoutLoading(false);
    handleOpenDialog();
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
            src="/assets/warning.gif"
            style={{ width: '96px', height: '96px', marginInline: 'auto' }}
          />
          <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: '24px',
                lineHeight: '33.6px',
                textAlign: 'center',
              }}
            >
              Monthly dues failed.
            </Typography>
            <Typography
              sx={{
                fontWeight: '300',
                fontSize: '12px',
                lineHeight: '18px',
                textAlign: 'center',
              }}
            >
              Pay your monthly dues to use our service.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <LoginButton loading={loading} handleSubmit={handleSubmit}>
              Fix payment.
            </LoginButton>
            <LoginButton
              sx={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: theme.palette.primary.contrastText,
                ':hover': {
                  boxShadow: '0px 4px 32px 0px #00000066',
                  backgroundColor: '#D6D6D6',
                  borderColor: 'transparent',
                },
              }}
              loading={logoutLoading}
              handleSubmit={handleLogoutSubmit}
            >
              Logout
            </LoginButton>
          </Box>
        </Stack>
      </DialogContent>
    </BaseDialog>
  );
}

FixPaymentDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  handleNextDialogOpen: PropTypes.func,
};
