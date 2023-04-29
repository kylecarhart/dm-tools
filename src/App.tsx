import { useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import InitiativeRow from "./components/table/InitiativeRow";
import {
  addInitiative,
  resetAll,
  decInitiative,
  incInitiative,
} from "./features/initiative/initiativeSlice";

function App() {
  const { initiatives, currInitiative, currRound } = useAppSelector(
    (state) => state.initiative
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <button onClick={() => dispatch(addInitiative())}>Add Player</button>
        <button onClick={() => dispatch(resetAll())}>Clear</button>
        <button onClick={() => dispatch(incInitiative())}>Inc Int</button>
        <button onClick={() => dispatch(decInitiative())}>Dec Int</button>
        <div>{currInitiative}</div>
        <div>{currRound}</div>
        <table className="border-collapse">
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Character Name</th>
              <th>HP</th>
              <th>Max HP</th>
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
