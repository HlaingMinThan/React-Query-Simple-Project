import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";
let fetchPlanets = async ({ queryKey }) => {
  const [_key, page] = queryKey; //["planets", page]
  let res = await fetch(`https://swapi.dev/api/planets?page=${page}`);
  return res.json();
};
const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, isSuccess, isLoading, isError, error, isPreviousData } =
    useQuery(["planets", page], fetchPlanets, {
      keepPreviousData: true, //should use on pagination because keep previous fetched data on page when it's requesting for new page queries
      // staleTime: 3000,
      // cacheTime: 3,
      onSuccess: function () {
        console.log("data retreive fine");
      },
      onError: function () {
        console.log("getting error");
      },
    });
  return (
    <div>
      <h2>Planets</h2>
      {isLoading && <div>loading ......</div>}
      {isError && <div>{error.message}</div>}
      {isSuccess && (
        <>
          <div className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>{page}</span>
            <button
              disabled={isPreviousData || !data || !data.next}
              onClick={() =>
                setPage((prev) => (!data || !data.next ? prev : prev + 1))
              }
            >
              Next
            </button>
          </div>
          {data.results.map((planet) => (
            <Planet planet={planet} key={planet.name} />
          ))}
        </>
      )}
    </div>
  );
};

export default Planets;
