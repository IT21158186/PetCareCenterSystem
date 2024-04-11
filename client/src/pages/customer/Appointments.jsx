import React, { useEffect, useState } from "react";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authAxios from "../../utils/authAxios";
import { apiUrl } from "../../utils/Constants";
import 'react-clock/dist/Clock.css';
export default function Appointments({ userId }) {
    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [timeSlot, setTimeSlot] = useState(null);

    const handleStatusClick = (id, status) => {
        if (status === 'approved') {
            toast.error("This appointment is already approved!", { position: "top-center" });
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

    const handleFormSubmit =async (event) => {
        event.preventDefault();
        try {
            const resp = await authAxios.post(`${apiUrl}/appointment`, {
                message: event.target.message.value,
                date: event.target.date.value,
                timeSlot: event.target.timeSlot.value
            })
            toast.success('Appointment Created')
            myApps()
        } catch (error) {
            console.log(error);
        }
        setShowForm(false);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    const myApps = async () => {
        try {
            const data = await authAxios.get(`${apiUrl}/appointment/my`)
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
            <button className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => setShowForm(true)}>Make Appointment</button>

            {showForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <button className="absolute top-0 right-0 m-2" onClick={handleClose}>Close</button>
                        <h2 className="text-lg font-semibold mb-4">Make Appointment</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="message" className="block font-medium">Message:</label>
                                <input type="text" id="message" name="message" className="border border-gray-400 rounded px-3 py-2 w-full" placeholder="Enter your message" />
                            </div>
                            <div>
                                <label htmlFor="date" className="block font-medium">Date:</label>
                                <input type="date" id="date" name="date" className="border border-gray-400 rounded px-3 py-2 w-full" placeholder="Select date" />
                            </div>
                            <div>
                                <label htmlFor="timeSlot" className="block font-medium">Time Slot:</label>
                                <TimePicker
                                    id="timeSlot"
                                    name="timeSlot"
                                    className="border border-gray-400 rounded px-3 py-2 w-full"
                                    placeholder="Select time" // Placeholder for time picker
                                    value={timeSlot}
                                    onChange={setTimeSlot}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded mr-2">Submit</button>
                                <button onClick={handleClose} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


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
                            <td className="border px-4 py-2">{appointment?._id}</td>
                            <td className="border px-4 py-2">{appointment?.message}</td>
                            <td className="border px-4 py-2">{appointment?.userid?.email}</td>
                            <td className="border px-4 py-2">{new Date(appointment?.date).toLocaleString()}</td>
                            <td className="border px-4 py-2">{appointment?.timeSlot}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className={`px-2 py-1 rounded ${appointment.status === 'approved' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                                    onClick={() => handleStatusClick(appointment.id, appointment.status)}
                                    disabled={appointment.status === 'approved' || appointment.status === 'pending'}
                                >
                                    {appointment.status === 'approved' ? 'Approved' : 'Pending'}
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

