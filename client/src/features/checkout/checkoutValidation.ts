import * as yup from 'yup';

export const validationSchema = [
  // address page
  yup.object({
    fullName: yup.string().required('Full name is required'),
    address1: yup.string().required('Addres line 1 is required'),
    address2: yup.string().required('Addres line 2 is required'),
    city: yup.string().required(),
    state: yup.string().required(),
    zipcode: yup.string().required(),
    country: yup.string().required(),
  }),
  // review page
  yup.object(),
  // payment card page
  yup.object({
    nameOnCard: yup.string().required()
  }),
] 