import Image from 'next/image';
import RegisterForm from '@/components/accounts/RegisterForm';

const RegisterPage = async () => {

  return (
    <div className='container mx-auto'>
      <Image src={"/next.svg"} alt="travel" width={100} height={100} className="mx-auto my-8" />
      <div className="text-center text-3xl font-bold ">Daftar</div>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage; 