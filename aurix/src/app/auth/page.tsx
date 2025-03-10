import React from 'react'

function page() {

  return (
    <section className="bg-gradient-to-tr from-sky-200 to-blue-500 min-h-screen min-w-screen transition-all duration-500 hover:from-blue-500 hover:to-sky-200 flex flex-col justify-center items-center">
      {/* Form */}
      <form className="bg-transparent bg-white p-8 border-2 border-purple-600 rounded-xl w-fit h-fit" action="">
        <article className='text-center flex flex-col items-center justify-center'>
          <h2 className="font-semibold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">Welcome Back</h2>
          <p className='text-slate-600'>Let's get you signed in</p>
        </article>

        {/* Fields */}

      </form>
    </section>
  )
}

export default page
