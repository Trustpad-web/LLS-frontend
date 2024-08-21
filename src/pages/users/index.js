import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useMediaQuery, Box } from '@mui/material';
// comoponents
import { useRouter } from 'next/router';
import {
  ConfirmDialog,
  VerifyOTPDialog,
  OTPDialog,
  LoginDialog,
  ConfirmPasswordDialog,
  ApplyMembershipDialog,
  CheckMailDialog,
  EmailVerifiedDialog,
  UploadPhotoDialog,
  UploadIDDialog,
  CompleteApplicationDialog,
} from '../../components/dialog';
import SplashLayout from '../../layouts/splash/SplashLayout';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';

// ----------------------------------------------------------------------

SplashPage.getLayout = (page) => <SplashLayout>{page}</SplashLayout>;

// ----------------------------------------------------------------------

export default function SplashPage({ stepName, uid, token }) {
  const { pathname, replace, prefetch } = useRouter();
  const match = useMediaQuery((them) => them.breakpoints.down('md'));

  const [isLoginOpenDialog, setIsLoginOpenDialog] = React.useState(false);
  const [isOTPOpenDialog, setIsOTPOpenDialog] = React.useState(false);
  const [isVerifyOTPDialogOpen, setIsVerifyOTPOpenDialog] = React.useState(false);
  const [isConfirmPassDialogOpen, setConfirmPassDialogOpen] = React.useState(false);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [isApplyMembershipDialogOpen, setApplyMembershipDialogOpen] = React.useState(false);
  const [isCheckMailDialogOpen, setCheckMailDialogOpen] = React.useState(false);
  const [isEmailVerifiedDialogOpen, setEmailVerifiedDialogOpen] = React.useState(false);
  const [isUploadPhotoDialogOpen, setUploadPhotoDialogOpen] = React.useState(false);
  const [isUploadIDDialogOpen, setUploadIDDialogOpen] = React.useState(false);
  const [isUploadIDBackDialogOpen, setUploadIDBackDialogOpen] = React.useState(false);
  const [isCompleteDialogOpen, setCompleteDialogOpen] = React.useState(false);

  const redirect = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    if (pathname === PATH_PAGE.users.root) {
      replace(PATH_PAGE.users.loginSteps('signin'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    redirect();
  }, [redirect]);

  useEffect(() => {
    prefetch(PATH_PAGE.users.loginSteps('signin'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoginOpenDialog(false);
    setIsOTPOpenDialog(false);
    setIsVerifyOTPOpenDialog(false);
    setConfirmPassDialogOpen(false);
    setConfirmDialogOpen(false);
    setApplyMembershipDialogOpen(false);
    setCheckMailDialogOpen(false);
    setEmailVerifiedDialogOpen(false);
    setUploadPhotoDialogOpen(false);
    setUploadIDDialogOpen(false);
    setUploadIDBackDialogOpen(false);
    setCompleteDialogOpen(false);

    switch (stepName) {
      case LOGIN_STEPS.SIGN_IN:
        setIsLoginOpenDialog(true);
        break;
      // ---------- Forget Password ----------//
      case LOGIN_STEPS.OTP:
        setIsOTPOpenDialog(true);
        break;
      case LOGIN_STEPS.VERIFY_OTP:
        setIsVerifyOTPOpenDialog(true);
        break;
      case LOGIN_STEPS.CONFIRM_PASSWORD:
        setConfirmPassDialogOpen(true);
        break;
      case LOGIN_STEPS.CONFIRM:
        setConfirmDialogOpen(true);
        break;
      // ---------- Apply Membership ---------- //
      case LOGIN_STEPS.SIGN_UP:
        setApplyMembershipDialogOpen(true);
        break;
      case LOGIN_STEPS.MAIL_VERIFYING:
        setCheckMailDialogOpen(true);
        break;
      case LOGIN_STEPS.MAIL_VERIFIED:
        setEmailVerifiedDialogOpen(true);
        break;
      case LOGIN_STEPS.UPLOAD_PHOTO:
        setUploadPhotoDialogOpen(true);
        break;
      case LOGIN_STEPS.UPLOAD_ID_FRONT:
        setUploadIDDialogOpen(true);
        break;
      case LOGIN_STEPS.UPLOAD_ID_BACK:
        setUploadIDBackDialogOpen(true);
        break;
      case LOGIN_STEPS.COMPLETE:
        setCompleteDialogOpen(true);
        break;
      default:
        break;
    }
  }, [stepName]);

  const handleLoginDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsLoginOpenDialog(!isLoginOpenDialog);
  };

  const handleOTPDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsOTPOpenDialog(!isOTPOpenDialog);
  };

  const handleVerifyOTPDialogOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsVerifyOTPOpenDialog(!isVerifyOTPDialogOpen);
  };

  const handleConfirmPassDlgOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setConfirmPassDialogOpen(!isConfirmPassDialogOpen);
  };

  const handleConfirmDlgOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setConfirmDialogOpen(!isConfirmDialogOpen);
  };

  const handleApplyMembershipDlgOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setApplyMembershipDialogOpen(!isApplyMembershipDialogOpen);
  };

  const handleCheckMailDlgOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setCheckMailDialogOpen(!isCheckMailDialogOpen);
  };

  const handleEmailVerifiedDlgOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setEmailVerifiedDialogOpen(!isEmailVerifiedDialogOpen);
  };

  const handleUploadPhotoDlgOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setUploadPhotoDialogOpen(!isUploadPhotoDialogOpen);
  };

  const handleUploadIDFrontDlgOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setUploadIDDialogOpen(!isUploadIDDialogOpen);
  };

  const handleUploadIDBackDlgOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setUploadIDBackDialogOpen(!isUploadIDBackDialogOpen);
  };

  const handleCompleteDlgOpen = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setCompleteDialogOpen(!isCompleteDialogOpen);
  };

  return (
    <>
      <Box
        component="img"
        src="/assets/images/splash/splash.svg"
        alt="Splash"
        width="100vw"
        height="100vh"
        sx={
          match
            ? {
                objectFit: 'cover',
                objectPosition: 'center',
              }
            : {}
        }
      />
      <LoginDialog isOpenDialog={isLoginOpenDialog} handleOpenDialog={handleLoginDialogOpen} />
      {/* ---------------- Forget Password ---------------- */}
      <OTPDialog isOpenDialog={isOTPOpenDialog} handleOpenDialog={handleOTPDialogOpen} />
      <VerifyOTPDialog
        isOpenDialog={isVerifyOTPDialogOpen}
        handleOpenDialog={handleVerifyOTPDialogOpen}
      />
      <ConfirmPasswordDialog
        isOpenDialog={isConfirmPassDialogOpen}
        handleOpenDialog={handleConfirmPassDlgOpen}
      />
      <ConfirmDialog isOpenDialog={isConfirmDialogOpen} handleOpenDialog={handleConfirmDlgOpen} />
      {/* ---------------- Apply membership ---------------- */}
      <ApplyMembershipDialog
        isOpenDialog={isApplyMembershipDialogOpen}
        handleOpenDialog={handleApplyMembershipDlgOpen}
      />
      <CheckMailDialog
        isOpenDialog={isCheckMailDialogOpen}
        handleOpenDialog={handleCheckMailDlgOpen}
      />
      <EmailVerifiedDialog
        isOpenDialog={isEmailVerifiedDialogOpen}
        handleOpenDialog={handleEmailVerifiedDlgOpen}
      />
      <UploadPhotoDialog
        isOpenDialog={isUploadPhotoDialogOpen}
        handleOpenDialog={handleUploadPhotoDlgOpen}
      />
      <UploadIDDialog
        isOpenDialog={isUploadIDDialogOpen}
        handleOpenDialog={handleUploadIDFrontDlgOpen}
        isFront
      />
      <UploadIDDialog
        isOpenDialog={isUploadIDBackDialogOpen}
        handleOpenDialog={handleUploadIDBackDlgOpen}
        isFront={false}
      />
      <CompleteApplicationDialog
        isOpenDialog={isCompleteDialogOpen}
        handleOpenDialog={handleCompleteDlgOpen}
      />
    </>
  );
}

SplashPage.propTypes = {
  stepName: PropTypes.string,
  uid: PropTypes.string,
  token: PropTypes.string,
};
