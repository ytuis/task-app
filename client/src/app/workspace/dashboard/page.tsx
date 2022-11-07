import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Image from "next/image"

const Page = async () => {
  const session = await unstable_getServerSession(authOptions)
  const { user } = session!
  return (
    <div className="flex flex-col p-4 md:w-10/12 mx-auto">
      <div className={`flex justify-center m-8`}>
        <Image src={user?.image!} width="120" height="120" alt="user_image" className="m-4 rounded-full" />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-light text-center">{user?.name}</h1>
      </div>
      <div className="w-full max-w-[868px] mx-auto p-4">
        {JSON.stringify(user)}
      </div>
    </div>
  );
};

export default Page
