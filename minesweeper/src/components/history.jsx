import { useMinerGame } from "../context/minerGameContext";
import { lblHistory, strings } from "../utils/constants";
import "./styles/history.scss";

const History = () => {
  const { listHistory } = useMinerGame();
  return (
    <>
      <div className="element-history">
        {lblHistory.map((e) => (
          <h1 key={e} className="text">
            {e}
          </h1>
        ))}
      </div>
      {listHistory.length > 0 ? (
        listHistory.map((e, i) => {
          return (
            <div key={i} className="element-history">
              <p className="text">{e.startTime}</p>
              <p className="text">{e.finishTime}</p>
              <p className="text">{e.mode}</p>
              <p className="text">{e.matchStatus}</p>
            </div>
          );
        })
      ) : (
        <h1 className="text">{strings.notHistorys}</h1>
      )}
    </>
  );
};

export default History;
