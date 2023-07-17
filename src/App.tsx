import { useAppDispatch, useAppSelector } from "./app/hooks";
import Button from "./components/button/Button";
import InitiativeRow from "./components/table/InitiativeRow";
import {
  addInitiative,
  decInitiative,
  incInitiative,
  resetAll,
} from "./features/initiative/initiativeSlice";

function App() {
  const { initiatives, currInitiative, currRound } = useAppSelector(
    (state) => state.initiative
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <Button onClick={() => dispatch(addInitiative())}>Add Player</Button>
        <Button onClick={() => dispatch(resetAll())}>Clear</Button>
        <Button onClick={() => dispatch(incInitiative())}>Inc Int</Button>
        <Button onClick={() => dispatch(decInitiative())}>Dec Int</Button>
        <div>Who's up: {currInitiative}</div>
        <div>Round: {currRound}</div>
        <table className="table-fixed border-collapse border border-slate-400 rounded shadow-md">
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Character Name</th>
              <th>HP</th>
              <th>Max HP</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {initiatives.map((initiative, idx) => (
              <InitiativeRow key={idx} index={idx} initiative={initiative} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
