import React, { useContext, useEffect, useState } from "react";
import { TextInput } from "../Auth/TextInput";
import Textarea from "../Form/Textarea";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";

const EditBlog = () => {
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const {isAuthenticated} = useContext(UserContext); 
  const params = useParams();
  const { id } = params;
  const fetchBlog = async (id) => {
    const token = localStorage.getItem("token") || null;
    try {

      const sending = await fetch(`http://localhost:3000/api/blog/${id}`,{
        method:"GET",
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      const blog = await sending.json();
      setBlog(blog.blog);
      console.log(blog.blog)
    } catch (error) {
      console.log(`ERROR ${error}`);
    }
  };

  useEffect(() => {
    isAuthenticated ? fetchBlog(id) : navigate("/login")
   
  }, [id,navigate,isAuthenticated]);

  const initialErrors = {
    title: "",
    shortDescription: "",
    description: "",
    slug: "",
    published: "",
    image: "",
  };

  const [error, setError] = useState(initialErrors);
  const [data, setData] = useState({
    title: blog?.title || "",
    shortDescription:  blog?.shortDescription || "",
    description:  blog?.description || "",
    slug:  blog?.slug || "",
    published:  blog?.published ?? true,
  });
  const handelData = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setData((pre) => ({...pre, [name]:value}))
  }
  const handleFileChnage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  }
  useEffect(() => {
    if (blog) {
      setData({
        title: blog?.title || "",
        shortDescription: blog?.shortDescription || "",
        description: blog?.description || "",
        published: blog?.published ?? true, //nullish coalescing  operator only falls back to true if the value is null or undefined — not if it’s false.
        slug: blog?.slug || "",
      });
    }
  }, [blog]);

  const handelSubmit =async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("published", data.published);
    formData.append("shortDescription", data.shortDescription);
    formData.append("description", data.description);
    if (data.image) formData.append("image", data.image);

    console.log(formData)
       const token = localStorage.getItem("token") || null
        try {
          const sending = await fetch(`http://localhost:3000/api/update-blog/${id}`,{
            method:"PUT",
            headers:{
              Authorization:`Bearer ${token}`,
            },
            body:formData
          });
          const res = await sending.json();
          if(!sending.ok){
            setError(res.errors || initialErrors)
            toast.error(res.error)
            return;
          }
          toast.success(res.message);
          navigate('/blog')
        } catch (error) {
          console.log(`ERROR ${error}`);
        }
  }
  return (
    <div className="block w-2/3 mx-auto p-6 mt-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Edit Blog
      </h5>
      <form onSubmit={handelSubmit} encType="multipart/form-data">
        <TextInput
          label="Title"
          error={error.title}
          name="title"
          onChanage={handelData}
          placeholder="Enter title here"
          required={true}
          type="text"
          value={data.title}
        />
        <TextInput
          label="Slug"
          error={error.slug}
          name="slug"
          onChanage={handelData}
          placeholder="Enter slug"
          required={true}
          type="text"
          value={data.slug}
        />
        <TextInput
          label="Short Description"
          error={error.shortDescription}
          name="shortDescription"
          onChanage={handelData}
          placeholder="Enter short description"
          required={true}
          type="text"
          value={data.shortDescription}
        />
        <Textarea
          label="Description"
          error={error.description}
          name="description"
          onChanage={handelData}
          placeholder="Enter description"
          required={true}
          rows={4}
          value={data.description}
        />
         <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChnage}
            />
          </div>
          <div class="flex items-center">
            <input
              checked={data.published}
              id="checked-checkbox"
              type="checkbox"
              onChange={()=>(setData((pre)=>({...pre, published:!pre.published,})))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlForfor="checked-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Publish
            </label>
          </div>
        </div>
          <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
