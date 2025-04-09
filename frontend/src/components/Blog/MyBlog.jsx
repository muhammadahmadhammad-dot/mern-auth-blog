import React from 'react'

const MyBlog = () => {
  return (
    <div className='w-2/3 mx-auto p-6 mt-5'>
        <div className="grid grid-cols-2 my-2">
            <div>
                <h2 className='text-white font-medium text-2xl'>Your Blogs</h2>
            </div>
            <div className='flex justify-end'>
                <a className='px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 cursor-pointer'>Edit</a>

            </div>
        </div>
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
                    Action
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
                        <a className='px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 cursor-pointer'>Edit</a>
                        <a className='px-3 ms-2 py-2 bg-red-700 text-white rounded hover:bg-red-800 cursor-pointer'>Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default MyBlog