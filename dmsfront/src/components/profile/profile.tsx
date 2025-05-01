import { useEffect, useState } from 'react';
import styles from './profile.module.css';

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

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
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
  }, [employees]);

  //*This handles the state changes/notifications of errors
  if (loading) return <h2>Loading Profile...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!employees) return <h2>No employee reports found.</h2>;

  return (
    <div>
      <h1 className={styles.title}>My Profile</h1>

      {/* Table for Employee Report History */}
      <h2 className={styles.Subtitle}>Employee Report History</h2>
      <table className={styles.breakdown}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Age</th>
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
