interface VulidateInterface {
  $invalid: boolean;
  $pending: boolean;
  $dirty: boolean;
  $touch: () => void;
}

export const getValidationClass = (form: any, fieldName: string) => {
  const field = form[fieldName];
  let error = false;
  if (field) {
    error = field.$invalid && !field.$pending && field.$dirty;
  }
  return {
    error,
  };
};

export const checkValidation = (form: VulidateInterface) => {
  form.$touch();
  return form.$invalid;
};
