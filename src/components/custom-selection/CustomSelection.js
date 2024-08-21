import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Button, Link, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// hooks
import useResponsive from '../../hooks/useResponsive';

CustomSelection.propTypes = {
  isCategory: PropTypes.bool,
  selectionList: PropTypes.array,
};

export default function CustomSelection({ isCategory, selectionList }) {
  const theme = useTheme();

  const [item, setItem] = useState(selectionList[0]);
  const [isOpen, setIsOpen] = useState(null);
  const { pathname } = useRouter();
  const isSettingPage = pathname.includes('settings');

  useEffect(() => {
    if (isSettingPage === true) {
      const activePage = selectionList.filter((selectItem) =>
        selectItem.path.includes(pathname)
      )[0];
      setItem(activePage);
    }
  }, [isSettingPage, pathname, selectionList]);

  const isMobile = useResponsive('between', 'xs', 'sm');

  const handleOpen = (e) => {
    setIsOpen(e.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const handleSelect = (index) => {
    setIsOpen(null);
    setItem(selectionList[index]);
  };

  return (
    <>
      <Button
        variant="text"
        endIcon={isOpen ? <ExpandLessIcon width="24px" /> : <ExpandMoreIcon width="24px" />}
        onClick={(e) => handleOpen(e)}
        sx={{
          paddingInline: 3,
          fontSize: { xl: 24, lg: 24, md: 20, sm: 20, xs: 18 },
          fontWeight: 600,
          color: theme.palette.primary.contrastText,
          borderRadius: 6,
          width: isMobile ? '90%' : 'inherit',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'fixed',
        }}
      >
        {isCategory ? item : item.title}
      </Button>
      <Menu
        defaultValue={item.title}
        keepMounted
        id="simple-menu"
        anchorEl={isOpen}
        onClose={handleClose}
        open={Boolean(isOpen)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .css-18vu26o-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper': {
            top: {
              xs: '120px !important',
              sm: '140px !important',
              md: '140px !important',
              lg: '80px !important',
              xl: '80px !important',
            },
            borderRadius: '16px',
            padding: '8px',
            width: {
              xs: '100%',
              sm: 'inherit',
              md: 'inherit',
              lg: 'inherit',
              xl: 'inherit',
            },
          },
        }}
      >
        {selectionList.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSelect(index)}
            sx={{
              borderRadius: '16px',
              padding: '13px 16px',
              minWidth: '244px',
              ...(item.title === option.title &&
                !isCategory && {
                  bgcolor: theme.palette.primary.contrastText,
                }),
              '&:hover': {
                bgcolor: theme.palette.primary.contrastText,
                color: theme.palette.grey[100],
              },
            }}
          >
            {isCategory === true ? (
              option
            ) : (
              <Link
                component={NextLink}
                href={option.path}
                underline="none"
                sx={{
                  width: '100%',
                  ...(item.title === option.title &&
                    !isCategory && {
                      color: theme.palette.secondary.contrastText,
                    }),
                }}
              >
                {option.title}
              </Link>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
