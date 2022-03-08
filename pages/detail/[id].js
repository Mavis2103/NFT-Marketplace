
import { useRouter } from 'next/router'
import React from 'react'
export default function id() {

    const router = useRouter()
    const { id } = router.query

    return (
        <main className="px-52 my-10">
            <div className='grid grid-cols-12'>
                <div className='col-span-5 mr-10'>
                    <div className=' w-full h-full'>
                        <div className="card w-full bg-base-100 shadow-xl border-2 border-black">
                            <figure>
                                <img src="https://api.lorem.space/image/shoes?h=600" alt="Shoes"/>
                                    </figure>
                            <div className="card-body">
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Fashion</div>
                                    <div className="badge badge-outline">Products</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-7'>
                    <div className='w-full h-96'>
                    <div className='w-full h-20'>
                        <div className='flex flex-row '>
                        <span className='text-2xl font-medium text-gray-300 w-3/4'>
                            Collection
                        </span>
                                <div className="btn-group w-1/4 ">
                                    <button className="btn border-2 border-gray-400">B</button>
                                    <button className="btn border-2 border-gray-400">B</button>
                                    <button className="btn border-2 border-gray-400">B</button>
                                    <button className="btn border-2 border-gray-400">B</button>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-4xl font-medium text-white w-full mb-3'>
                                What F*** this Shoes #xxx
                            </span>
                            <span className='text-base font-thin flex flex-row'>
                                    Owned by UserXXX
                                    
                                    <span className='ml-10 w-40 flex flex-row'>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                    </svg>
                                    15 favorites
                                    </span>
                            </span>
                        </div>
                            <div className='flex flex-col w-full border-2 border-black rounded-lg mt-5'>
                                <div className='px-5 py-5 bg-gray-700 rounded-lg'>
                                <span>
                                Sale ends March 11, 2022 at 10:48am +07 
                                </span>
                                </div>
                                <div className='px-5 py-5 flex flex-col'>
                                    <span className='font-semibold text-xl'>
                                        Current price
                                   </span>
                                   <span className='font-bold text-3xl text-white flex flex-row  items-end'>
                                        <img alt="ETH" className='w-8 h-7' src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"></img>
                                        0.03
                                    <span className='font-thin text-base text-slate-300 ml-3'>($75.39)</span>
                                   </span>
                                    <div className='mt-5'>
                                        <button className="btn btn-info btn-wide gap-2 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
                                            </svg> 
                                           <span className='font-sans'>Buy now</span>
                                        </button>
                                        <button className="btn btn-wide gap-2 ml-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                            </svg>
                                            <span className='font-sans'>Make offer</span>
                                        </button>
                                    </div>

                                </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
