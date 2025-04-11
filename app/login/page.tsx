"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Guarda los datos del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(session.user));

      // Redirige al menú principal
      router.push("/menu");
    }
  }, [status, session, router]);

  return (
    <div className='relative flex h-screen items-center justify-center bg-[var(--color-green)]'>
      {/* Fondo con imagen */}
      <Image
        src='/casino-table.png'
        alt='Mesa de casino'
        fill
        className='object-cover opacity-50'
      />

      {/* Contenedor del login */}
      <div className='relative z-10 flex flex-col items-center bg-[var(--color-beige)] p-8 rounded-2xl shadow-lg max-w-md text-center'>
        <h1 className='text-4xl font-extrabold text-[var(--color-red)] mb-2 italic uppercase -tracking-tighter'>
          Generala
        </h1>

        <h2 className='text-xl font-bold text-[var(--color-black)] mb-4'>
          Iniciar sesión
        </h2>

        {/* Botón de Google */}
        <Button
          className='mb-2'
          onClick={() => signIn("google")}
          backgroundColor='#DB4437'
          textColor='white'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 48 48'
            >
              <path
                fill='#FFC107'
                d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
          c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
          C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
              />
              <path
                fill='#FF3D00'
                d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039
          l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
              />
              <path
                fill='#4CAF50'
                d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
          c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
              />
              <path
                fill='#1976D2'
                d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
          c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24
          C44,22.659,43.862,21.35,43.611,20.083z'
              />
            </svg>
          }
        >
          Iniciar sesión con Google
        </Button>

        {/* Botón de Facebook */}
        <Button
          onClick={() => signIn("facebook")}
          backgroundColor='#1877F2'
          textColor='white'
          icon={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 30 30'
            >
              <path
                fill='white'
                d='M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099
          c0-3.475,1.693-5,4.581-5c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593
          L19.73,18.18h-3.106v8.697C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z'
              />
            </svg>
          }
        >
          Iniciar sesión con Facebook
        </Button>

        {/* Términos y condiciones */}
        <div className='mt-4 flex items-center'>
          <input type='checkbox' id='terms' className='mr-2' />
          <label htmlFor='terms' className='text-sm text-[var(--color-black)]'>
            Acepto los{" "}
            <a href='/terminos' className='text-[var(--color-red)] underline'>
              términos y condiciones
            </a>
          </label>
        </div>
      </div>
    </div>
  );
}
