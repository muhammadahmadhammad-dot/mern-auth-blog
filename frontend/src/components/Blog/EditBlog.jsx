import React, { useState } from "react";
import { TextInput } from "../Auth/TextInput";
import Textarea from "../Form/Textarea";

const EditBlog = () => {
  const initialErrors = {
    title: "",
    shortDescription: "",
    description: "",
  };

  const [error, setError] = useState(initialErrors);
  const [data, setData] = useState({
    title: "",
    shortDescription: "",
    description: "",
  });

  const handelData = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setData((pre) => ({...pre, [name]:value}))
  }
  return (
    <div className="block w-2/3 mx-auto p-6 mt-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Edit Blog
      </h5>
      <form>
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
