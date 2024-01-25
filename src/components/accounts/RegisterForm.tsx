'use client'
import { fetchAccountRegister } from "@/lib/api/account/fetchAccountRegister";
import FormInput from "../Forms/FormInput";
import FormPhoneInput from "../Forms/FormPhoneInput";

const RegisterForm = () => {

  const handleAction = async (formData: FormData) => {
    const b = {
      fullname: "woi",
      phone_number: "8938398",
      email: "wojw@gm.com",
      password: "woi"
    }

    const a = await fetchAccountRegister(b);
  }

  return (
    <form action={handleAction} className="mx-auto w-[400px] mt-12">
      <FormInput name="fullname" id="fullname_input" label="Nama Lengkap" type="text" />
      <FormInput name="email" id="email_input" label="Email" type="email" />
      <FormPhoneInput />
      <FormInput name="password" id="password_input" label="Password" type="password" />
      <FormInput name="repassword" id="repassword_input" label="Confirm Password" type="password" />
      <button type="submit" className="w-full p-2 bg-indigo-500 text-white rounded-md hover:font-bold hover:bg-indigo-600">
        Daftar
      </button>
    </form>
  )
}
export default RegisterForm;