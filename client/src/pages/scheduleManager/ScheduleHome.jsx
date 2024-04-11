import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authAxios from "../../utils/authAxios";
import { apiUrl } from "../../utils/Constants";
import axios from "axios";

export default function AppointmentsScheduleHome() {
    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const toggleStatus =async (id, status) => {
        if (status === 'approved') {
            toast.error("Approved appointment cannot be set back to pending!", { position: "top-center" });
            return;
        }
        try {
            const resp = await axios.put(`${apiUrl}/appointment/${id}`,{status:'approved'})
            toast.success('Appointment Approved')
            myApps()
        } catch (error) {
            console.log(error);
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
            const data = await authAxios.get(`${apiUrl}/appointment`)
            console.log(data.data);
            setAppointments(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        myApps()
    }, [])

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
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer position="top-center" />
        </div>
    );
}
