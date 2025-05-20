const Filter = ({ current, onChange }) => {
    return (
      <div className="filter">
        {['all', 'completed', 'pending'].map(status => (
          <button
            key={status}
            className={current === status ? 'active' : ''}
            onClick={() => onChange(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    );
  };
  
  export default Filter;
  