import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCourse from './components/AddCourse';
import ErrorComponent from './components/ErrorComponent'
import CourseDetails from './components/CourseDetails';
import CourseDeliveryDetails from './components/CourseDeliveryDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCourse />} />
        <Route path="/courses" element={<AddCourse />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/instance/:id/:deliveryYear/:semester" element={<CourseDeliveryDetails />} />
        <Route path='*' element={<ErrorComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
