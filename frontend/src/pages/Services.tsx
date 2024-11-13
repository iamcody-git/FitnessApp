import React, { useEffect } from 'react'
import Card from './components/Card'
import { fetchPackage } from '../store/packageSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Link } from 'react-router-dom'

const Services = () => {
  const dispatch = useAppDispatch()
  const { status, packages} = useAppSelector((state) => state.package)
  
  useEffect(() => {
    dispatch(fetchPackage())
  }, [])

   console.log(packages)
   return (
    <>
      <section className="py-10" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Available Packages</h2>
        </div>
        <div className='flex m-5 p-3 space-x-4 justify-center'>
          { packages.length > 0 && (
            packages.map((pd) => (
              <Card key={pd.id} data={pd} />
            ))
          )}
        </div>
        <div className="container mx-auto px-4 flex justify-center items-center">
    <Link 
        to="/userprofile" 
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
        Customize My Own WorkoutPlan
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </Link>
</div>
        
      </section>
    </>
  )
}

export default Services