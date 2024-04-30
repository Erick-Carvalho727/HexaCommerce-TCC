import RegisterForm from '@/components/auth/register-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <>
      <div>
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-white text-2xl font-semibold mb-3">
            Crie sua conta!
          </h1>
          <p className="text-sm font-normal text-cinzaClaro w-[365px] text-center">
            Insira os dados abaixo para criar sua conta
          </p>
        </div>

        <RegisterForm />

        <div className="flex items-center mt-6 justify-center">
          <h1 className="text-cinzaClaro font-normal text-sm">
            Já possui uma conta?
          </h1>
          <Button variant="link" className="text-white pl-2">
            <Link href={'/login'}>Faça o login!</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
