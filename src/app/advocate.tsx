import { Advocate as TAdvocate } from "./types";

export const Advocate = ({advocateInfo, key}: {advocateInfo: TAdvocate, key: number}) => 
    <div className="advocate" key={key}>
        <div className="advocate-header">
            <h2>{advocateInfo.firstName} {advocateInfo.lastName}</h2>
        </div>
        <div className="content">
            <p>City: {advocateInfo.city}</p>
            <p>Degree: {advocateInfo.degree}</p>
            <p>Specialties: {advocateInfo.specialties.map((s: string, specialtiesIndex: number) => (
                <div key={specialtiesIndex}>{s}</div>
            ))}</p>
            <p>Years of Experience: {advocateInfo.yearsOfExperience}</p>
            <a href={`tel:${advocateInfo.phoneNumber}`}>Phone Number: {advocateInfo.phoneNumber}</a>
        </div>
    </div>
