import "./Spinner.css"; // Import CSS file for styling (create this file)

const Spinner = ({ size = "medium" }) => {
  return (
    <div className="loader-container">
      <div className={`loader ${size}`}></div>
    </div>
  );
};

export default Spinner;
