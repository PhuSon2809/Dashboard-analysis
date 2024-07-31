import * as yup from 'yup'
import { VALIDATION_CONTENT } from '~/constants/validationContent'

function useValidationForm() {
  const schemaReceiveProduct = yup.object({
    firstName: yup
      .string()
      .required(VALIDATION_CONTENT.REQUIRED('first name'))
      .matches(/^[^\d]*$/, 'First name must not contain numbers'),
    lastName: yup
      .string()
      .required(VALIDATION_CONTENT.REQUIRED('last name'))
      .matches(/^[^\d]*$/, 'Last name must not contain numbers'),
    email: yup.string().required(VALIDATION_CONTENT.REQUIRED('email')).email(VALIDATION_CONTENT.EMAIL_FORMAT),
    country: yup
      .string()
      .required(VALIDATION_CONTENT.SELECT('country'))
      .typeError(VALIDATION_CONTENT.SELECT('country')),
    stateOrProvince: yup
      .string()
      .required(VALIDATION_CONTENT.SELECT('province'))
      .typeError(VALIDATION_CONTENT.SELECT('province')),
    phone: yup
      .string()
      .min(10, 'Phone number must be ten digits')
      .max(10, 'Phone number must be ten digits')
      .required(VALIDATION_CONTENT.REQUIRED('phone number'))
      .matches(/^\d+$/, 'Phone number must contain only digits.')
      .matches(/^((0|\+84)(3|5|7|8|9))[0-9]{8}$/, 'Phone number is invalid.'),
    addressDetail: yup.string().required(VALIDATION_CONTENT.REQUIRED('address detail')),
    paymentMethod: yup.string().required(VALIDATION_CONTENT.SELECT('payment method')),
    cardNumber: yup.string().required(VALIDATION_CONTENT.REQUIRED('card number')).length(16, 'Invalid card number'),
    expirationDate: yup
      .string()
      .required('Expiry date is required')
      .test('valid-month', 'Invalid month', function (value) {
        if (!value) {
          return false
        }
        const [month] = value.split('/').map((item) => parseInt(item, 10))
        return month >= 1 && month <= 12
      })
      .test('is-future-date', 'Expiry date must be in the future', function (value) {
        if (!value) {
          return false
        }
        const currentDate = new Date()
        const [month, year] = value.split('/').map((item) => parseInt(item, 10))
        const expiryDate = new Date(year + 2000, month, 1)
        return expiryDate > currentDate
      }),
    cvv: yup
      .string()
      .matches(/^[0-9]{3,4}$/, 'Invalid CVV')
      .length(3, 'CVV has only 3 digits')
      .required(VALIDATION_CONTENT.REQUIRED('CVV')),
    nameOnCard: yup.string().required(VALIDATION_CONTENT.SELECT('name on card')),
    walletId: yup.string().required(VALIDATION_CONTENT.SELECT('wallet'))
  })

  const schemaStorageForResale = yup.object({
    paymentMethod: yup.string().required(VALIDATION_CONTENT.SELECT('payment method')),
    cardNumber: yup.string().required(VALIDATION_CONTENT.REQUIRED('card number')).length(16, 'Invalid card number'),
    expirationDate: yup
      .string()
      .required('Expiry date is required')
      .test('valid-month', 'Invalid month', function (value) {
        if (!value) {
          return false
        }
        const [month] = value.split('/').map((item) => parseInt(item, 10))
        return month >= 1 && month <= 12
      })
      .test('is-future-date', 'Expiry date must be in the future', function (value) {
        if (!value) {
          return false
        }
        const currentDate = new Date()
        const [month, year] = value.split('/').map((item) => parseInt(item, 10))
        const expiryDate = new Date(year + 2000, month, 1)
        return expiryDate > currentDate
      }),
    cvv: yup
      .string()
      .matches(/^[0-9]{3,4}$/, 'Invalid CVV')
      .length(3, 'CVV has only 3 digits')
      .required(VALIDATION_CONTENT.REQUIRED('CVV')),
    nameOnCard: yup.string().required(VALIDATION_CONTENT.SELECT('name on card')),
    walletId: yup.string().required(VALIDATION_CONTENT.SELECT('wallet'))
  })

  const schemaAddAddress = yup.object({
    country: yup.string().required(VALIDATION_CONTENT.SELECT('country')),
    stateOrProvince: yup.string().required(VALIDATION_CONTENT.SELECT('province')),
    addressDetail: yup.string().required(VALIDATION_CONTENT.REQUIRED('address detail'))
  })

  const schemaAddCard = yup.object({
    cardNumber: yup.string().required(VALIDATION_CONTENT.REQUIRED('card number')),
    expirationDate: yup.string().required(VALIDATION_CONTENT.SELECT('expiration date')),
    cvv: yup.number().typeError(VALIDATION_CONTENT.REQUIRED('cvv')).required(VALIDATION_CONTENT.REQUIRED('cvv')),
    nameOnCard: yup.string().required(VALIDATION_CONTENT.SELECT('name on card'))
  })

  const schemaRegisterRetailer = yup.object({
    fullName: yup
      .string()
      .required(VALIDATION_CONTENT.REQUIRED('user name'))
      .matches(/^[^\d]*$/, 'User name must not contain numbers'),
    phoneNumber: yup
      .string()
      .min(10, 'Phone number must be ten digits')
      .max(10, 'Phone number must be ten digits')
      .required(VALIDATION_CONTENT.REQUIRED('phone number'))
      .matches(/^\d+$/, 'Phone number must contain only digits.')
      .matches(/^((0|\+84)(3|5|7|8|9))[0-9]{8}$/, 'Phone number is invalid.')
  })

  return {
    schemaReceiveProduct,
    schemaStorageForResale,
    schemaAddAddress,
    schemaAddCard,
    schemaRegisterRetailer
  }
}

export default useValidationForm
