import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const s1 = {
    name: "Vishal",
    class: "11A",
  };

  const [state, setstate] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setstate({
        name: "Anshu",
        class: "7B",
      });
    }, 2000);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
