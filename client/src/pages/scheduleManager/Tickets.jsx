import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Tickets() {
    const [tickets, setTickets] = useState([
        { id: 1, userId: 123, subject: "Sample Ticket 1", description: "This is a sample description for ticket 1.", status: "pending" },
        { id: 2, userId: 456, subject: "Sample Ticket 2", description: "This is a sample description for ticket 2.", status: "pending" }
    ]);
    const [replyFormData, setReplyFormData] = useState({
        ticketId: null,
        subject: "",
        reply: ""
    });
    const [replyFormVisible, setReplyFormVisible] = useState(false);

    const toggleStatus = (id) => {
        setTickets(tickets.map(ticket => {
            if (ticket.id === id) {
                return {
                    ...ticket,
                    status: ticket.status === "pending" ? "resolved" : "pending"
                };
            }
            return ticket;
        }));
    };

    const handleReply = (id, subject) => {
        setReplyFormData({
            ticketId: id,
            subject,
            reply: ""
        });
        setReplyFormVisible(true);
    };

    const handleCancelReply = () => {
        setReplyFormVisible(false);
    };

    const handleSendReply = () => {
        if (replyFormData.reply.trim() === "") {
            toast.error("Please enter a reply before sending.");
        } else {
            // Handle sending reply logic here
            console.log(`Reply sent for ticket with ID ${replyFormData.ticketId}: ${replyFormData.reply}`);
            toggleStatus(replyFormData.ticketId); // Change ticket status to resolved
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
                <tbody style={{ textAlign: 'center' }}>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td className="border px-4 py-2">{ticket.id}</td>
                            <td className="border px-4 py-2">{ticket.userId}</td>
                            <td className="border px-4 py-2">{ticket.subject}</td>
                            <td className="border px-4 py-2">{ticket.description}</td>
                            <td className="border px-4 py-2">{ticket.status}</td>
                            <td className="border px-4 py-2">
                                {ticket.status === "pending" && (
                                    <button onClick={() => handleReply(ticket.id, ticket.subject)} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Reply
                                    </button>
                                )}
                                <button onClick={() => toggleStatus(ticket.id)} className={`bg-${ticket.status === "pending" ? 'green' : 'gray'}-500 hover:bg-${ticket.status === "pending" ? 'green' : 'gray'}-700 text-white font-bold py-2 px-4 rounded`}>
                                    {ticket.status === "pending" ? "Resolve" : "Resolved"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {replyFormVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8">
                        <h2 className="text-xl font-bold mb-4">Reply to Ticket #{replyFormData.ticketId} - {replyFormData.subject}</h2>
                        <textarea name="reply" value={replyFormData.reply} onChange={handleReplyChange} className="w-full h-32 border border-gray-300 rounded-lg p-2 mb-4" placeholder="Enter your reply here..." />
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
