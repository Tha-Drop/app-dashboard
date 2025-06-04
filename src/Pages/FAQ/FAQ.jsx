import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { IoArrowBackSharp } from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAddFaqMutation, useDeleteFaqMutation, useGetFaqQuery, useGetFaqUpdateMutation } from '../../redux/Api/faqApi'
import { toast } from 'react-toastify'
const { TextArea } = Input;


const FAQ = () => {
  const { data: faqData, refetch } = useGetFaqQuery();
  const [addFaq] = useAddFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  const [updateFaq] = useGetFaqUpdateMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [form] = Form.useForm();

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

  // Handle deleting an FAQ
  const handleDeleteFaq = (id) => {
    deleteFaq(id)
      .unwrap()
      .then(() => {
        refetch();
        toast.success("FAQ Delete successfully!");
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
    <div className="bg-white rounded-md p-5">
    <div className="flex">
      <Link to={-1} className="py-1 px-2 rounded-md flex justify-start items-center gap-1">
        <IoArrowBackSharp className="text-[var(--primary-color)]" />
      </Link>
      <p className="font-semibold text-[18px]">FAQ</p>
    </div>

    {/* All questions and answers */}
    <div className="grid grid-cols-2 gap-5 mt-2">
      {faqData?.data?.map((faq, i) => (
        <div key={faq._id} className="p-2">
          <p className="pb-3">Question no: {i + 1}</p>
          <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.question}</p>
          <div className="flex justify-between">
            <p className="py-2">Answer</p>
            <div className="flex gap-4">
              <button onClick={() => openEditModal(faq)} className="py-2">
                Edit
              </button>
              <div className="py-2">
                <MdDeleteOutline
                  className="text-xl cursor-pointer"
                  onClick={() => handleDeleteFaq(faq._id)}
                />
              </div>
            </div>
          </div>
          <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.answer}</p>
        </div>
      ))}
    </div>

    {/* Add FAQ Button */}
    <div className="flex items-center justify-center mt-20">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-10 py-2 rounded-3xl"
      >
        <GoPlus size={20} />
        <span>Add FAQ</span>
      </button>
    </div>

    {/* Add FAQ Modal */}
    <Modal
      centered
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <p className="text-center font-semibold pb-5 text-xl">Add FAQ</p>
      <Form form={form}>
        <Form.Item name="question" rules={[{ required: true, message: 'Please enter a question' }]}>
          <Input placeholder="Type question here..." />
        </Form.Item>
        <Form.Item name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
          <TextArea rows={4} placeholder="Type answer here..." />
        </Form.Item>
        <div className="flex items-center justify-center mt-2">
          <button
            onClick={handleAddFaq}
            className="flex w-full items-center justify-center gap-2 bg-[var(--primary-color)] text-white px-10 py-2 text-xl rounded-3xl"
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>

    {/* Edit FAQ Modal */}
    <Modal
      centered
      open={isEditModalOpen}
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <p className="text-center font-semibold pb-5 text-xl">Edit FAQ</p>
      <Form form={form}>
        <Form.Item name="question" rules={[{ required: true, message: 'Please enter a question' }]}>
          <Input placeholder="Type question here..." />
        </Form.Item>
        <Form.Item name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
          <TextArea rows={4} placeholder="Type answer here..." />
        </Form.Item>
        <div className="flex items-center justify-center mt-2">
          <button
            onClick={handleUpdateFaq}
            className="flex w-full items-center justify-center gap-2 bg-[var(--primary-color)] text-white px-10 py-2 text-xl rounded-3xl"
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>
  </div>
  )
}

export default FAQ