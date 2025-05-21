import { useState } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const UserIcon = getIcon('users');
const ChartIcon = getIcon('bar-chart-2');
const BookIcon = getIcon('book');

const Home = () => {
  const [students, setStudents] = useState([]);
  
  const handleAddStudent = (newStudent) => {
    // Add new student with generated ID
    const studentWithId = {
      ...newStudent,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString(),
    };
    
    setStudents(prev => [studentWithId, ...prev]);
  };

  // Stats for the dashboard
  const stats = [
    { 
      title: "Total Students", 
      value: students.length, 
      icon: UserIcon, 
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300" 
    },
    { 
      title: "Enrolled", 
      value: students.filter(s => s.status === "Enrolled").length,
      icon: ChartIcon,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300" 
    },
    { 
      title: "Courses", 
      value: 2, // Maths and Science
      icon: BookIcon,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-300" 
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Student Management</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-6">
          Manage student enrollments and course registrations
        </p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{stat.value}</h3>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">{stat.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Main Feature Component */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <MainFeature onAddStudent={handleAddStudent} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="card p-4">
              <h2 className="text-xl font-semibold mb-4">Student Registry</h2>
              
              {students.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="mb-2 flex justify-center">
                    <UserIcon className="h-12 w-12 text-surface-300 dark:text-surface-600" />
                  </div>
                  <h3 className="text-lg font-medium text-surface-600 dark:text-surface-400">No students yet</h3>
                  <p className="text-surface-500 dark:text-surface-500">Add your first student using the form</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-surface-200 dark:border-surface-700">
                        <th className="py-3 px-2 text-left text-sm font-medium text-surface-500 dark:text-surface-400">Name</th>
                        <th className="py-3 px-2 text-left text-sm font-medium text-surface-500 dark:text-surface-400 hidden md:table-cell">Email</th>
                        <th className="py-3 px-2 text-left text-sm font-medium text-surface-500 dark:text-surface-400 hidden sm:table-cell">Course</th>
                        <th className="py-3 px-2 text-left text-sm font-medium text-surface-500 dark:text-surface-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <motion.tr 
                          key={student.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800"
                        >
                          <td className="py-3 px-2">
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-surface-500 dark:text-surface-400 sm:hidden">{student.course}</div>
                            </div>
                          </td>
                          <td className="py-3 px-2 hidden md:table-cell text-surface-600 dark:text-surface-400">{student.email}</td>
                          <td className="py-3 px-2 hidden sm:table-cell text-surface-600 dark:text-surface-400">{student.course}</td>
                          <td className="py-3 px-2">
                            <span className={`
                              badge
                              ${student.status === 'Enrolled' ? 'badge-enrolled' : 
                                student.status === 'Pending' ? 'badge-pending' : 
                                'badge-cancelled'}
                            `}>
                              {student.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;