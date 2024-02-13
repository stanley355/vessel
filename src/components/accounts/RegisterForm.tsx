'use client'
import { ToastContainer, toast } from 'react-toastify';

import FormInput from "../Forms/FormInput";
import FormPhoneInput from "../Forms/FormPhoneInput";

import { fetchAccountRegister } from "@/lib/api/account/fetchAccountRegister";
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {

  const handleAction = async (formData: FormData) => {
    
    const fullname = formData.get("fullname");
    const phoneNumber = formData.get("phone_number");
    const email = formData.get("email");
    const password = formData.get("password");
    const repassword = formData.get("repassword");

    if (!fullname || !phoneNumber) {
      toast.error("Harap lengkapi semua kolom");
      return;
    }

    const fullnameRegex = /^[a-zA-Z0-9. ]+$/;
    if (fullname && !fullnameRegex.test(String(fullname))) {
      toast.error("Nama Lengkap tidak valid")
      return;
    }

    const phoneRegex = /^((08)|8){1}[0-9]{1,15}$/;
    if (phoneNumber && !phoneRegex.test(String(phoneNumber))) {
      toast.error("Nomor telepon tidak valid")
      return;
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email && !emailRegex.test(String(email))) {
      toast.error("Email tidak valid")
      return;
    }

    const b = {
      fullname: "woi",
      phone_number: "8938398",
      email: "wojw@gm.com",
      password: "woi"
    }

    // console.log(formData.get("fullname"));
    const a = await fetchAccountRegister(b);
  }

  return (
    <form action={handleAction} className="mx-auto p-4 pt-0 mt-12 max-w-[400px]">
      <FormInput name="fullname" id="fullname_input" label="Nama Lengkap" type="text" />
      <FormInput name="email" id="email_input" label="Email" type="email" />
      <FormPhoneInput />
      <FormInput name="password" id="password_input" label="Password" type="password" />
      <FormInput name="repassword" id="repassword_input" label="Confirm Password" type="password" />
      <button type="submit" className="w-full p-2 bg-indigo-500 text-white rounded-md hover:font-bold hover:bg-indigo-600">
        Daftar
      </button>
      <ToastContainer position='top-center' />
    </form>
  )
}
export default RegisterForm;