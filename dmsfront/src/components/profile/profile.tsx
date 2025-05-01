import { useEffect, useState } from 'react';
import Navbar from '../navbar/navBar';
import styles from './profile.module.css';
import { useUser } from '../usercontext/userContext';

type Employee = {
  firstName: string;
  lastName: string;
  role: string;
  age: number;
};

export default function Profile() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { username } = useUser();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/profile'); //*had to change this to profile and create a route for it.
        if (!response.ok) {
          throw new Error('Failed to fetch employee reports');
        }
        const data = await response.json();
        console.log(data);
        setEmployees(data);
        console.log(employees);
      } catch (err) {
        const error = err as Error;
        console.error('Error fetching quiz result:', err);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getEmployees();
  }, []); //! removed the employees from the brackets it was calling a loop. we were running getemployees every time employees changed but getEmployees sets employees....
  //*if you get react hook useEffect ... error (this is an ES lint thing and we can ignore it.)

  //*This handles the state changes/notifications of errors
  if (loading) return <h2>Loading Profile...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!employees) return <h2>No employee reports found.</h2>;

  return (
    <div>
      <Navbar />
      <h1 className={styles.title}>{username}'s Profile</h1>

      {/* Table for Employee Report History */}
      <h2 className={styles.Subtitle}>Employee Report History</h2>
      <table className={styles.breakdown}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Offense Type</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item: Employee, index: number) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.role}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
