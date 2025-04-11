"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className='text-center mt-10'>Cargando...</p>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold'>Bienvenido, {session.user?.name}</h1>
    </div>
  );
}
