import React, { useState } from 'react';

function AddCourseDelivery({ onCourseDeliveryAdd }) {
    const [courseId, setCourseId] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const courseDelivery = { courseId, year, semester };
        onCourseDeliveryAdd(courseDelivery);
    };

    return (
        <div>
            <h2>Add Course Delivery</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Course ID" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
                <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
                <input type="number" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
                <button style={{ backgroundColor: 'black', color: 'white' }} type="submit">Add Course Delivery</button>
            </form>
        </div>
    );
}

export default AddCourseDelivery;
