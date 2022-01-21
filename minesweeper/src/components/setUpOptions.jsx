import { options } from "../utils/constants";
import { useMinerGame } from "../context/minerGameContext";
import { Link } from "react-router-dom";
import "./styles/setUp.scss";
const SetUpOptions = () => {
  const { handleDif } = useMinerGame();
  return (
    <div className="container-options">
      {options.map((e) => (
        <Link className="link-options" to="/">
          <button
            className="btn-options"
            key={e.lbl}
            onClick={() => handleDif(e)}
          >
            {e.lbl}
          </button>
        </Link>
      ))}
    </div>
  );
};
export default SetUpOptions;
