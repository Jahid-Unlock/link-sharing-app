"use client";

import FrontLayout from "@/components/layout/FrontLayout";
import { Grip, Plus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addLink, removeLink, updateLink } from "@/redux/slices/linkSlice";
import { useState, useEffect } from "react";

// Extract social platforms to a constant
const SOCIAL_PLATFORMS = [
  { name: "Github", url: "https://github.com/" },
  { name: "Dev.to", url: "https://dev.to/" },
  { name: "Frontend Mentor", url: "https://www.frontendmentor.io/profile/" },
  { name: "Codewars", url: "https://www.codewars.com/users/" },
  { name: "Gitlab", url: "https://gitlab.com/" },
  { name: "Hashnode", url: "https://hashnode.com/@" },
  { name: "Twitter", url: "https://twitter.com/" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/" },
  { name: "YouTube", url: "https://www.youtube.com/@" },
];

export default function Home() {
  const links = useSelector((state) => state.links.links); // Access initial links from Redux
  const dispatch = useDispatch();
  const [localLinks, setLocalLinks] = useState([]); // Initialize with an empty array

  // Set localLinks based on Redux state on initial render
  useEffect(() => {
    setLocalLinks([...links]);
  }, [links]);

  // Function to generate a unique ID for each new link
  const generateUniqueId = () => Date.now();

  // Handler for adding a new empty link
  const handleAddLink = () => {
    setLocalLinks((prevLinks) => [
      ...prevLinks,
      { id: generateUniqueId(), platform: "", url: "" },
    ]);
  };

  // Handler for updating link values
  const handleLinkChange = (id, field, value) => {
    const updatedLinks = localLinks.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    setLocalLinks(updatedLinks);
  };

  // Handler for removing a link
  const handleRemoveLink = (id) => {
    const updatedLinks = localLinks.filter((link) => link.id !== id);
    setLocalLinks(updatedLinks);
  };

  // Handler for saving links to the Redux store
  const handleSaveLinks = () => {
    localLinks.forEach((link) => {
      if (link.platform && link.url) {
        if (links.some((existingLink) => existingLink.id === link.id)) {
          // Link already exists in the store, so update it
          dispatch(updateLink(link));
        } else {
          // New link, so add it to the store
          dispatch(addLink(link));
        }
      }
    });
  };

  // Separate component for rendering each link input section
  const LinkInput = ({ link }) => (
    <div className="mt-5 bg-[#f4f4f4] px-4 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Grip className="h-4 w-4" />
          {`Link #${localLinks.findIndex((item) => item.id === link.id) + 1}`}
        </div>
        <button type="button" onClick={() => handleRemoveLink(link.id)}>
          Remove
        </button>
      </div>
      <div className="mt-4 space-y-4">
        <div className="relative">
          <select
            className="bg-white w-full lg:h-14 h-12 rounded-md px-4 py-2 border border-[#633cff] border-opacity-20 focus:outline-none focus:border-opacity-100"
            value={link.platform}
            onChange={(e) => handleLinkChange(link.id, "platform", e.target.value)}
          >
            <option value="">Select Platform</option>
            {SOCIAL_PLATFORMS.map((platform, i) => (
              <option key={i} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="lg:text-base text-sm block mb-1 text-gray-900/70">
            Link
          </label>
          <input
            type="text"
            className="w-full lg:h-14 h-12 rounded-md px-4 py-2 border border-[#633cff] border-opacity-20 focus:outline-none focus:border-opacity-100"
            placeholder="Enter the URL"
            value={link.url}
            onChange={(e) => handleLinkChange(link.id, "url", e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <FrontLayout>
      <h3 className="lg:text-3xl text-2xl font-semibold text-gray-900 capitalize">
        Customize your links
      </h3>
      <p className="text-gray-900/70 mt-3">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>

      <button
        onClick={handleAddLink}
        className="flex items-center justify-center gap-2 w-full text-[#633cff] rounded-md border border-[#633cff] mt-8 py-3 hover:bg-[#633cff]/10 duration-150"
      >
        <Plus className="h-4 w-4" /> Add Link
      </button>

      <form action="#" className="mt-4 space-y-4">
        {localLinks.map((link) => (
          <LinkInput key={link.id} link={link} />
        ))}

        <button
          type="button"
          onClick={handleSaveLinks}
          className="flex items-center justify-center gap-2 w-full bg-[#633cff] text-white rounded-md mt-6 py-3 hover:bg-[#633cff]/90 duration-150"
        >
          Save Links
        </button>
      </form>
    </FrontLayout>
  );
}
