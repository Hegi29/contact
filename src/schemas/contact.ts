import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  age: yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required('Required'),
  photo: yup.string().required('Required'),
});

export default schema