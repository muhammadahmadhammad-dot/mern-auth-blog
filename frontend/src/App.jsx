import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function App() {
  const [blogs, setBlogs] = useState([]);
  const [authorName, setauthorName] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      const sending = await fetch("http://localhost:3000/api/blogs");
      const blogs = await sending.json();
      setBlogs(blogs.blogs);
    } catch (error) {
      console.log(`ERROR ${error}`);
    }
  };
  const fetchAuthors = async () => {
    try {
      const sending = await fetch("http://localhost:3000/api/all-users-name");
      const users = await sending.json();
      if (!sending.ok) {
        return;
      }
      setUsers(users.users);
    } catch (error) {
      console.log(`ERROR ${error}`);
    }
  };
  const fetchAuthorBlogs = async (id) => {
    try {
      const sending = await fetch(
        `http://localhost:3000/api/blogs/author/${id}`
      );
      const res = await sending.json();
      if (!sending.ok) {
        toast.error(res.message || res.error);
        return;
      }
      setauthorName(`${res.user[0]?.fname} ${res.user[0]?.lname}`);
      setBlogs(res.blogs || []);
    } catch (error) {
      console.log(`ERROR ${error}`);
    }
  };

  const fetchSearchBlogs = async (search) => {
    try {
      const sending = await fetch(
        `http://localhost:3000/api/blogs/search/${search}`
      );
      const res = await sending.json();
      if (!sending.ok) {
        toast.error(res.message || res.error);
        return;
      }
      setauthorName("");
      setBlogs(res.blogs);
    } catch (error) {
      console.log(`ERROR ${error}`);
    }
  };
  useEffect(() => {
    if (search != "") {
      fetchSearchBlogs(search);
    }
  }, [search]);
  useEffect(() => {
    fetchBlogs();
    fetchAuthors();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-1 w-11/12 mx-auto">
      <div className="col-span-3 mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          All {authorName} Blogs
        </h5>

        <div className="mb-3 grid grid-cols-3 gap-5">
          {blogs &&
            blogs.map((blog) => (
              <div
                key={blog._id}
                className=" p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <Link to={blog._id}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {blog.shortDescription}
                </p>
                <Link
                  to={"blog/" + blog._id}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                </Link>
              </div>
            ))}
        </div>
      </div>
      <div className="col-span-1">
        <div className="  mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Search Blog
          </h5>
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ..."
              required={true}
            />
          </div>
        </div>
        <div className=" mt-2 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filter By author
          </h5>
          <div>
            {users &&
              users.map((user) => (
                <div key={user._id}>
                  {" "}
                  <button
                    onClick={() => fetchAuthorBlogs(user._id)}
                    to={"blog/author/" + user._id}
                    className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                  >
                    {user.fname} {user.lname}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
