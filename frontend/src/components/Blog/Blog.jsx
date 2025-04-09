import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const params = useParams();
  const { id } = params;
  const fetchBlog = async (id) => {
    try {
      const sending = await fetch(`http://localhost:3000/api/blog/${id}`);
      const blog = await sending.json();
      setBlog(blog);
    } catch (error) {
      console.log(`ERROR ${error}`);
    }
  };

  useEffect(() => {
    fetchBlog(id);
  }, [id]);
  return <div>{blog}</div>;
};

export default Blog;
