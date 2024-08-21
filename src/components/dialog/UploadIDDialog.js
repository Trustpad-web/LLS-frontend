import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, DialogContent, Typography, Stack, LinearProgress } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';
// next
import { useRouter } from 'next/router';
// components
import BaseDialog from './BaseDialog';
import { LoginButton } from '../button';
import { UploadBox } from '../upload';
// config
import { PATH_PAGE } from '../../routes/paths';
import { LOGIN_STEPS } from '../../config-global';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey,
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#5ACC5A',
  },
}));

export default function UploadIDDialog({ isOpenDialog, handleOpenDialog, isFront = true }) {
  const theme = useTheme();
  const router = useRouter();

  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [uploading, setUploading] = React.useState(0); // 0: initial status, 1: Uploading, 2: Upload success, 3: Upload fail
  const [progress, setProgress] = React.useState(0);

  const handleDropSingleFile = React.useCallback(async (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
  }, []);

  const uploadFile = React.useCallback(async () => {
    if (!file) return;
    console.log(file);
    setUploading(1);
    const res = await new Promise((resolve) => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            resolve(timer);
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
    });
    clearInterval(res);
    setUploading(2);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUploading(0);
    setProgress(0);
  }, [file]);

  React.useEffect(() => {
    uploadFile();
  }, [uploadFile]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    handleOpenDialog();
    router.push(
      PATH_PAGE.users.loginSteps(isFront ? LOGIN_STEPS.UPLOAD_ID_BACK : LOGIN_STEPS.COMPLETE)
    );
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
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '32.4px',
              letterSpacing: '-0.01em',
              textAlign: 'center',
            }}
          >
            Identity Verification
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography
              sx={{
                fontWeight: '300',
                fontSize: '16px',
                lineHeight: '24px',
                textAlign: 'center',
              }}
            >
              Please upload the <b style={{ fontWeight: '600' }}>{isFront ? 'FRONT' : 'BACK'}</b> of
              your ID or NIC
            </Typography>
            <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <UploadBox
                sx={{
                  height: '125px',
                  width: '100%',
                  flexShrink: '1',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  borderColor: '#94A3B8',
                  margin: '0px',
                  opacity: '1',
                  overflow: 'hidden',
                  color: theme.palette.primary.contrastText,
                  ':hover': {
                    '& .css-9uy14h': {
                      width: '32px',
                      height: '32px',
                    },
                    backgroundColor: '#F1F5F9',
                    color: theme.palette.primary.contrastText,
                    ...(uploading === 0
                      ? { opacity: '0.72' }
                      : { opacity: '1', backgroundColor: '#FFFFFF' }),
                  },
                  ...(uploading !== 0 ? { borderColor: '#475569', borderStyle: 'solid' } : {}),
                }}
                placeholder={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginY: 'auto',
                      }}
                    >
                      <Stack
                        sx={{
                          gap: '8px',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {uploading === 0 && (
                          <Box
                            component="img"
                            src="/assets/icons/auth/ic_upload.svg"
                            sx={{
                              width: '24px',
                              height: '24px',
                            }}
                          />
                        )}
                        {uploading === 2 && (
                          <Box
                            component="img"
                            src="/assets/success.gif"
                            style={{ width: '64px', height: '64px', marginInline: 'auto' }}
                          />
                        )}
                        <Typography
                          sx={{
                            fontWeight: '600',
                            fontSize: '14px',
                            lineHeight: '21px',
                            textAlign: 'center',
                          }}
                        >
                          {uploading === 0 && 'Upload a Picture'}
                          {uploading === 1 && 'Uploading'}
                          {uploading === 2 && 'Files uploaded successfully.'}
                        </Typography>
                        {uploading === 1 && (
                          <Typography
                            sx={{
                              fontWeight: '400',
                              fontSize: '12px',
                              lineHeight: '18px',
                              textAlign: 'center',
                            }}
                          >
                            Please wait while we upload your files
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                    {uploading !== 0 && (
                      <BorderLinearProgress variant="determinate" value={progress} />
                    )}
                  </Box>
                }
                onDrop={handleDropSingleFile}
                disabled={uploading !== 0}
              />
              <Box
                sx={{
                  height: '125px',
                  width: '100%',
                  flexShrink: '1',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
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

UploadIDDialog.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  isFront: PropTypes.bool,
};
