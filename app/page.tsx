import Image from "next/image";

export default async function Home() {
  return (
     <main className="flex min-h-screen flex-col items-center p-24">

      <Image src="/next.svg" alt="logo" width={100} height={100}/>

      <h1 className="text-4xl font-bold pt-[20px]">Welcome to Next.js!</h1>
    </main>
  );
}
