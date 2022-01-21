import { mines } from "../utils/assets";
import "./styles/icons.scss";

const Mines = ({ mode }) => (
  <img src={mines} alt="" className={`${mode}-icon`} />
);

export default Mines;
