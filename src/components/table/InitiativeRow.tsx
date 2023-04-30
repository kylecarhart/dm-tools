import { InputHTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeInitiative,
  updateInitiative,
} from "../../features/initiative/initiativeSlice";
import { Initiative } from "../../types";
import Button from "../button/Button";

interface Props {
  index: number;
  initiative: Initiative;
}
export default function InitiativeRow({ initiative, index }: Props) {
  const { currInitiative } = useAppSelector((state) => state.initiative);
  const { playerName, characterName, currentHp, maxHp } = initiative;
  const dispatch = useAppDispatch();

  console.log({ index, currInitiative });

  return (
    <tr className={currInitiative === index ? "bg-gray-100" : ""}>
      <td>
        <InitiativeInput
          text={playerName}
          onChange={(value) =>
            dispatch(
              updateInitiative({
                index,
                initiative: { ...initiative, playerName: value },
              })
            )
          }
        />
      </td>
      <td>
        <InitiativeInput
          text={characterName}
          onChange={(value) =>
            dispatch(
              updateInitiative({
                index,
                initiative: { ...initiative, characterName: value },
              })
            )
          }
        />
      </td>
      <td>
        <InitiativeInput
          text={currentHp}
          type="number"
          onChange={(value) =>
            dispatch(
              updateInitiative({
                index,
                initiative: {
                  ...initiative,
                  currentHp: value,
                },
              })
            )
          }
        />
      </td>
      <td>
        <InitiativeInput
          text={maxHp}
          type="number"
          onChange={(value) =>
            dispatch(
              updateInitiative({
                index,
                initiative: {
                  ...initiative,
                  maxHp: value,
                },
              })
            )
          }
        />
      </td>
      <td>
        <Button onClick={() => dispatch(removeInitiative(index))}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

interface InitiativeInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  text: string;
  onChange: (value: string) => any;
}
function InitiativeInput({ text, onChange, ...props }: InitiativeInputProps) {
  return (
    <input
      className="px-4 py-2 bg-transparent"
      value={text}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
}
