import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CourseDeliveryDetails() {
  const { deliveryYear, semester, id } = useParams();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/instances/${id}/${deliveryYear}/${semester}`)
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data);
      })
      .catch((error) => console.error("Error fetching:", error));
  }, [id, deliveryYear, semester]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Course Delivery Details</h2>
      <p>Delivery Year: {courseData.deliveryYear}</p>
      <p>Semester: {courseData.semester}</p>
      <p>Course Title: {courseData.course.courseTitle}</p>
      <p>Course Code: {courseData.course.courseCode}</p>
      <p>Course Description: {courseData.course.courseDescription}</p>
      <p>Course Delivery ID: {courseData.cd_ID}</p>
    </div>
  );
}

export default CourseDeliveryDetails;
