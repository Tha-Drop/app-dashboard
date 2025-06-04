import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  useGetprivecyConditionsQuery,
  useGetprivecyUpdateMutation,
  useGetTermsConditionsQuery,
  useGetTermsUpdateMutation,
} from "../../redux/Api/settings";
import { toast } from "react-toastify";
const PrivacyPolicy = () => {
  const { data: getTerms } = useGetprivecyConditionsQuery();
  const [updateTerms] = useGetprivecyUpdateMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, seLoading] = useState(false);
  const [id, setId] = useState("");

  const handleTerms = async () => {
    // console.log(content);
    const data = {
      text: content,
    };
    const id = getTerms?.data?._id;
    console.log(id, data);
    const res = await updateTerms({ id, data }).unwrap();
    console.log("res", res);
    toast.success("Privecy Update successfully!");
  };
  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 600,
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };
  useEffect(() => {
    setContent(getTerms?.data?.text);
    setId(getTerms?.data?._id);
  }, [getTerms]);
  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-3 relative m-5">
        <div className="absolute top-6 left-2 flex items-center">
          <Link
            to={-1}
            className="py-1 px-2 rounded-md flex justify-start items-center gap-1  "
          >
            <IoArrowBackSharp className="text-[var(--primary-color)]" />
          </Link>{" "}
          <p className="font-semibold">Privecy And Policy</p>
        </div>
      </div>

      <div className="custom-jodit-editor mx-5 ">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />
        <div className="flex items-center justify-center mt-5">
          <button
            onClick={handleTerms}
            className="bg-[var(--primary-color)]  text-white px-4 py-2 rounded-full test"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
