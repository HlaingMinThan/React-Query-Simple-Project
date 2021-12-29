import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";
let fetchPeople = async () => {
  let res = await fetch("https://swapi.dev/api/people");
  return res.json();
};
const People = () => {
  const { data, isSuccess, isLoading, isError, error } = useQuery(
    "people",
    fetchPeople
  );
  return (
    <div>
      <h2>People</h2>
      {isLoading && <div>loading ......</div>}
      {isError && <div>{error.message}</div>}
      {isSuccess &&
        data.results.map((person) => (
          <Person person={person} key={person.name} />
        ))}
    </div>
  );
};

export default People;
