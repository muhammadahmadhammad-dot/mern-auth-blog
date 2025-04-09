import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const MyBlog = () => {
      const [blogs,setBlogs]=useState([]);
    
      const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem("token") || null
          const sending = await fetch("http://localhost:3000/api/my-blogs",{
            headers:{
                Authorization:`Bearer ${token}`
            }
          });
          const blogs = await sending.json()
          setBlogs(blogs.blogs)
          
        } catch (error) {
          console.log(`ERROR ${error}`)
        }
    
      }
    
      useEffect(()=>{
        fetchBlogs()
      },[])
  return (
    <div className='w-2/3 mx-auto p-6 mt-5'>
        <div className="grid grid-cols-2 my-2">
            <div>
                <h2 className='text-white font-medium text-2xl'>Your Blogs</h2>
            </div>
            <div className='flex justify-end'>
                <Link to={"create"} className='px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 cursor-pointer'>Create</Link>

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
                { blogs && blogs.map((blog)=>(
                <tr className='border-b text-center bg-gray-800 border-gray-200'>
                    <td className='px-6 py-3 text-white'>
                        {blog.title}
                    </td>
                    <td className='px-6 py-3 text-gray-400'>
                        {blog.shortDescription}
                    </td>
                    <td className='px-6 py-3 text-gray-400'>
                        <a className='px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 cursor-pointer'>Edit</a>
                        <a className='px-3 ms-2 py-2 bg-red-700 text-white rounded hover:bg-red-800 cursor-pointer'>Delete</a>
                    </td>
                </tr>

                ))}
            </tbody>
        </table>
    </div>
  )
}

export default MyBlog