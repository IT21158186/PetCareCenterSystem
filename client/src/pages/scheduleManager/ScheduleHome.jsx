import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authAxios from "../../utils/authAxios";
import { apiUrl } from "../../utils/Constants";
import axios from "axios";

export default function AppointmentsScheduleHome() {
    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleStatus = async (id, status) => {
        if (status === 'approved') {
            toast.error("Approved appointment cannot be set back to pending!", { position: "top-center" });
            return;
        }
        try {
            const resp = await axios.put(`${apiUrl}/appointment/${id}`, { status: 'approved' });
            toast.success('Appointment Approved');
            myApps();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        console.log("Deleting appointment with ID:", id);
        try {
            await axios.delete(`${apiUrl}/${id}`);
            toast.success('Appointment Deleted');
            myApps();
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete appointment');
        }
    };
    

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setAppointments(prevAppointments => [
            ...prevAppointments,
            {
                id: prevAppointments.length + 1,
                message: event.target.message.value,
                userID: event.target.userID.value,
                status: "pending",
                date: event.target.date.value,
                timeSlot: event.target.timeSlot.value
            }
        ]);
        setShowForm(false);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    const myApps = async () => {
        try {
            const data = await authAxios.get(`${apiUrl}/appointment`);
            console.log(data.data);
            setAppointments(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        myApps();
    }, []);

    // Function to filter appointments based on the search query
    const filteredAppointments = appointments.filter(appointment =>
        appointment.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto relative">
            <h1 className="text-2xl font-bold mb-4 text-center">Appointments Scheduler</h1>
            <div className="flex justify-between items-center mb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowForm(true)}>
                    Make Appointment
                </button>
                <input
                    type="text"
                    placeholder="Search by message..."
                    className="border border-gray-400 px-4 py-2 rounded"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            <table className="table-auto w-full mt-10">
                <thead className="bg-pink-100">
                <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Message</th>
                    <th className="px-4 py-2">UserID</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Time Slot</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th> {/* Add this */}
                </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                {filteredAppointments.map(appointment => (
                    <tr key={appointment.id}>
                        <td className="border px-4 py-2">{appointment._id}</td>
                        <td className="border px-4 py-2">{appointment.message}</td>
                        <td className="border px-4 py-2">{appointment?.userid?.email}</td>
                        <td className="border px-4 py-2">{new Date(appointment.date).toLocaleString()}</td>
                        <td className="border px-4 py-2">{appointment.timeSlot}</td>
                        <td className="border px-4 py-2">
                            <button
                                className={`px-2 py-1 rounded ${appointment.status === 'approved' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                                onClick={() => toggleStatus(appointment._id, appointment.status)}
                            >
                                {appointment.status}
                            </button>
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                onClick={() => handleDelete(appointment._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ToastContainer position="top-center"/>
        </div>
    );
}
