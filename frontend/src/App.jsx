import { useEffect, useState } from "react";
import {Link} from "react-router-dom" 
function App() {
  const [blogs,setBlogs]=useState([]);

  const fetchBlogs = async () => {
    try {
      const sending = await fetch("http://localhost:3000/api/blogs");
      const blogs = await sending.json()
      setBlogs(blogs)
      
    } catch (error) {
      console.log(`ERROR ${error}`)
    }

  }

  useEffect(()=>{
    fetchBlogs()
  },[])
  return (
    <div className="w-9/12 mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          All Blogs
        </h5>
      </a>
      <div className="mb-3 grid grid-cols-3 gap-5">
        {
          blogs && blogs.map((blog)=>(
            <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Link to="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blog.title}
              </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {blog.shortDescription}
            </p>
            <Link
              to="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
            </Link>
          </div>
          ))
        }
       
      </div>
    </div>
  );
}

export default App;
