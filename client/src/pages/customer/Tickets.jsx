import React, { useEffect, useState } from "react";
import authAxios from "../../utils/authAxios";
import { apiUrl } from "../../utils/Constants";
import { toast } from "react-toastify";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function TicketPage() {
    const [open, setOpen] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [replies, setReplies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const ticketData = {
                subject: event.target.message.value,
                type: event.target.category.value,
                description: event.target.desc.value
            }
            const resp = await authAxios.post(`${apiUrl}/ticket`, ticketData)
            toast.success('Ticket Submitted');
        } catch (error) {
            console.log(error);
        } finally {
            myTickets()
            handleClose();
        }
    };
    

    const myTickets = async () => {
        try {
            const data = await authAxios.get(`${apiUrl}/ticket/my`)
            setTickets(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const myReplies = async () => {
        try {
            const data = await authAxios.get(`${apiUrl}/ticket/my/reply`)
            setReplies(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        myTickets()
        myReplies()
    }, [])

    // Filter tickets based on search query
    const filteredTickets = tickets.filter(ticket =>
        ticket.type.toLowerCase().includes(searchQuery.toLowerCase())
    );



    const handleExportPDF = () => {
        const doc = new jsPDF();
    
        // Header
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0); // Red color
        doc.setFont("helvetica", "bold"); // Set font to bold
        doc.text("My Tickets", doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
    
        // Table headers
        const headers = [['ID', 'Ticket Type', 'Subject', 'Description', 'Status']];
        const data = headers.concat(filteredTickets.map(ticket => [ticket._id, ticket.type, ticket.subject, ticket.description, ticket.status]));
    
        // Create table using autoTable plugin
        doc.autoTable({
            head: [headers[0]],
            body: data.slice(1),
            startY: 20,
            theme: 'grid',
            styles: {
                font: 'helvetica',
                fontStyle: 'bold',
                textColor: [0, 0, 0], // Black color
                overflow: 'linebreak', // Allow text wrapping
                cellPadding: 5
            },
            columnStyles: {
                0: { cellWidth: 35 }, // ID column width
                1: { cellWidth: 30 }, // Ticket Type column width
                2: { cellWidth: 40 }, // Subject column width
                3: { cellWidth: 60 }, // Description column width
                4: { cellWidth: 26 } // Status column width
            }
        });
    
        // Save PDF
        doc.save("my_tickets.pdf");
    };
    
    
    

    return (
        <>
            <div className="flex justify-between items-center mt-10 mx-10">
                {/* Search bar */}
                <div>
                    <input
                        type="text"
                        placeholder="Search by type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                {/* Raise a Ticket button */}
                <button onClick={handleOpen} className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded shadow mb-4">
                    Raise a Ticket
                </button>
                {/* Export PDF button */}
                <button onClick={handleExportPDF} className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded shadow mb-4">
                    Export PDF
                </button>
            </div>
            
{/* Ticket submission modal */}
{open && (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
        <form className="bg-white rounded shadow-lg w-96 p-10" onSubmit={handleSubmit}>
            {/* Modal content */}
            <h2>Raise a ticket</h2>
            <input type="text" name="message" placeholder="Title" className="p-2 border my-2 w-full" />
            <select name="category" className="p-2 border my-2 w-full placeholder-gray-400" defaultValue="" required>
                <option value="" disabled hidden>Select</option>
                <option value="Payment">Payment</option>
                <option value="Appointment">Appointment</option>
                <option value="Nutritional Issues">Nutritional Issues</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Other">Other</option>
            </select>
            <input type="text" name="desc" placeholder="Description" className="p-2 border my-2 w-full" />

            <div className="flex items-center justify-between">
                <button className="p-2 border bg-green-300">Submit</button>
                <button className="p-2 border bg-red-300" type="button" onClick={() => setOpen(false)}>Cancel</button>
            </div>
        </form>
    </div>
)}



            {/* Ticket table */}
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center font-bold text-2xl">My Tickets</h1>
                <table className="w-full bg-white rounded-lg shadow-lg mt-4">
                    <thead>
                        <tr className="text-left border-b-2 border-gray-300 bg-gray-100">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Ticket Type</th>
                            <th className="px-4 py-2">Subject</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets?.map((ticket) => (
                            <tr key={ticket.id} className="border-b border-gray-300">
                                <td className="px-4 py-2">{ticket?._id}</td>
                                <td className="px-4 py-2">{ticket?.type}</td>
                                <td className="px-4 py-2">{ticket?.subject}</td>
                                <td className="px-4 py-2">{ticket?.description}</td>
                                <td className="px-4 py-2">{ticket?.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Replies for your tickets */}
            <div className="my-20 border bg-white p-3">
                <h1 className="text-center mb-5">Replies for your tickets</h1>
                <div>
                    {replies?.map((rep) => (
                        <div key={rep?._id} className="p-2 border rounded-xl bg-blue-200">
                            <div className="flex items-center my-5 px-3 justify-between capitalize">
                                <h2 className="text-lg ">Ticket id : <span className="text-xs">{rep?.ticketId?._id}</span></h2>
                                <h2 className="text-lg">{rep?.ticketId?.subject}</h2>
                            </div>
                            {rep?.message}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
