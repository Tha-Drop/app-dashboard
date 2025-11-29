import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  useGetTermsConditionsQuery,
  useGetTermsUpdateMutation,
} from "../../redux/Api/settings";
import { toast } from "react-toastify";

const TremsCondition = () => {
  const { data: getTerms } = useGetTermsConditionsQuery();
  const [updateTerms] = useGetTermsUpdateMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, seLoading] = useState(false);
  const [id, setId] = useState("");
  const [editorHeight, setEditorHeight] = useState(600);

  // Responsive editor height
  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 640) {
        setEditorHeight(350);
      } else if (window.innerWidth < 1024) {
        setEditorHeight(450);
      } else {
        setEditorHeight(600);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleTerms = async () => {
    const data = {
      text: content,
    };
    const id = getTerms?.data?._id;
    console.log(id, data);
    const res = await updateTerms({ id, data }).unwrap();
    console.log("res", res);
    toast.success("Terms Update successfully!");
  };

  const config = useMemo(() => ({
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: editorHeight,
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
  }), [editorHeight]);

  useEffect(() => {
    setContent(getTerms?.data?.text);
    setId(getTerms?.data?._id);
  }, [getTerms]);

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 min-h-full">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Link
          to={-1}
          className="p-1 rounded-md flex items-center"
        >
          <IoArrowBackSharp className="text-[#EFC11F] text-lg sm:text-xl" />
        </Link>
        <p className="font-semibold text-base sm:text-lg text-[#020123]">Terms & Conditions</p>
      </div>

      {/* Editor */}
      <div className="custom-jodit-editor">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />

        {/* Save Button */}
        <div className="flex items-center justify-center mt-4 sm:mt-6 pb-4">
          <button
            onClick={handleTerms}
            className="bg-[#020123] text-white px-6 sm:px-8 py-3 rounded-full font-medium min-h-[44px] w-full sm:w-auto hover:bg-[#0a0a2e] transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TremsCondition;
