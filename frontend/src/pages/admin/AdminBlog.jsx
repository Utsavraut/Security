import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import AdminSidebar from './AdminSidebar';

const AdminBlog = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [blogs, setBlogs] = useState([
        { id: 1, title: "Sample Blog 1", author: "Author 1", description: "This is a sample blog description" },
        { id: 2, title: "Sample Blog 2", author: "Author 2", description: "Another sample blog description" },
    ]);

    const [blogTitle, setBlogTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <AdminSidebar>
            <div className="w-full sm:px-6">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                            Blogs
                        </p>
                        <button
                            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                            onClick={toggleModal}
                        >
                            Add Blog
                        </button>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-left pl-4">Blog Title</th>
                                <th className="font-normal text-left pl-12">Author</th>
                                <th className="font-normal text-left pl-12">Description</th>
                                <th className="font-normal text-left pl-12">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                    <td className="pl-4">{blog.title}</td>
                                    <td className="pl-12">{blog.author}</td>
                                    <td className="pl-12">{blog.description}</td>
                                    <td className="px-7 2xl:px-0">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                        <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    onClick={toggleModal}
                                    className="text-black bg-gray-200 hover:bg-gray-300 rounded-lg text-sm p-1.5"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            <form className="space-y-6">
                                <h3 className="text-lg font-medium leading-6 text-gray-900 text-center font-semibold text-2xl">
                                    Add New Blog
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="Blog" className="block text-sm font-medium text-gray-900">
                                            Blog Title
                                        </label>
                                        <input
                                            value={blogTitle}
                                            onChange={(e) => setBlogTitle(e.target.value)}
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 p-2.5"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="Blog" className="block text-sm font-medium text-gray-900">
                                            Author
                                        </label>
                                        <input
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 p-2.5"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="Blog" className="block text-sm font-medium text-gray-900">
                                            Description
                                        </label>
                                        <input
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            type="text"
                                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 p-2.5"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { console.log("Blog added") }}
                                    className="w-full bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Add Blog
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminSidebar>
    );
};
export default AdminBlog;