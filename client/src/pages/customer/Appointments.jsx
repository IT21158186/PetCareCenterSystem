import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Appointments() {
    const [appointments, setAppointments] = useState([
        { id: 1, message: "Appointment 1", userID: "user123", status: "pending" },
        { id: 2, message: "Appointment 2", userID: "user456", status: "resolved" }
    ]);

    const toggleStatus = (id, status) => {
        if (status === 'resolved') {
            toast.error("Resolved appointment cannot be set back to pending!", { position: "top-center" });
            return;
        }
        setAppointments(prevAppointments =>
            prevAppointments.map(appointment =>
                appointment.id === id
                    ? { ...appointment, status: 'resolved' }
                    : appointment
            )
        );
    };

    return (
        <div className="container mx-auto ">
            <h1 className="text-2xl font-bold mb-4" style={{ textAlign: 'center' }}>Appointments Scheduler</h1>
            <table className="table-auto w-full">
                <thead className="bg-pink-100">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Message</th>
                        <th className="px-4 py-2">UserID</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td className="border px-4 py-2">{appointment.id}</td>
                            <td className="border px-4 py-2">{appointment.message}</td>
                            <td className="border px-4 py-2">{appointment.userID}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className={`px-2 py-1 rounded ${appointment.status === 'resolved' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                                    onClick={() => toggleStatus(appointment.id, appointment.status)}
                                >
                                    {appointment.status}
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
