import PropTypes from 'prop-types';

function Marks({ marks }) {
  let total = 0;
  marks.forEach((m) => {
    total += m.score;
  });

  return (
    <div>
      <h2>Subject Marks</h2>
      {marks.map((m) => (
        <p className="mark-item" key={m.subject}>{m.subject}: {m.score}</p>
      ))}
      <p>Total Score: {total}</p>
    </div>
  );
}

Marks.propTypes = {
  marks: PropTypes.array,
};

export default Marks;
