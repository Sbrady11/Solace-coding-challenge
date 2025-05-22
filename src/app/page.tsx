"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useAdvocatesQuery } from "./use-advocates-query";

const AdvocateHeaderStructure = {
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
  const {advocates} = useAdvocatesQuery()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>(advocates);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      const {firstName, lastName, city, degree, specialties, yearsOfExperience} = advocate;
      return (
        firstName?.includes?.(searchTerm) ||
        lastName?.includes?.(searchTerm) ||
        city?.includes?.(searchTerm) ||
        degree?.includes?.(searchTerm) ||
        specialties?.includes?.(searchTerm) ||
        yearsOfExperience?.toString()?.includes?.(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const resetSearch = () => {
    setFilteredAdvocates(advocates);
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
          {Object.values(AdvocateHeaderStructure).map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates?.map((advocate, index) => {
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
