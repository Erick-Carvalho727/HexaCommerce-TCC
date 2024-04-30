import LoginForm from '@/components/auth/login-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  return (
    <>
      <div>
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-white text-2xl font-semibold mb-3">Login</h1>
          <p className="text-sm font-normal text-cinzaClaro w-[365px] text-center">
            Insira seu email e senha para acessar sua conta
          </p>
        </div>

        <LoginForm />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-black"></span>
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-Preto px-2 text-muted-foreground">
              OU ENTRE COM
            </span>
          </div>
        </div>

        <Button variant="outline" className="w-full bg-Preto border-black">
          <FcGoogle />
        </Button>

        <div className="flex items-center mt-6 justify-center">
          <h1 className="text-cinzaClaro font-normal text-sm">
            Ainda não possui uma conta?
          </h1>
          <Button variant="link" className="text-white pl-2">
            <Link href={'/register'}>Crie sua conta!</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
