import React, { useContext, useEffect, useState } from "react";
import { TextInput } from "../Auth/TextInput";
import Textarea from "../Form/Textarea";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import UserContext from "../../context/UserContext";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext);
  const initialErrors = {
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    published: "",
  };

  const [error, setError] = useState(initialErrors);
  const [data, setData] = useState({
    title: "",
    slug:"",
    shortDescription: "",
    description: "",
    image: null,
    published:true
  });

 
  const handelData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    if (name == 'title') {
      const slug =  value.toLowerCase().trim()
              .replace(/\s+/g, '-') // replace space
              .replace(/-+/g, '-'); // replace multiple hyphens with one hyphen
      setData((pre) => ({ ...pre, slug: slug }));

    }

    setData((pre) => ({ ...pre, [name]: value }));
  };
  const handleFileChnage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    // FormData is useful for upload files/images and combine text and files fields in a single request
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("published", data.published);
    formData.append("shortDescription", data.shortDescription);
    formData.append("description", data.description);
    if (data.image) formData.append("image", data.image);

    const token = localStorage.getItem("token") || null;
    try {
      const sending = await fetch(`http://localhost:3000/api/create-blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type":"application/json" // no need in FormData
        },
        // body:JSON.stringify(data) // no need in FormData
        body: formData,
      });
      const res = await sending.json();
      if (!sending.ok) {
        setError(res.errors || initialErrors);
        toast.error(res.error);
        return;
      }
      toast.success(res.message);
      navigate("/blog");
    } catch (error) {
      console.log(`ERROR ${error}`);
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="block w-2/3 mx-auto p-6 mt-5">
     <div className="grid grid-cols-2 gap-5">
      <div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Create Blog
      </h5>
      </div>
      <div className="text-end">
        <Link to={"/blog"} className="px-3 py-2 text-gray-200 rounded-lg bg-red-600 hover:bg-red-500">Back</Link>
                
      </div>
     </div>
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
          <label
        htmlFor="image"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Feature Image
       
      </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
