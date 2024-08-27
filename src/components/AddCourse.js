import React, { useState, useEffect } from "react";
import "./CourseUI.css";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [courses, setCourses] = useState([]);
  const [coursesDelivery, setCoursesDelivery] = useState([]);

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
        alert("Course delivery added!");
        setDeliveryYear("");
        setSemester("");
      } else {
        alert("Failed to add course delivery.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        refreshCourses();
      } else {
        alert('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('An error occurred');
    }
  };

  const handleListcourseDelivery = async () => {
    if (!deliveryYear || !semester) {
      alert("Please enter values.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/instances/${deliveryYear}/${semester}`);
      
      if (response.ok) {
        const data = await response.json();
        setCoursesDelivery(data);
        const enrichedData = data.map(courseDelivery => ({
          ...courseDelivery,
          deliveryYear: deliveryYear,
          semester: semester 
        }));
  
        setCoursesDelivery(enrichedData);
      } else {
        alert("Failed to fetch.");
      }
    } catch (error) {
      console.error("Error in fetching:", error);
    }
  };
  

  const handleDeleteInstance = async (deliveryYear, semester, id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/instances/${deliveryYear}/${semester}/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Instance deleted.");
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("An error occurred.");
    }
  };
  
  const navigate = useNavigate();

  const handleSearchCourse = (id) => {
    navigate(`/course/${id}`);
  };

  const handleSearchInstance = (id, deliveryYear, semester) => {
    navigate(`/instance/${id}/${deliveryYear}/${semester}`);
  };

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
                  <button onClick={() => handleSearchCourse(course.id)}>Search</button>
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
              <th>Course Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coursesDelivery.map((instance) => (
              <tr key={instance.id}>
                <td>{instance.courseTitle}</td>
                <td>
                  {instance.deliveryYear}-{instance.semester}
                </td>
                <td>{instance.courseCode}</td>
                <td>
                  <button onClick={() => handleSearchInstance(instance.id, instance.deliveryYear, instance.semester)}>Search</button>
                  <button
                    onClick={() =>handleDeleteInstance(instance.id, instance.deliveryYear, instance.semester)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddCourse;
