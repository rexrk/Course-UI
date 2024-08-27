import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/courses/${id}`)
      .then((response) => 
        response.json())
      .then((data) => {
        console.log(courseData)
        setCourseData(data)})
      .catch((error) => console.error("Error fetching:", error));
  }, [id]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Course Details</h2>
      <p>Course Title: {courseData.courseTitle}</p>
      <p>Course Code: {courseData.courseCode}</p>
      <p>Course Description: {courseData.courseDescription}</p>
    </div>
  );
}

export default CourseDetails;
