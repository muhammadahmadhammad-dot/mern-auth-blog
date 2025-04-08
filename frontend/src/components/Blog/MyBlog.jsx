import React from 'react'

const MyBlog = () => {
  return (
    <div className='w-2/3 mx-auto p-6 mt-5'>
        <table className='w-full'>
            <thead className='uppercase bg-gray-500 text-gray-700'>
                <tr>
                    <th className='px-6 py-3'>
                        Title
                    </th>
                    <th className='px-6 py-3'>
                        Short Description
                    </th>
                    <th className='px-6 py-3'>
                    Description
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className='border-b text-center bg-gray-800 border-gray-200'>
                    <td className='px-6 py-3 text-white'>
                        jkvbdjkbvdnv
                    </td>
                    <td className='px-6 py-3 text-gray-400'>
                        jkvbdjkbvdnv
                    </td>
                    <td className='px-6 py-3 text-gray-400'>
                        jkvbdjkbvdnv
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default MyBlog