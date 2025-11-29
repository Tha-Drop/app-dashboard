import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { FaPlus, FaArrowLeft } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { MdOutlineEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAddFaqMutation, useDeleteFaqMutation, useGetFaqQuery, useGetFaqUpdateMutation } from '../../redux/Api/faqApi'
import { toast } from 'react-toastify'
const { TextArea } = Input;


const FAQ = () => {
  const { data: faqData, refetch, isLoading } = useGetFaqQuery();
  const [addFaq] = useAddFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  const [updateFaq] = useGetFaqUpdateMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [form] = Form.useForm();

  // Handle different API response structures
  const faqList = Array.isArray(faqData?.data)
    ? faqData.data
    : faqData?.data?.faqs || faqData?.data?.faq || [];

  // const faq = [
  //   {
  //     question: 'How do I book an appointment?',
  //     answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal ."
  //   },
  //   {
  //     question: 'Can I cancel or reschedule an appointment?',
  //     answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal ."
  //   },
  //   {
  //     question: 'How do I join a telemedicine consultation?',
  //     answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal ."
  //   },
  //   {
  //     questio: 'How do I access my medical records?',
  //     answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal ."
  //   },
  // ]

  const handleAddFaq = () => {
    form.validateFields().then((values) => {
      console.log(values)
      addFaq(values)
        .unwrap()
        .then(() => {
          refetch();
          toast.success("FAQ added successfully!");
          setIsModalOpen(false);
          form.resetFields();
        })
        .catch((error) => {
          toast.error('Error adding FAQ:', error);
        });
    });
  };

  // Handle updating an FAQ
  const handleUpdateFaq = () => {
    form.validateFields().then((values) => {
      updateFaq({ id: selectedFaq._id, data: values })
        .unwrap()
        .then(() => {
          refetch();
          toast.success("FAQ Update successfully!");
          setIsEditModalOpen(false);
          form.resetFields();
        })
        .catch((error) => {
          toast.error('Error updating FAQ:', error);
        });
    });
  };

  // Open delete confirmation modal
  const openDeleteModal = (faq) => {
    setFaqToDelete(faq);
    setIsDeleteModalOpen(true);
  };

  // Handle deleting an FAQ
  const handleDeleteFaq = () => {
    if (!faqToDelete) return;

    deleteFaq(faqToDelete._id)
      .unwrap()
      .then(() => {
        refetch();
        toast.success("FAQ deleted successfully!");
        setIsDeleteModalOpen(false);
        setFaqToDelete(null);
      })
      .catch((error) => {
        toast.error('Error deleting FAQ:', error);
      });
  };

  // Handle opening the edit modal
  const openEditModal = (faq) => {
    setSelectedFaq(faq);
    form.setFieldsValue(faq);
    setIsEditModalOpen(true);
  };
  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[#EFC11F]" />
          </Link>
          <span className="font-semibold text-lg sm:text-[20px] text-[#020123]">FAQ</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#020123] text-white px-4 sm:px-5 py-2.5 sm:py-2 rounded-md text-sm font-medium hover:bg-[#0a0a2e] transition-all min-h-[44px] sm:min-h-0 w-full sm:w-auto justify-center"
        >
          <FaPlus size={12} />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-3 sm:space-y-4">
        {isLoading ? (
          <p className="text-gray-500 text-center py-10">Loading...</p>
        ) : faqList.length > 0 ? (
          faqList.map((faq, i) => (
            <div key={faq._id || i} className="rounded-lg overflow-hidden">
              {/* Question Header */}
              <div className="bg-[#020123] text-white px-3 sm:px-4 py-3 flex justify-between items-start sm:items-center gap-2">
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  <span className="text-[#EFC11F] font-semibold shrink-0">Q.</span>
                  <p className="text-xs sm:text-sm break-words">{faq.question}</p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <button
                    onClick={() => openEditModal(faq)}
                    className="text-white hover:text-[#EFC11F] transition-all p-1 min-w-[32px] min-h-[32px] flex items-center justify-center"
                  >
                    <MdOutlineEdit size={18} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(faq)}
                    className="text-white hover:text-red-400 transition-all p-1 min-w-[32px] min-h-[32px] flex items-center justify-center"
                  >
                    <IoClose size={20} />
                  </button>
                </div>
              </div>
              {/* Answer Body */}
              <div className="bg-[#F5F5F5] px-3 sm:px-4 py-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-[#020123] font-semibold shrink-0">Ans.</span>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-10">No FAQs found. Add one to get started!</p>
        )}
      </div>

      {/* Add FAQ Modal */}
      <Modal
        centered
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
        width="90%"
        style={{ maxWidth: 400 }}
        closable={false}
      >
        <div className="py-2">
          <div className="flex justify-between items-center mb-4">
            <p className="text-base font-semibold text-[#020123]">Add FAQ</p>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              <IoClose size={20} />
            </button>
          </div>
          <Form form={form} layout="vertical">
            <Form.Item
              name="question"
              label={<span className="text-gray-600 text-xs">Question</span>}
              rules={[{ required: true, message: 'Please enter a question' }]}
              className="mb-3"
            >
              <Input
                placeholder="What is an affiliate e-commerce website?"
                className="h-9 rounded border-gray-300 text-sm"
              />
            </Form.Item>
            <Form.Item
              name="answer"
              label={<span className="text-gray-600 text-xs">Answer</span>}
              rules={[{ required: true, message: 'Please enter an answer' }]}
              className="mb-4"
            >
              <TextArea
                rows={4}
                placeholder="Type answer here..."
                className="rounded border-gray-300 text-sm"
              />
            </Form.Item>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleAddFaq}
                className="bg-[#020123] text-white py-2 px-10 rounded-md text-sm font-medium hover:bg-[#0a0a2e] transition-all"
              >
                Publish
              </button>
            </div>
          </Form>
        </div>
      </Modal>

      {/* Edit FAQ Modal */}
      <Modal
        centered
        open={isEditModalOpen}
        footer={false}
        onCancel={() => setIsEditModalOpen(false)}
        width="90%"
        style={{ maxWidth: 400 }}
        closable={false}
      >
        <div className="py-2">
          <div className="flex justify-between items-center mb-4">
            <p className="text-base font-semibold text-[#020123]">Edit FAQ</p>
            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              <IoClose size={20} />
            </button>
          </div>
          <Form form={form} layout="vertical">
            <Form.Item
              name="question"
              label={<span className="text-gray-600 text-xs">Question</span>}
              rules={[{ required: true, message: 'Please enter a question' }]}
              className="mb-3"
            >
              <Input
                placeholder="What is an affiliate e-commerce website?"
                className="h-9 rounded border-gray-300 text-sm"
              />
            </Form.Item>
            <Form.Item
              name="answer"
              label={<span className="text-gray-600 text-xs">Answer</span>}
              rules={[{ required: true, message: 'Please enter an answer' }]}
              className="mb-4"
            >
              <TextArea
                rows={4}
                placeholder="Type answer here..."
                className="rounded border-gray-300 text-sm"
              />
            </Form.Item>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleUpdateFaq}
                className="bg-[#020123] text-white py-2 px-10 rounded-md text-sm font-medium hover:bg-[#0a0a2e] transition-all"
              >
                Update
              </button>
            </div>
          </Form>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        centered
        open={isDeleteModalOpen}
        footer={false}
        onCancel={() => setIsDeleteModalOpen(false)}
        width="90%"
        style={{ maxWidth: 400 }}
        closable={false}
      >
        <div className="py-4">
          <div className="flex justify-end">
            <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              <IoClose size={20} />
            </button>
          </div>
          <div className="text-center py-4">
            <p className="text-lg font-semibold text-[#020123] mb-2">Are you sure !</p>
            <p className="text-gray-500 text-sm">Do you want to delete this content ?</p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleDeleteFaq}
              className="bg-[#020123] text-white py-2 px-10 rounded-md text-sm font-medium hover:bg-[#0a0a2e] transition-all"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default FAQ