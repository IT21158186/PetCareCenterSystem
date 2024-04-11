import React, { useState } from "react";

export default function TicketPage() {
    const [open, setOpen] = useState(false);
    const [tickets, setTickets] = useState([
        { id: 1, subject: "Sample Ticket 1", description: "This is a sample description for ticket 1." },
        { id: 2, subject: "Sample Ticket 2", description: "This is a sample description for ticket 2." }
    ]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (ticketData) => {
        // Handle form submission to send ticket to schedule manager's email
        // You can implement this functionality according to your backend logic
        // For now, let's just close the dialog and add sample data
        setTickets([...tickets, ticketData]);
        handleClose();
    };

    return (
        <>
            <div className="flex justify-end mt-10 mr-10">
                <button onClick={handleOpen} className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded shadow mb-4">
                    Raise a Ticket
                </button>
            </div>
            {open && (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded shadow-lg w-96">
            <div className="flex justify-end">
                <button onClick={handleClose} className="p-2 focus:outline-none">
                    <svg className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="p-8">
                <h2 className="text-lg font-bold mb-5">Raise a Ticket</h2>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="ticketSubject">Subject</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ticketSubject" type="text" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="ticketDescription">Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ticketDescription" rows="4"></textarea>
                </div>
                <div className="flex justify-between">
                    <button onClick={handleClose} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Cancel
                    </button>
                    <button onClick={() => handleSubmit({
                        id: tickets.length + 1,
                        subject: document.getElementById('ticketSubject').value,
                        description: document.getElementById('ticketDescription').value
                    })} className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
)}


<div className="max-w-4xl mx-auto">
    <h1 className="text-center font-bold text-2xl">My Tickets</h1>
    <table className="w-full bg-white rounded-lg shadow-lg mt-4">
        <thead>
            <tr className="text-left border-b-2 border-gray-300 bg-gray-100">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Description</th>
            </tr>
        </thead>
        <tbody>
            {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-300">
                    <td className="px-4 py-2">{ticket.id}</td>
                    <td className="px-4 py-2">{ticket.subject}</td>
                    <td className="px-4 py-2">{ticket.description}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>


        </>
    )
}
