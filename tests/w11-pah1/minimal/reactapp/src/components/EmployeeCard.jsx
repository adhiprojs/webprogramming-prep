import PropTypes from 'prop-types';

function EmployeeCard({ employeeName, role, department }) {
  return (
    <div className="employee-card">
      <h3>{employeeName}</h3>
      <p>Role: {role}</p>
      <p>Department: {department}</p>
    </div>
  );
}

EmployeeCard.propTypes = {
  employeeName: PropTypes.string,
  role: PropTypes.string,
  department: PropTypes.string,
};

export default EmployeeCard;
