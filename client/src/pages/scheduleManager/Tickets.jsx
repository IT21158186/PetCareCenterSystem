import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from "../../utils/Constants";


export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [replyFormData, setReplyFormData] = useState({
        ticketId: null,
        userid:null,
        subject: "",
        message: ""
    });
    const [replyFormVisible, setReplyFormVisible] = useState(false);

    const toggleStatus =async (id) => {
        try {
            const rep = await axios.put(`${apiUrl}/ticket/${id}`,{status:'approved'})
            toast.success('Ticket Marked As Solved')
            getAllTickets()
        } catch (error) {
            console.log(error);
        }
    };

    const handleReply = (tick) => {
        setReplyFormData(tick);
        setReplyFormVisible(true);
    };

    const handleCancelReply = () => {
        setReplyFormVisible(false);
    };

    const handleSendReply =async () => {
        if (replyFormData.message.trim() === "") {
            toast.error("Please enter a reply before sending.");
        } else {
            const resp = await axios.post(`${apiUrl}/ticket/reply/${replyFormData._id}`,{
                userid:replyFormData.userid,
                message:replyFormData.message
            });
            toggleStatus(replyFormData._id); // Change ticket status to resolved
            setReplyFormVisible(false);
            toast.success("Reply sent successfully.");
        }
    };

    const handleReplyChange = (e) => {
        const { name, value } = e.target;
        setReplyFormData({
            ...replyFormData,
            [name]: value
        });
    };

    const getAllTickets = async () => {
        try {
            const resp = await axios.get(`${apiUrl}/ticket`)
            setTickets(resp.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllTickets()
    }, [])

    return (
        <div className="container mx-auto relative">
            <h1 className="text-2xl font-bold mb-4 text-center">All the Tickets Received</h1>
            <table className="table-auto w-full mt-10">
                <thead className="bg-pink-100">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">User ID</th>
                        <th className="px-4 py-2">Subject</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket,idx) => (
                        <tr key={idx} className="border-b border-gray-300">
                            <td className="border px-4 py-2">{ticket?._id}</td>
                            <td className="border px-4 py-2">{ticket?.userid?.email}</td>
                            <td className="border px-4 py-2">{ticket?.subject}</td>
                            <td className="border px-4 py-2">{ticket?.description}</td>
                            <td className="border px-4 py-2">{ticket?.status}</td>
                            <td className="border px-4 py-2 flex items-center">
                                {ticket?.status === "pending" && (
                                    <button onClick={() => handleReply(ticket)} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Reply
                                    </button>
                                )}
                                <button onClick={() => toggleStatus(ticket?._id)}
                                    style={{ backgroundColor: ticket?.status === "pending" ? 'green' : 'gray' }}
                                    className={` hover:bg-${ticket?.status === "pending" ? 'green' : 'gray'}-700 text-white font-bold py-2 px-4 rounded`}>
                                    {ticket?.status === "pending" ? "Pending" : "Resolved"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {replyFormVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8">
                        <h2 className="text-xl font-bold mb-4">Reply to Ticket #{replyFormData._id} - {replyFormData.subject}</h2>
                        <textarea name="message" value={replyFormData.message} onChange={handleReplyChange} className="w-full h-32 border border-gray-300 rounded-lg p-2 mb-4" placeholder="Enter your reply here..." />
                        <div className="flex justify-end">
                            <button onClick={handleCancelReply} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 mr-2 rounded">
                                Cancel
                            </button>
                            <button onClick={handleSendReply} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="top-center" />
        </div>
    );
}
