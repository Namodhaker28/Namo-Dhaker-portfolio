import React from "react";
import { CodeBracketIcon, CodeBracketSquareIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
// import { CodeBracketSquareIcon } from "@heroicons/react/24/solid";

const ProjectCard = ({ imgUrl, title, description, gitUrlServer, gitUrlClient, previewUrl }) => {
  return (
    <div>
      <div
        className=" bg-whiteh-52 md:h-72 rounded-t-xl relative group"
        style={{
          background: `url(${imgUrl}) no-repeat center center`,
          backgroundSize: "auto 300px",
          backgroundColor: "#fff",

        }}>
        <div className="overlay items-center  justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex  group-hover:bg-opacity-80 transition-all duration-500 ">
          <Link
            target="_blank"
            href={gitUrlClient}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link">
            <span className="text-white font-bold relative top-14">Client</span>
            <CodeBracketSquareIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
          </Link>
          {gitUrlServer && (
            <Link
              target="_blank"
              href={gitUrlServer}
              className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link">
              <span className="text-white font-bold relative top-14">Server</span>
              <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
            </Link>
          )}
          <Link
            target="_blank"
            href={previewUrl}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link">
            <span className="text-white font-bold relative top-14">Preview</span>
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
          </Link>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description} lore</p>
      </div>
    </div>
  );
};

export default ProjectCard;
