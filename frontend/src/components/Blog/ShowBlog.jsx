import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const ShowBlog = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();
    const { id } = params;
    const fetchBlog = async (slug) => {
        const token = localStorage.getItem("token") || null;
      try {
        const sending = await fetch(`http://localhost:3000/api/blog/${slug}`,{
            method:"GET",
            headers:{
              Authorization: `Bearer ${token}`,
            }
        });
        const blog = await sending.json();
        setBlog(blog.blog);
        console.log(blog);
      } catch (error) {
        console.log(`ERROR ${error}`);
      }
    };
  
    useEffect(() => {
      fetchBlog(id);
    }, [id]);
  return (
    <div className="w-9/12 mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div>
      <img src={`http://localhost:3000/api/uploads/${blog.featureImage}`} alt="" />
    </div>
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {blog.title}
    </h5>

    <p className="mb-3 font-normal text-gray-400">{blog.shortDescription}</p>
    <p className="mb-3 font-normal text-gray-400">{blog.description}</p>
  </div>
  )
}

export default ShowBlog