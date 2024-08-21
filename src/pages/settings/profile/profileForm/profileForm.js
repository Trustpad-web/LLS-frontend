import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
// next
// import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  MenuItem,
  Divider,
} from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// assets
import { getCountry } from '../../../../utils/country';
// components
import Label from '../../../../components/label';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFUploadAvatar } from '../../../../components/hook-form';
import { CustomLoginTextField } from '../../../../components/text-field';
import { CustomSelectTextField } from '../../../../components/text-field/CustomSelectTextField';
import CustomToogleButtom from './CustomToogleButtom';

// ----------------------------------------------------------------------

UserProfileForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserProfileForm({ isEdit = false, currentUser }) {
  // const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    birthday: Yup.date().required('Birthday is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Country is required'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstname: currentUser?.firstname || '',
      lastname: currentUser?.lastname || '',
      email: currentUser?.email || '',
      birthday: currentUser?.birthday || new Date(),
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      avatarUrl: currentUser?.avatarUrl || null,
      status: currentUser?.status,
      isPublic: currentUser?.isPublic || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    console.log('DATA', data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} xl={3}>
          {/* <Grid item xs={12} lg={3}> */}
          {isEdit && (
            <Label
              color={values.status === 'active' ? 'success' : 'error'}
              sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
            >
              {values.status}
            </Label>
          )}

          <Box sx={{ mb: 4 }}>
            <RHFUploadAvatar
              name="avatarUrl"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Box>

          {isEdit && (
            <FormControlLabel
              labelPlacement="start"
              control={
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value !== 'active'}
                      onChange={(event) =>
                        field.onChange(event.target.checked ? 'banned' : 'active')
                      }
                    />
                  )}
                />
              }
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Banned
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Apply disable account
                  </Typography>
                </>
              }
              sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
            />
          )}
          {/* </Grid> */}
          {/* <Grid item xs={12} lg={9} /> */}
        </Grid>

        <Grid item xs={12} xl={9}>
          <Stack sx={{ gap: { xs: 1, sm: 3 } }}>
            <Box
              sx={{ rowGap: { xs: 1, sm: 3 } }}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>First Name</Typography>
                <CustomLoginTextField
                  fullWidth
                  name="firstname"
                  placeholder="Enter first name."
                  imgSrc="/assets/icons/auth/ic_user.svg"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Last Name</Typography>
                <CustomLoginTextField
                  fullWidth
                  name="lastname"
                  placeholder="Enter last name."
                  imgSrc="/assets/icons/auth/ic_user.svg"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Email</Typography>
                <CustomLoginTextField
                  fullWidth
                  name="email"
                  placeholder="Enter email."
                  imgSrc="/assets/icons/auth/ic_email.svg"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Country</Typography>
                <CustomSelectTextField
                  name="country"
                  placeholder="Select country"
                  imgSrc="/assets/icons/setting/ic_map.svg"
                >
                  {getCountry().map((option) => (
                    <MenuItem key={option.code} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelectTextField>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Day of Birth</Typography>
                <CustomLoginTextField
                  fullWidth
                  name="birthday"
                  type="date"
                  minDate={new Date()}
                  placeholder="Enter the day of birth."
                  imgSrc="/assets/icons/payments/ic_calendar.svg"
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Phone Number</Typography>
                <CustomLoginTextField
                  type="phone"
                  name="phoneNumber"
                  placeholder="Enter phone number."
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>Privacy</Typography>
                <CustomToogleButtom name="isPublic" />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  You’re profile will only be visible to everyone
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed', mt: 3 }} />
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                backgroundColor: '#0F172A',
                color: 'white',
                borderRadius: 6,
                fontSize: 16,
                fontWeight: 400,
                py: 1,
                width: { xs: '100%', md: '50%' },
              }}
            >
              {!isEdit ? 'Save' : 'Save'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
