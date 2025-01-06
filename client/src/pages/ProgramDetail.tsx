import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProgramDeleteForm from "../components/ProgramDeleteForm";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <>
        <h1>{program.title}</h1>
        <img src={program.poster} alt={program.title} />
        <p>{program.synopsis}</p>
        <p>Année : {program.year}</p>
        <p>Pays : {program.country}</p>
        <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
        <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
      </>
    )
  );
}

export default ProgramDetail;
