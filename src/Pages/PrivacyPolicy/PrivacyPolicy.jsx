import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  useGetprivecyConditionsQuery,
  useGetprivecyUpdateMutation,
} from "../../redux/Api/settings";
import { toast } from "react-toastify";

const PrivacyPolicy = () => {
  const { data: getTerms } = useGetprivecyConditionsQuery();
  const [updateTerms] = useGetprivecyUpdateMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState({
    intro: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book. It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting, Remaining Essentially Unchanged. It Was Popularised In The 1960s With The Release Of Letraset Sheets Containing Lorem Ipsum Passages, And More Recently With Desktop Publishing Software Like Aldus PageMaker Including Versions Of Lorem Ipsum.",
    collectInfo: "We Collect Information From You When You Subscribe To A Newsletter, Respond To A Survey, Fill Out A Form Or Enter Information On Our Site.",
    useInfoIntro: "We May Use The Information We Collect From You When You Register, Make A Purchase, Sign Up For Our Newsletter, Respond To A Survey Or Marketing Communication, Surf The Website, Or Use Certain Other Site Features In The Following Ways:",
    useInfoPoints: [
      "To Personalize User's Experience And To Allow Us To Deliver The Type Of Content And Product Offerings In Which You Are Most Interested.",
      "To Improve Our Website In Order To Better Serve You.",
      "To Administer A Contest, Promotion, Survey Or Other Site Feature."
    ]
  });

  useEffect(() => {
    if (getTerms?.data?.text) {
      // If API returns HTML content, you might want to parse it
      // For now, keeping the default content
    }
  }, [getTerms]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const id = getTerms?.data?._id;
      if (id) {
        const data = { text: JSON.stringify(content) };
        await updateTerms({ id, data }).unwrap();
      }
      setIsEditing(false);
      toast.success("Privacy Policy updated successfully!");
    } catch (error) {
      toast.error("Error updating Privacy Policy");
    }
  };

  const handleChange = (field, value) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePointChange = (index, value) => {
    setContent(prev => ({
      ...prev,
      useInfoPoints: prev.useInfoPoints.map((point, i) => i === index ? value : point)
    }));
  };

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[#EFC11F]" />
          </Link>
          <span className="font-semibold text-lg sm:text-[20px] text-[#020123]">Privacy Policy</span>
        </div>
        {isEditing && (
          <div className="flex items-center gap-1 sm:gap-2 text-gray-400 flex-wrap">
            <select className="border rounded px-2 py-1 text-sm">
              <option>12</option>
              <option>14</option>
              <option>16</option>
            </select>
            <button className="p-1 hover:bg-gray-100 rounded font-bold min-w-[32px] min-h-[32px]">B</button>
            <button className="p-1 hover:bg-gray-100 rounded italic min-w-[32px] min-h-[32px]">I</button>
            <button className="p-1 hover:bg-gray-100 rounded underline min-w-[32px] min-h-[32px]">U</button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="bg-[#FDF8E8] rounded-lg p-3 sm:p-4 md:p-6 min-h-[400px] sm:min-h-[500px]">
        {/* Intro */}
        {isEditing ? (
          <textarea
            value={content.intro}
            onChange={(e) => handleChange('intro', e.target.value)}
            className="w-full p-3 border rounded-md text-gray-700 text-sm leading-relaxed min-h-[120px] mb-6"
          />
        ) : (
          <p className="text-gray-700 text-sm leading-relaxed mb-6">{content.intro}</p>
        )}

        {/* When Do We Collect Information */}
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#020123] mb-3 sm:mb-4">When Do We Collect Information?</h2>
        {isEditing ? (
          <textarea
            value={content.collectInfo}
            onChange={(e) => handleChange('collectInfo', e.target.value)}
            className="w-full p-3 border rounded-md text-gray-700 text-sm leading-relaxed min-h-[60px] mb-6"
          />
        ) : (
          <p className="text-gray-700 text-sm leading-relaxed mb-6">{content.collectInfo}</p>
        )}

        {/* How Do We Use Your Information */}
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#020123] mb-3 sm:mb-4">How Do We Use Your Information?</h2>
        {isEditing ? (
          <textarea
            value={content.useInfoIntro}
            onChange={(e) => handleChange('useInfoIntro', e.target.value)}
            className="w-full p-3 border rounded-md text-gray-700 text-sm leading-relaxed min-h-[80px] mb-4"
          />
        ) : (
          <p className="text-gray-700 text-sm leading-relaxed mb-4">{content.useInfoIntro}</p>
        )}

        <ul className="list-disc list-inside text-gray-700 text-sm space-y-2 ml-4">
          {content.useInfoPoints.map((point, index) => (
            <li key={index}>
              {isEditing ? (
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                  className="w-[90%] p-2 border rounded text-sm"
                />
              ) : (
                point
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-6 sm:mt-8 pb-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-[#020123] text-white py-3 px-8 sm:px-10 rounded-md font-medium hover:bg-[#0a0a2e] transition-all min-h-[44px] w-full sm:w-auto"
          >
            Save & change
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-[#020123] text-white py-3 px-8 sm:px-10 rounded-md font-medium hover:bg-[#0a0a2e] transition-all min-h-[44px] w-full sm:w-auto"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
