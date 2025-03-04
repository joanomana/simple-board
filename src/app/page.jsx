import Link from 'next/link'

export default function Login() {
  return(
    <div className="bg-gradient-to-r from-orange-400 to-yellow-400 h-screen flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-lg px-7 py-12 xl:w-1/3 md:w-100 2xl:w-2/6  ">
        <div className="flex flex-col gap-4 px-2">
          <div className="flex justify-center items-center gap-2">
            <img src="/Line.svg" alt="Line" className="" />
            <h1 className="text-3xl var(--font-montserrat) font-bold">CRUD OPERATIONS</h1>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            <h1 className="[var(--font-montserrat)] font-semibold">SIGN IN</h1>
            <p className="text-[#6C6C6C] [var(--font-montserrat)] font-regular">Enter your credentials to access your account</p>
          </div>
          <form
            className="text-[#6C6C6C] mt-5 gap-6 flex flex-col">
            <div className="flex flex-col gap-1">
              <h1 className="[var(--font-montserrat)] font-medium">Email</h1>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="border-gray-300 border p-2 w-full rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="[var(--font-montserrat)] font-medium">Password</h1>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="border-gray-300 border p-2 w-full rounded-lg"
              />
            </div>
            <Link className="flex justify-center bg-[#FEAF00] text-white p-2 rounded-lg [var(--font-montserrat)] font-medium" href='/index'>SIGN IN</Link>
              
            <div className="flex gap-1 items-center justify-center [var(--font-montserrat)] font-medium text-gray-400 ">
              <p>Forgot your password?</p>
              <a href="#" className="text-orange-400 underline">
                Reset Password
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}