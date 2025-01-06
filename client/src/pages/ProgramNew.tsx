import { useNavigate } from "react-router-dom";

import ProgramForm from "../components/ProgramForm";

function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: 0,
    category_id: 1,
  };

  return (
    <ProgramForm
      defaultValue={newProgram}
      onSubmit={(programData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((text) => {
                throw new Error(text);
              });
            }
            return response.json();
          })
          .then((data) => {
            navigate(`/programs/${data.insertId}`);
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(
              "Failed to create program. Please check the server logs for more details.",
            );
          });
      }}
    >
      Ajouter
    </ProgramForm>
  );
}

export default ProgramNew;
