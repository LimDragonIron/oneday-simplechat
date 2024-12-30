import Menu from "@/components/Navbar"
import Link from "next/link";
import Image from "next/image";

const DashboardLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex h-screen'>
      <div className='w-[14%] p-4 md:w-[8%] lg:w-[16%] xl:w-[14%]'>
        <Link
          href="/main"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <span className="hidden lg:block font-bold">Sample Chat</span>
        </Link>
        <Menu />
      </div>
      <div className='flex w-[86%] flex-col overflow-scroll bg-[#F7F8FA] md:w-[92%] lg:w-[84%] xl:w-[86%]'>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
