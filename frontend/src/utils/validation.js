export function validate() {
  const options = { abortEarly: false };
  const { error } = this.schema.validate(this.state.data, options);
  if (!error) return null;
  const errors = {};
  error.details.map((item) => {
    errors[item.path[0]] = item.message;
  });
  return errors;
}

export function validateProperty({ name, value }) {
  const obj = { [name]: value };
  const { error } = this.schema.validate(obj);
  return error ? error.details[0].message : null;
}

export function handleChange({ currentTarget: input }) {
  const errors = { ...this.state.errors };
  const errorMessage = this.validateProperty(input);
  if (errorMessage) errors[input.name] = errorMessage;
  else delete errors[input.name];

  const data = { ...this.state.data };
  data[input.name] = input.value;

  this.setState({ data, errors });
}
