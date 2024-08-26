import React from 'react';

function CourseList({ courses }) {
    return (
        <div>
            <h2>All Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        {course.courseTitle} - {course.courseCode}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseList;
