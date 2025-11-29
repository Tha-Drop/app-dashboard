import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AboutUs = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState({
    intro: "At Event website, we are committed to providing you with the best possible experience. Whether you have a question, need assistance, or want to provide feedback, we're here to help!",
    supportDescription: "Our dedicated support team is available to assist you with any issues related to your account, bidding process, payments, or orders.",
    supportEmail: "sy@website.com",
    supportPhone: "+123-456-7890",
    businessDescription: "For partnerships, advertising, or business collaboration, contact our business development team.",
    businessEmail: "sy@website.com",
    businessPhone: "+123-456-7891"
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // API call to save content would go here
    setIsEditing(false);
    toast.success("Content saved successfully!");
  };

  const handleChange = (field, value) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[#EFC11F]" />
          </Link>
          <span className="font-semibold text-[20px] text-[#020123]">About Us</span>
        </div>
        {isEditing && (
          <div className="flex items-center gap-2 text-gray-400">
            <select className="border rounded px-2 py-1 text-sm">
              <option>12</option>
              <option>14</option>
              <option>16</option>
            </select>
            <button className="p-1 hover:bg-gray-100 rounded font-bold">B</button>
            <button className="p-1 hover:bg-gray-100 rounded italic">I</button>
            <button className="p-1 hover:bg-gray-100 rounded underline">U</button>
            <button className="p-1 hover:bg-gray-100 rounded">≡</button>
            <button className="p-1 hover:bg-gray-100 rounded">≡</button>
            <button className="p-1 hover:bg-gray-100 rounded">≡</button>
            <button className="p-1 hover:bg-gray-100 rounded bg-[#020123] text-white text-xs px-2">🔗</button>
            <button className="p-1 hover:bg-gray-100 rounded bg-[#020123] text-white text-xs px-2">📷</button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaArrowLeft size={14} className="text-gray-600" />
          <span className="text-gray-600">Contact</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#020123]">Contact Us:</h2>

          {isEditing ? (
            <textarea
              value={content.intro}
              onChange={(e) => handleChange('intro', e.target.value)}
              className="w-full p-2 border rounded-md text-gray-600 text-sm leading-relaxed min-h-[80px]"
            />
          ) : (
            <p className="text-gray-600 text-sm leading-relaxed">{content.intro}</p>
          )}

          <h3 className="text-lg font-semibold text-[#020123] pt-2">Get in Touch with Us</h3>

          <p className="text-gray-600 text-sm">
            If you need support or have inquiries, please reach out through one of the following methods:
          </p>

          <div className="pt-2">
            <h4 className="text-base font-semibold text-[#020123]">1. Customer Support</h4>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2 ml-2">
              <li>
                {isEditing ? (
                  <input
                    type="text"
                    value={content.supportDescription}
                    onChange={(e) => handleChange('supportDescription', e.target.value)}
                    className="w-full p-1 border rounded text-sm"
                  />
                ) : (
                  content.supportDescription
                )}
              </li>
              <li>
                <span className="font-medium">Email: </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={content.supportEmail}
                    onChange={(e) => handleChange('supportEmail', e.target.value)}
                    className="p-1 border rounded text-sm"
                  />
                ) : (
                  content.supportEmail
                )}
              </li>
              <li>
                <span className="font-medium">Phone: </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={content.supportPhone}
                    onChange={(e) => handleChange('supportPhone', e.target.value)}
                    className="p-1 border rounded text-sm"
                  />
                ) : (
                  content.supportPhone
                )}
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <h4 className="text-base font-semibold text-[#020123]">2. Business Inquiries</h4>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2 ml-2">
              <li>
                {isEditing ? (
                  <input
                    type="text"
                    value={content.businessDescription}
                    onChange={(e) => handleChange('businessDescription', e.target.value)}
                    className="w-full p-1 border rounded text-sm"
                  />
                ) : (
                  content.businessDescription
                )}
              </li>
              <li>
                <span className="font-medium">Email: </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={content.businessEmail}
                    onChange={(e) => handleChange('businessEmail', e.target.value)}
                    className="p-1 border rounded text-sm"
                  />
                ) : (
                  content.businessEmail
                )}
              </li>
              <li>
                <span className="font-medium">Phone: </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={content.businessPhone}
                    onChange={(e) => handleChange('businessPhone', e.target.value)}
                    className="p-1 border rounded text-sm"
                  />
                ) : (
                  content.businessPhone
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-8">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-[#020123] text-white py-2.5 px-10 rounded-md font-medium hover:bg-[#0a0a2e] transition-all"
          >
            Save & change
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-[#020123] text-white py-2.5 px-10 rounded-md font-medium hover:bg-[#0a0a2e] transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
