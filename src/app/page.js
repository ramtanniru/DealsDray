import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="flex flex-col gap-5 justify-center items-center w-1/2">
        <Image src={"assets/dashboard.svg"} width={960} height={630} alt="dashboard"/>
        <p className="text-black font-semibold">Welcome to Admin Panel</p>
      </div>
    </div>
  );
}
