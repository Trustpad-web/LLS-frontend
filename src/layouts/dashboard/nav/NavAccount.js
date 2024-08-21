import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
// responsive
import useResponsive from '../../../hooks/useResponsive';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

NavAccount.propTypes = {
  nameField: PropTypes.bool,
};
// ----------------------------------------------------------------------

export default function NavAccount({ nameField }) {
  const { user } = useAuthContext();
  const theme = useTheme();

  const isDesktopL = useResponsive('up', 'xl');
  const isDesktopN = useResponsive('between', 'lg', 'xl');

  return (
    <Link component={NextLink} href={PATH_PAGE.profile.root} underline="none" color="inherit">
      <StyledRoot
        sx={{
          backgroundColor: 'transparent',
          padding: isDesktopL ? '14px 12px !important' : '0px !important',
        }}
      >
        <CustomAvatar
          // src={user?.photoURL}
          src="/assets/avatar.png"
          alt={user?.displayName}
          name={user?.displayName}
          sx={{
            margin: !isDesktopN ? '0px' : 'auto !important',
            width: '48px',
            height: '48px',
            boxShadow: '0 4px 8px rgb(0 0 0 / 15%)',
            border: '1.5px solid white',
            backgroundColor: 'white',
          }}
        />
        {nameField && (
          <Box sx={{ ml: 2, minWidth: 0 }}>
            {/* <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>{user?.displayName}</Typography> */}
            <Typography
              sx={{ fontSize: '18px', fontWeight: 700, color: theme.palette.primary.contrastText }}
            >
              Joe Einhorn
            </Typography>
          </Box>
        )}
      </StyledRoot>
    </Link>
  );
}
