import type { ReactNode } from "react";

type ProgramData = {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: ProgramData;
  onSubmit: (program: ProgramData) => void;
}

function ProgramForm({ children, defaultValue, onSubmit }: ProgramFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get("title") as string;
        const synopsis = formData.get("synopsis") as string;
        const country = formData.get("country") as string;
        const year = Number(formData.get("year"));
        const poster = formData.get("poster") as string;
        const category_id = Number(formData.get("category_id"));

        onSubmit({
          title,
          synopsis,
          country,
          year,
          poster,
          category_id,
        });
      }}
    >
      <p>Title:</p>
      <input
        type="text"
        name="title"
        defaultValue={defaultValue.title}
        required
      />
      <p>Synopsis:</p>
      <input name="synopsis" defaultValue={defaultValue.synopsis} required />
      <p>Country:</p>
      <input
        type="text"
        name="country"
        defaultValue={defaultValue.country}
        required
      />
      <p>Year:</p>
      <input
        type="number"
        name="year"
        defaultValue={defaultValue.year}
        required
      />
      <p>Poster:</p>
      <input
        type="text"
        name="poster"
        defaultValue={defaultValue.poster}
        required
      />
      <p>Category ID:</p>
      <input
        type="number"
        name="category_id"
        defaultValue={defaultValue.category_id}
        required
      />
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramForm;
