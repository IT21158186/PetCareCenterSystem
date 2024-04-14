import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../utils/Constants";

export default function DoctorScheduler() {
    // Dummy data for appointments (you can replace it with your actual data)
    const [appointments, setAppointments] = useState();
    // const appointments = [
    //     { day: "Monday", time: "9:00am - 9:30am", status: "Booked" },
    //     { day: "Tuesday", time: "9:00am - 9:30am", status: "Booked" },
    //     { day: "Wednesday", time: "4:00pm - 4:30pm", status: "Booked" },
    //     { day: "Thursday", time: "9:30am - 10:00am", status: "Booked" },
    //     { day: "Friday", time: "9:30am - 10:00am", status: "Booked" },
    //     { day: "Saturday", time: "9:30am - 10:00am", status: "Booked" },
    //     { day: "Sunday", time: "4:00pm - 4:30pm", status: "Booked" },
    //     // Add more appointments here
    // ];

    // Dummy data for time slots
    const timeSlots = [
        "9:00am - 9:30am",
        "9:30am - 10:00am",
        "4:00pm - 4:30pm",
        "4:30pm - 5:00pm",
        // Add more time slots here
    ];

    // Function to get the status of an appointment for a specific day and time
    // const getAppointmentStatus = (day, time) => {
    //     const appointment = appointments.find(appt => appt.day === day && appt.time === time);
    //     return appointment ? appointment.status : "Available";
    // };

    const getSchedule = async () => {
        try {
            const resp = await axios.get(`${apiUrl}/schedules/current`)
            console.log(resp.data);
            setAppointments(resp.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSchedule()
    }, [])

    return (
        <div className="flex items-center justify-center w-full">
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">Doctor Scheduler</h1>
                <div className="grid grid-cols-8 gap-2">
                    <div className="text-center border p-2"></div>
                    <div className="text-center border p-2 font-bold">Monday</div>
                    <div className="text-center border p-2 font-bold">Tuesday</div>
                    <div className="text-center border p-2 font-bold">Wednesday</div>
                    <div className="text-center border p-2 font-bold">Thursday</div>
                    <div className="text-center border p-2 font-bold">Friday</div>
                    <div className="text-center border p-2 font-bold">Saturday</div>
                    <div className="text-center border p-2 font-bold">Sunday</div>
                    {/* Time slots */}
                    {/* {appointments?.appointments?.map((timeSlot, index) => (
                        <React.Fragment key={index}>
                            <div className="text-center col-span-1 border p-2">{timeSlots[index]}</div>

                            <div className="text-center col-span-1 border p-2">{timeSlot?.status}</div>
                            <div className="text-center col-span-1 border p-2">{timeSlot?.status}</div>
                            <div className="text-center col-span-1 border p-2">{timeSlot?.status}</div>
                            <div className="text-center col-span-1 border p-2">{timeSlot?.status}</div>

                            <div className="text-center col-span-1 border p-2">{timeSlot?.status}</div>
                            <div className="text-center col-span-1 border p-2">{timeSlot?.status}</div>
                            <div className="text-center col-span-1 border p-2">{timeSlot?.status}</div>

                        </React.Fragment>
                    ))} */}
                    {appointments?.appointments && Object.keys(appointments?.appointments).map((slotKey, index) => (
                        <>
                            <div className="text-center col-span-1 border p-2">{timeSlots[index]}</div>
                            {appointments?.appointments[slotKey].map(appointment => (
                                 <div className="text-center col-span-1 border p-2">{appointment.status}</div>
                                ))}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}
