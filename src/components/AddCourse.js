import React, { useState, useEffect } from "react";
import "./CourseUI.css";

function AddCourse() {
  const [courses, setCourses] = useState([]);
  const [courseDelivery, setCourseDelivery] = useState([]);

  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const [selectedCourse, setSelectedCourse] = useState("");
  const [deliveryYear, setDeliveryYear] = useState("");
  const [semester, setSemester] = useState("");

  useEffect(() => refreshCourses(), []);

  function refreshCourses() {
    fetch("http://localhost:8080/api/courses")
      .then(response => response.json())
      .then(data => {
        setCourses(data);
        console.log(data)
      })
      .catch(error => {
        console.error("Error fetching courses:", error);
      });
  }

  const handleAddCourse = async (e) => {
    e.preventDefault();
  
    const newCourse = {
      courseTitle,
      courseCode,
      courseDescription
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourse)
      });
  
      if (response.ok) {
        alert("Content added")
        setCourseTitle("");
        setCourseCode("");
        setCourseDescription("");
        refreshCourses();
      } else {
        console.error("Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  

  const handleAddDelivery = async () => {
    if (!selectedCourse || !deliveryYear || !semester) {
      alert("Please fill all fields.");
      return;
    }
  
    const deliveryData = {
      deliveryYear: deliveryYear,
      semester: semester,
      course: {
        id: selectedCourse
      }
    };
  
  
    try {
      const response = await fetch("http://localhost:8080/api/instances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(deliveryData)
      });
  
      if (response.ok) {
        alert("Course delivery added successfully!");
        setDeliveryYear("");
        setSemester("");
      } else {
        alert("Failed to add course delivery.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the course delivery.");
    }
  };

  const handleDeleteCourse = async (id) => {};

  const handleListcourseDelivery = async () => {};

  const handleDeleteInstance = async (year, semester, id) => {};

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-left">
          <h2>Add Course</h2>
          <form onSubmit={handleAddCourse}>
            <input
              type="text"
              placeholder="Course Title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            <button type="submit">Add Course</button>
          </form>
        </div>

        <div className="vertical-line"></div>

        <div className="form-right">

          <h2>Course Delivery</h2>

          <form>
            <div className="form-group">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseTitle}
                  </option>
                ))}
              </select>
              <button className="but" type="button" onClick={refreshCourses}>
                Refresh
              </button>
            </div>
            <input
              type="text"
              placeholder="Delivery Year"
              value={deliveryYear}
              onChange={(e) => setDeliveryYear(e.target.value)}
            />
            <input
              type="text"
              placeholder="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
            <button type="button" onClick={handleAddDelivery}>
              Add Delivery
            </button>
          </form>


        </div>
      </div>

      <hr className="divider-line" />

      <button className="list-courses-btn" onClick={refreshCourses}>
        List Courses
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Course Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.courseTitle}</td>
                <td>{course.courseCode}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDeleteCourse(course.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="divider-line" />

      <div className="list-courseDelivery-container">
        <input
          type="text"
          placeholder="Delivery Year"
          value={deliveryYear}
          onChange={(e) => setDeliveryYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <button className="list-courseDelivery-btn" onClick={handleListcourseDelivery}>
          List courseDelivery
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Year-Semester</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {courseDelivery.map((instance) => (
              <tr key={instance.id}>
                <td>{instance.course.courseTitle}</td>
                <td>
                  {instance.deliveryYear}-{instance.semester}
                </td>
                <td>
                  <button>Edit</button>
                  <button
                    onClick={() =>
                      handleDeleteInstance(
                        instance.deliveryYear,
                        instance.semester,
                        instance.id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddCourse;
