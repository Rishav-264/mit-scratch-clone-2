import React from "react";
import Icon from "./Icon";

import Action from "./Action";
import { ActionList } from "../utils/ActionList";

export default function Sidebar({ setActionTree }) {
  return (
    <div className="w-70 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      {ActionList.Events.map((action) => (
        <Action
          key={action}
          backgroundColor={"rgb(234 179 8)"}
          content={action}
          isDraggable={true}
          setActionTree={setActionTree}
        />
      ))}
      <div className="font-bold"> {"Motion"} </div>
      {ActionList.Motion.map((action) => (
        <Action
          key={action}
          backgroundColor={"rgb(59 130 246)"}
          content={action}
          isDraggable={true}
          setActionTree={setActionTree}
        />
      ))}

      <div className="font-bold"> {"Motion"} </div>
      {ActionList.Looks.map((action) => (
        <Action
          key={action}
          backgroundColor={"rgb(139 92 246)"}
          content={action}
          isDraggable={true}
          setActionTree={setActionTree}
        />
      ))}
    </div>
  );
}
