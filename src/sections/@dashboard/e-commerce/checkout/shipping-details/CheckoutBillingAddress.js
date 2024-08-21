import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import {
  Grid,
  Card,
  Button,
  Typography,
  Stack,
  Box,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Paper,
  CardHeader,
  Divider,
} from '@mui/material';
// _mock
import { _addressBooks } from '../../../../../_mock/arrays';
// components
import Label from '../../../../../components/label';
import Iconify from '../../../../../components/iconify';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutBillingInfo from '../CheckoutBillingInfo';
import CheckoutBillingNewAddressForm from './CheckoutBillingNewAddressForm';

// ----------------------------------------------------------------------

CheckoutBillingAddress.propTypes = {
  checkout: PropTypes.object,
  onBackStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function CheckoutBillingAddress({ checkout, onBackStep, onCreateBilling }) {
  const { total, discount, subtotal } = checkout;

  const [open, setOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedAddress, setSelectedAddress] = useState({});

  useEffect(() => {
    const defaultAddressId = _addressBooks.filter((item) => item.isDefault === true);
    setSelectedAddressId(defaultAddressId[0].id);
    setSelectedAddress(defaultAddressId[0]);
  }, []);

  const setBillingAddressId = (address) => {
    setSelectedAddressId(address.id);
    setSelectedAddress(address);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8.5} lg={8}>
          {!open ? (
            <>
              <Card sx={{ mb: 3, boxShadow: 'none' }}>
                <CardHeader
                  title={
                    <>
                      <Typography variant="h6">Shipping Details</Typography>
                      <Typography variant="body2">Please select the shipping details</Typography>
                    </>
                  }
                  sx={{ mb: 3 }}
                />
                <Divider sx={{ width: '100%', mb: 3 }} />
                {_addressBooks.map((address, index) => (
                  <AddressItem
                    key={index}
                    address={address}
                    clickedAddressId={selectedAddressId}
                    onCreateBilling={() => onCreateBilling(address)}
                    onSelectBilling={() => {
                      setBillingAddressId(address);
                    }}
                  />
                ))}
              </Card>
              <Stack direction="row" justifyContent="space-between">
                <Button
                  color="inherit"
                  onClick={onBackStep}
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  sx={{ borderRadius: 20, padding: '10px 16px' }}
                >
                  Back
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleOpen}
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  sx={{ borderRadius: 20, padding: '10px 16px' }}
                >
                  Add new address
                </Button>
              </Stack>
            </>
          ) : (
            <CheckoutBillingNewAddressForm
              // open
              isNew
              onClose={handleClose}
              onCreateBilling={onCreateBilling}
            />
          )}
        </Grid>

        <Grid item xs={12} md={3.5} lg={4}>
          <Stack spacing={4}>
            <CheckoutBillingInfo onBackStep={onBackStep} billing={selectedAddress} />
            <CheckoutSummary
              enableEdit
              onEdit={onBackStep}
              subtotal={subtotal}
              total={total}
              discount={discount}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={selectedAddressId === ''}
              onClick={() => onCreateBilling(selectedAddress)}
              sx={{
                backgroundColor: '#0F172A',
                color: 'white',
                borderRadius: 6,
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              Confirm Payment details.
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* <CheckoutBillingNewAddressForm
        open={open}
        isNew
        onClose={handleClose}
        onCreateBilling={onCreateBilling}
      /> */}
    </>
  );
}

// ----------------------------------------------------------------------

AddressItem.propTypes = {
  address: PropTypes.object,
  clickedAddressId: PropTypes.string,
  onCreateBilling: PropTypes.func,
  onSelectBilling: PropTypes.func,
};

function AddressItem({ address, clickedAddressId, onCreateBilling, onSelectBilling }) {
  const { id, receiver, fullAddress, addressType, phoneNumber, isDefault } = address;

  return (
    // <Card
    //   sx={{
    //     p: 3,
    //     mb: 3,
    //     background: clickedAddressId === id && theme.palette.primary.light,
    //   }}
    // >
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 3,
        marginBottom: 3,
        borderRadius: 3,
        // eslint-disable-next-line no-shadow
        transition: (theme) => theme.transitions.create('all'),
        ...(clickedAddressId === id && {
          // eslint-disable-next-line no-shadow
          boxShadow: (theme) => theme.customShadows.z20,
        }),
      }}
    >
      <Stack
        spacing={2}
        width="100%"
        justifyContent="space-between"
        alignItems={{
          md: 'flex-end',
        }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Stack flexGrow={1} spacing={1}>
          <FormControl component="fieldset">
            <RadioGroup
              defaultValue={clickedAddressId}
              value={clickedAddressId}
              onChange={onSelectBilling}
              sx={{ flexDirection: 'row' }}
            >
              <FormControlLabel
                key={clickedAddressId}
                value={id}
                control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
                label={
                  <Stack>
                    <Stack direction="row" alignItems="center">
                      <Typography variant="subtitle1">
                        {receiver}
                        <Box
                          component="span"
                          sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}
                        >
                          ({addressType})
                        </Box>
                      </Typography>

                      {isDefault && (
                        <Label color="info" sx={{ ml: 1 }}>
                          Default
                        </Label>
                      )}
                    </Stack>

                    <Typography variant="body2">{fullAddress}</Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {phoneNumber}
                    </Typography>
                  </Stack>
                }
              />
            </RadioGroup>
          </FormControl>
        </Stack>

        <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
          {!isDefault && (
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 1, borderRadius: 20, padding: '10px 16px' }}
            >
              Delete
            </Button>
          )}

          <Button
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 20, padding: '10px 16px' }}
          >
            Edit Details
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
