import { useDispatch, useSelector } from "react-redux";
import { fetchChars } from "../features/marvelSlice";
import { useEffect } from "react";
import Card from "./Card";

export default function CardQuote() {
  const dispatch = useDispatch();
  const chars = useSelector((state) => {
    return state.char.chars;
  });

  console.log(chars, "<< char masuk dari card quote<<<");
  useEffect(() => {
    dispatch(fetchChars());
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        {chars.map((char) => {
          return <Card key={char.id} char={char} />;
        })}
      </div>
    </>
  );
}
