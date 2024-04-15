import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';

const CreateSchedule = () => {

    const [schedules, setSchedules] = useState([]);
    const [showForm, setShowForm] = useState(false)
    const [createSc, setData] = useState({
        dateFrom: '',
        dateTo: '',
        appointments: {
            slotOne: [
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                }
            ],
            slotTwo: [

                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                }
            ],
            slotThree: [

                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                }
            ],
            slotFour: [

                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                },
                {
                    status: "available"
                }
            ]
        }
    })

    const timeSlots = [
        "9:00am - 9:30am",
        "9:30am - 10:00am",
        "4:00pm - 4:30pm",
        "4:30pm - 5:00pm",
        // Add more time slots here
    ];

    const getAllSchedule = async () => {
        try {
            const resp = await axios.get(`${apiUrl}/schedules`)
            console.log(resp.data);
            setSchedules(resp.data)
        } catch (error) {
            console.log(error);
        }
    }

    const createSchedule = async () => {
        try {
            const resp = await axios.post(`${apiUrl}/schedules`, createSc)
            console.log(resp.data);
            toast.success('Schedule created')
            getAllSchedule()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllSchedule()
    }, [])

    const handleChange = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
// Function to update status of a slot
const updateSlotStatus = (slot, index) => {
    setData(prevState => ({
        ...prevState,
        appointments: {
            ...prevState.appointments,
            [slot]: prevState.appointments[slot].map((item, i) =>
                i === index ? { ...item, status: item.status === 'available' ? 'booked' : 'available' } : item
            )
        }
    }));
};
    return (
        <div className='relative'>
            <button onClick={() => setShowForm(true)} className='px-4 py-2 bg-green-200'> CreateSchedule</button>

            <div className='mt-10'>
                <h1>All Schedules</h1>
                <div className='bg-white p-3'>
                    <div className='bg-green-100 p-2 flex items-center justify-between text-center'>
                        <div className='w-1/3'>
                            ID
                        </div>
                        <div className='w-1/3'>
                            START DATE
                        </div>
                        <div className='w-1/3'>
                            END DATE
                        </div>

                    </div>
                    {
                        schedules.map((sc) => (
                            <div className='bg-green-100 p-2 flex items-center justify-between text-center'>
                                <div className='w-1/3'>
                                    {sc._id}
                                </div>
                                <div className='w-1/3'>
                                    {new Date(sc.dateFrom).toDateString()}
                                </div>
                                <div className='w-1/3'>
                                    {new Date(sc.dateTo).toDateString()}
                                </div>

                            </div>
                        ))
                    }

                </div>
            </div>
            {
                showForm && <div className='bg-white p-5 -translate-x-1/2 absolute top-1/2 left-1/2 shadow-xl'>
                    <div className='flex gap-5 items-center'>
                        <h2>Start Date</h2>
                        <input type="date" name="dateFrom" id="" onChange={handleChange} />
                    </div>

                    <div className='flex gap-5 items-center'>
                        <h2>End Date</h2>
                        <input type="date" name="dateTo" id="" onChange={handleChange} />
                    </div>
                    <div className='flex items-center justify-between'>
                        {
                            Object.keys(createSc?.appointments).map((slotKey, index) => (
                                <div>
                                    <div className="text-center col-span-1 border p-2">{timeSlots[index]}</div>
                                    {createSc?.appointments[slotKey].map((appointment,j) => (
                                        <button onClick={()=>updateSlotStatus(slotKey,j)} className={`text-center w-full col-span-1 border p-2 ${appointment.status =='available' ? 'bg-green-100 hover:bg-green-400' : 'bg-red-100 hover:bg-red-400'}`}>{appointment.status}</button>
                                    ))}
                                </div>
                            ))
                        }
                    </div>


                    <div className='flex gap-5 items-center justify-between mt-10'>
                        <button className='px-4 py-2 bg-green-200' onClick={createSchedule}>Submit</button>
                        <button className='px-4 py-2 bg-red-200' onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default CreateSchedule