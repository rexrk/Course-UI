import React, { useState, useEffect } from "react";
import './CourseUI.css';

function AddCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [deliveryYear, setDeliveryYear] = useState("");
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

const handleAddCourse = async (e) => {
  e.preventDefault();
  const newCourse = { courseTitle, courseCode, courseDescription };

  try {
    const response = await fetch('http://localhost:8080/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCourse)
    });

    if (response.ok) {
      const data = await response.json();
      setCourses([...courses, data]);
      setCourseTitle("");
      setCourseCode("");
      setCourseDescription("");
      alert("Course added");
    } else {
      const errorMessage = await response.text();
      alert(`Error: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error adding course:', error);
    alert("An error occurred while adding the course.");
  }
};


  const handleAddDelivery = async () => {
    if (!selectedCourse || !deliveryYear || !semester) {
      alert("Please fill out all fields.");
      return;
    }

    const newDelivery = { 
      course: { id: selectedCourse }, 
      deliveryYear, 
      semester 
    };

    try {
      const response = await fetch('http://localhost:8080/api/instances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDelivery)
      });
      const data = await response.json();
      setInstances([...instances, data]);
      setDeliveryYear("");
      setSemester("");
      alert("Course delivery added");
    } catch (error) {
      console.error('Error adding delivery:', error);
    }
  };

  const handleListCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error listing courses:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/courses/${id}`, {
        method: 'DELETE'
      });
      handleListCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleListInstances = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/instances/${deliveryYear}/${semester}`);
      const data = await response.json();
      setInstances(data);
    } catch (error) {
      console.error('Error listing instances:', error);
    }
  };

  const handleDeleteInstance = async (year, semester, id) => {
    try {
      await fetch(`http://localhost:8080/api/instances/${year}/${semester}/${id}`, {
        method: 'DELETE'
      });
      setInstances(instances.filter(instance => instance.id !== id));
    } catch (error) {
      console.error('Error deleting instance:', error);
    }
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
              <button className="but" type="button" onClick={handleListCourses}>Refresh</button>
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
            <button type="button" onClick={handleAddDelivery}>Add Delivery</button>
          </form>
        </div>
      </div>

      <hr className="divider-line" />

      <button className="list-courses-btn" onClick={handleListCourses}>
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
                  <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="divider-line" />

      <div className="list-instances-container">
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
        <button className="list-instances-btn" onClick={handleListInstances}>
          List Instances
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
            {instances.map((instance) => (
              <tr key={instance.id}>
                <td>{instance.course.courseTitle}</td>
                <td>{instance.deliveryYear}-{instance.semester}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDeleteInstance(instance.deliveryYear, instance.semester, instance.id)}>Delete</button>
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
