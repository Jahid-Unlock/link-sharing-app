import React from "react"


const FrontLayout = (
    {children} : 
    {
        children: React.ReactNode;
    }
) => {
  return (
    <div className='grid lg:grid-cols-2 gap-8 grid-cols-1 h-[calc(100vh-80px)] pt-5'>
        <div className="flex justify-center items-center p-8 bg-white rounded-sm shadow-sm">
            <img src="/images/phone.svg" alt="" />
        </div>
        <div className="bg-white shadow-sm overflow-y-scroll p-10">
           {children}
        </div>
    </div>
  )
}

export default FrontLayout