import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppointmentsScheduleHome() {
    const [appointments, setAppointments] = useState([
        { id: 1, message: "Appointment 1", userID: "user123", status: "pending", date: "2024-04-11", timeSlot: "10:00 AM" },
        { id: 2, message: "Appointment 2", userID: "user456", status: "approved", date: "2024-04-12", timeSlot: "11:00 AM" }
    ]);
    const [showForm, setShowForm] = useState(false);

    const toggleStatus = (id, status) => {
        if (status === 'approved') {
            toast.error("Approved appointment cannot be set back to pending!", { position: "top-center" });
            return;
        }
        setAppointments(prevAppointments =>
            prevAppointments.map(appointment =>
                appointment.id === id
                    ? { ...appointment, status: 'approved' }
                    : appointment
            )
        );
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

    return (
        <div className="container mx-auto relative">
            <h1 className="text-2xl font-bold mb-4 text-center">Appointments Scheduler</h1>
            

           
            <table className="table-auto w-full mt-10">
                <thead className="bg-pink-100">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Message</th>
                        <th className="px-4 py-2">UserID</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Time Slot</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td className="border px-4 py-2">{appointment.id}</td>
                            <td className="border px-4 py-2">{appointment.message}</td>
                            <td className="border px-4 py-2">{appointment.userID}</td>
                            <td className="border px-4 py-2">{appointment.date}</td>
                            <td className="border px-4 py-2">{appointment.timeSlot}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className={`px-2 py-1 rounded ${appointment.status === 'approved' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                                    onClick={() => toggleStatus(appointment.id, appointment.status)}
                                >
                                    {appointment.status}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer position="top-center" />
        </div>
    );
}
