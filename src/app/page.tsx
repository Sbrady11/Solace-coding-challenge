"use client";

import { Advocate } from "./advocate";
import { useAdvocateSearch } from "./use-advocate-search";
import { Advocate as TAdvocate } from "./types";
import solace from '../assets/solace.svg';
import Image from "next/image";

export default function Home() {
const {searchTerm, onChange, resetSearch, advocates} = useAdvocateSearch();
  return (
    <main style={{ margin: "24px" }}>
      <Image src={solace} alt="Solace" height={200} width={200} />
      <div>
        <h1>Advocate Search</h1>
        <p>
          Searching for: {searchTerm}
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={resetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      <div className="advocates">
          {advocates && advocates.length && advocates.map((advocate: TAdvocate, index: number) => 
            <Advocate key={index} advocateInfo={advocate}/>)
          }
      </div>
    </main>
  );
}
