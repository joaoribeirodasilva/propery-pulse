import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const PropertyHeaderImage = ({ image }) => {
  return (
    
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            width={0}
            height={0}
            sizes='100vw'
            className="object-cover h-[400px] w-full"
            priority={true}
          />
          {/* <!-- Go Back --> */}
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className='mr-2' /> Back to Properties
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default PropertyHeaderImage