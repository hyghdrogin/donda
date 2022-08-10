const options = {
  stripUnknown: true,
  abortEarly: false,
};

const validate = (schemas: any, values: any) => {
  let error = [];
  for (let paramToValidate of Object.keys(schemas)) {
    const value = values[paramToValidate];
    if (value) {
      const schema = schemas[paramToValidate];
      let result = schema.validate(values[paramToValidate], options);
      if (result.error) {
        error.push(
          result.error.details.map(
            (detail:any) => detail.message
          )
        );
      } else {
        values[paramToValidate] = result.value;
      }
    } else {
      error.push(`${paramToValidate} missing`);
    }
  }
  if (error.length > 0) return { error: error.flat() };
  return {};
};

export default validate;
