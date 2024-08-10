import { FaArrowDown, FaArrowUp, FaHome } from "react-icons/fa";

export function InstituteNavigation({
  floorNumber,
  AppOrDownClick,
  handleButtonClickBack,
  limitFloors,
}) {
  return (
    <>
      <div className="floor-number">{floorNumber}</div>
      <div className="institute-container">
        <div>
          <a
            onClick={() => AppOrDownClick(-1)}
            className={`institute__btn ${
              limitFloors[0] == floorNumber ? "disabled" : ""
            }`}
            href="#"
          >
            <FaArrowDown />
          </a>
        </div>
        <div>
          <a
            onClick={handleButtonClickBack}
            className="institute__btn"
            href="#"
          >
            <FaHome />
          </a>
        </div>
        <div>
          <a
            onClick={() => AppOrDownClick(1)}
            className={`institute__btn ${
              limitFloors[1] == floorNumber ? "disabled" : ""
            }`}
            href="#"
          >
            <FaArrowUp />
          </a>
        </div>
      </div>
    </>
  );
}
