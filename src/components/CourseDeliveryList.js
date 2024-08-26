import React from 'react';

function CourseDeliveryList({ deliveries }) {
    return (
        <div>
            <h2>All Course Deliveries</h2>
            <ul>
                {deliveries.map(delivery => (
                    <li key={delivery.id}>
                        Course ID: {delivery.courseId}, Year: {delivery.year}, Semester: {delivery.semester}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseDeliveryList;
