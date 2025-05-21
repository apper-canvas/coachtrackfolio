import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const UserPlusIcon = getIcon('user-plus');
const UserCheckIcon = getIcon('user-check');
const XIcon = getIcon('x');
const CheckIcon = getIcon('check');
const AlertCircleIcon = getIcon('alert-circle');

const MainFeature = ({ onAddStudent }) => {
  const initialFormState = {
    name: '',
    email: '',
    contactNumber: '',
    course: '',
    status: 'Pending'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Student name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Contact number validation
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit number';
    }
    
    // Course validation
    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }
    
    // Status validation
    if (!formData.status) {
      newErrors.status = 'Please select a status';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the error for this field when user changes the value
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Call the parent component's add student function
      onAddStudent(formData);
      
      // Show success message
      toast.success('Student added successfully!');
      
      // Reset form
      setFormData(initialFormState);
    } catch (error) {
      toast.error('Failed to add student. Please try again.');
      console.error('Error adding student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div 
      className="card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Add New Student</h2>
        <div className="h-10 w-10 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
          <UserPlusIcon className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Student Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter student name"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-xs mt-1 flex items-center"
              >
                <AlertCircleIcon className="h-3 w-3 mr-1" />
                {errors.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="student@example.com"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-xs mt-1 flex items-center"
              >
                <AlertCircleIcon className="h-3 w-3 mr-1" />
                {errors.email}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Contact Number Field */}
        <div>
          <label htmlFor="contactNumber" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className={`input-field ${errors.contactNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="10-digit mobile number"
          />
          <AnimatePresence>
            {errors.contactNumber && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-xs mt-1 flex items-center"
              >
                <AlertCircleIcon className="h-3 w-3 mr-1" />
                {errors.contactNumber}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Course Selection Field */}
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Course
          </label>
          <div className="relative">
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={`select-field ${errors.course ? 'border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="" disabled>Select a course</option>
              <option value="Maths">Maths</option>
              <option value="Science">Science</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-700 dark:text-surface-300">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <AnimatePresence>
            {errors.course && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-xs mt-1 flex items-center"
              >
                <AlertCircleIcon className="h-3 w-3 mr-1" />
                {errors.course}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Status Selection Field */}
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
            Status
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`select-field ${errors.status ? 'border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="" disabled>Select a status</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-700 dark:text-surface-300">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <AnimatePresence>
            {errors.status && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-xs mt-1 flex items-center"
              >
                <AlertCircleIcon className="h-3 w-3 mr-1" />
                {errors.status}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={() => setFormData(initialFormState)}
            className="btn btn-outline flex-1 flex items-center justify-center"
            disabled={isSubmitting}
          >
            <XIcon className="h-4 w-4 mr-1" />
            Clear
          </button>
          
          <motion.button
            type="submit"
            className="btn btn-primary flex-1 flex items-center justify-center"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <UserCheckIcon className="h-4 w-4 mr-1" />
            )}
            {isSubmitting ? 'Saving...' : 'Add Student'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default MainFeature;