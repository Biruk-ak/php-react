import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import DocumentCard from "../../Components/DocumentCard";
import { getInstance } from "../../api/apihanlder";
import { useNavigate } from "react-router-dom";

function Notification({ auth = () => { } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [user, setUser] = useState({});
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openDocumentModal = () => {
    setIsDocumentModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDocumentModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle form submission
    closeModal();
  };

  const handleDocumentSelection = (event) => {
    const documentId = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedDocuments([...selectedDocuments, documentId]);
    } else {
      setSelectedDocuments(selectedDocuments.filter((id) => id !== documentId));
    }
  };

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocumentFiles([...documentFiles, ...files]);
  };

  useEffect(() => {
    getInstance()
      .get("/current")
      .then((response) => {
        console.log(response);
        setUser(response.data);
        getInstance()
          .get("/documents")
          .then((res) => {
            console.log(res);
            setDocumentList(res.data);
          });
      })
      .catch((error) => {
        if (error.response.status === 401) navigate("/login");
      });
  }, []);
  console.log(documentFiles)
  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-bodydark">
        <section className="h-full pt-10 flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="space-y-10">
            {documentList.map((item) => (
              <DocumentCard data={item} />
            ))}
          </div>
        </section>
        <button
          className="fixed top-20 right-4 bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Create Link
        </button>

        <button
          className="fixed top-40 right-4 bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
          onClick={openDocumentModal}
        >
          Add Document
        </button>

        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[550px]">
              <h2 className="text-xl font-bold mb-4 text-black">Add Document</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="linkName" className="block mb-2 font-medium">
                    Link Name
                  </label>
                  <input
                    type="text"
                    id="linkName"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Documents</label>
                  {documentList.map((item) => (
                    <div className="flex items-center" key={item.id}>
                      <input
                        type="checkbox"
                        value={item.id}
                        className="mr-2"
                        onChange={handleDocumentSelection}
                      />
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block mb-2 font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 bg-[#2e57c7] text-white font-bold py-2 px-4 rounded"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="ml-2 bg-gray-300 hover:bg-gray-400 bg-[#2e57c7] text-white font-bold py-2 px-4 rounded"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isDocumentModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[550px]">
              <h2 className="text-2xl font-bold mb-4 text-black">Add Document</h2>
              {documentFiles.map((file, index) => (
                <div key={index} className="mb-3">
                  <span className="mr-2 w-56 bg-[#d1fae5] p-2 ">{file.name}</span>
                  <button
                    type="button"
                    className="text-[#ef4444]"
                    onClick={() => {
                      const updatedFiles = documentFiles.filter((_, i) => i !== index);
                      setDocumentFiles(updatedFiles);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <form onSubmit={handleSubmit}>

                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input
                    type="file"
                    id="document"
                    multiple
                    onChange={handleDocumentUpload}
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                          fill="#3C50E0"
                        />
                      </svg>
                    </span>
                    <p>
                      <span className="text-primary">Click to upload</span>
                    </p>
                    <p className="mt-1.5">PDF, Doc, JPG or GIF</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#3b82f6] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="bg-[#3b82f6] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

        )}
      </div>
    </DashboardLayout>
  );
}

export default Notification;