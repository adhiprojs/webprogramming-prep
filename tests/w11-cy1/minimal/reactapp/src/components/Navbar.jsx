import PropTypes from 'prop-types';

function Navbar({ studentName }) {
  return (
    <nav>
      <h2>Student Dashboard</h2>
      <span>Home</span>
      <span>Marks</span>
      <span>Welcome, {studentName}</span>
    </nav>
  );
}

Navbar.propTypes = {
  studentName: PropTypes.string,
};

export default Navbar;
