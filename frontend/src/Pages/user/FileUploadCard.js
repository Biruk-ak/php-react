
import React, { useState } from "react";
import axios from "axios";


function FileUploadCard() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post("http://localhost/documents", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const styles = {
    color: "black",
    position: "relative",
    backgroundColor: "white",
    width: "36rem",
    height: "fit-content",
    fontSize: "24px",
    boxShadow: "6px 6px 30px grey",
    borderRadius: "20px",
    padding: "50px 0 10px 20px",
    margin: "20px",
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
      </label>
      {selectedFile && (
        <button
          type="submit"
          className="block mt-4 px-4 py-2 mx-auto text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={handleSubmit}
        >
          Upload
        </button>
      )}
    </div>
  );
}

export default FileUploadCard;

// function HomePage() {
//   const fileUploadCardRef = useRef(null);

//   const handleButtonClick = () => {
//     if (fileUploadCardRef.current) {
//       fileUploadCardRef.current.handleButtonClick();
//     }
//   };

//   return (
//     <><div>
//       <h1>Welcome to the Home Page</h1>
//       <button onClick={handleButtonClick}>Upload File</button>
//       <FileUploadCard ref={fileUploadCardRef} />
//     </div><Button variant="contained" onClick={() => setOpen(true)}>
//         Create Link <AiOutlineLink />
//       </Button></>
//   );
// }