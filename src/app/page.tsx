"use client";

import { ChangeEvent, useState } from "react";
import { useAdvocatesQuery } from "./use-advocates-query";
import { useDebounce } from "./use-debounce";

const advocateHeaderStructure = {
  firstName: 'First Name',
  lastName: 'Last Name',
  city: 'City',
  degree: 'Degree',
  specialties: 'Specialties',
  yearsOfExperience: 'Years of Experience',
  phoneNumber: 'Phone Number',
}

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}
export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const {advocates} = useAdvocatesQuery(debouncedSearchTerm);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: {searchTerm}
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={resetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
          {Object.values(advocateHeaderStructure).map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          </tr>
        </thead>
        <tbody>
          {advocates && advocates.length && advocates.map((advocate: Advocate, index: number) => {
            return (
              <tr key={index}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, specialtiesIndex) => (
                    <div key={specialtiesIndex}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
