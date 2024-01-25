interface IFormInput {
  label: string;
  id: string;
  name: string;
  type: 'text' | 'email' | 'password';
}


const FormInput = (props: IFormInput) => {
  const {label, id, name, type} = props;
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="mb-2">{label}</label>
      <input type={type} id={id} name={name} className="p-2 ring-1 ring-inset ring-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500" />
    </div>
  )
}

export default FormInput