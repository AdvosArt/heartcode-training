import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex flex-row mt-10 ml-auto mr-auto w-3/5 justify-center">
        <SignIn />
    </div>
)}