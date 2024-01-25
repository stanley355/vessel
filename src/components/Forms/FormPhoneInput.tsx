
const FormPhoneInput = () => {
  return (
    <div className="mb-4">
      <label htmlFor="phone_number_input">No. Telepon</label>
      <div className="flex gap-2">
        <div className="border border-gray-300 flex items-center p-2 rounded-md">+62</div>
        <input type={'text'} id={'phone_number_input'} name={'phone_number'} className="p-2 ring-1 ring-inset ring-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 w-[90%]" />
      </div>
    </div>
  )
}

export default FormPhoneInput