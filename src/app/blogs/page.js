import React from "react";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported

// Sample array of blog objects
const blogs = [
  {
    id: 1,
    title: "Don’t search for a job, let the job find you",
    imageUrl: "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Wgi_h3GykmD0YTl_x5Ahww.png",
    description: "This is the first blog description.",
    url: "https://medium.com/stackademic/my-interview-experience-for-an-sde-2-frontend-position-at-zepto-104bf8b61ae1",
  },
  {
    id: 1,
    title: "Don’t search for a job, let the job find you",
    imageUrl: "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Wgi_h3GykmD0YTl_x5Ahww.png",
    description: "This is the first blog description.",
    url: "https://medium.com/stackademic/my-interview-experience-for-an-sde-2-frontend-position-at-zepto-104bf8b61ae1",
  },
  {
    id: 1,
    title: "Don’t search for a job, let the job find you",
    imageUrl: "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Wgi_h3GykmD0YTl_x5Ahww.png",
    description: "This is the first blog description.",
    url: "https://medium.com/stackademic/my-interview-experience-for-an-sde-2-frontend-position-at-zepto-104bf8b61ae1",
  },
  {
    id: 1,
    title: "Don’t search for a job, let the job find you",
    imageUrl: "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Wgi_h3GykmD0YTl_x5Ahww.png",
    description: "This is the first blog description.",
    url: "https://medium.com/stackademic/my-interview-experience-for-an-sde-2-frontend-position-at-zepto-104bf8b61ae1",
  },
  {
    id: 1,
    title: "Don’t search for a job, let the job find you",
    imageUrl: "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Wgi_h3GykmD0YTl_x5Ahww.png",
    description: "This is the first blog description.",
    url: "https://medium.com/stackademic/my-interview-experience-for-an-sde-2-frontend-position-at-zepto-104bf8b61ae1",
  },
];

const BlogCard = ({ title, description, date, imageUrl, url }) => {
  return (
    <a href={url} className="" target="_blank" rel="noopener noreferrer">
      <div className="bg-white text-black rounded-lg p-0 w-64 shadow-md text-center flex flex-col justify-start items-end">
        <img src={imageUrl} alt={title} className="w-full h-auto rounded-t-lg" />
        <h2 className="text-xl font-semibold mt-2">{title}</h2>
        {/* <p className="text-gray-700 mt-2">{description}</p> */}
        <small className="text-gray-500 mt-2 block">{date}</small>
      </div>
    </a>
  );
};

const BlogList = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 bg-black p-8">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          description={blog.description}
          date={blog.date}
          imageUrl={blog.imageUrl}
          url={blog.url}
        />
      ))}
    </div>
  );
};

const BlogPage = () => {
  return (
    <div className="bg-black min-h-screen text-light-blue text-center">
      <h1 className="text-4xl text-light-blue py-8">Blog Listing</h1>
      <BlogList />
    </div>
  );
};

export default BlogPage;
