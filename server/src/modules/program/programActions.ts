import type { RequestHandler } from "express";
import programRepository from "./programRepository";

const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { title, synopsis, poster, country, year } = req.body;
  if (title == null) {
    errors.push({ field: "title", message: "The field is required" });
  } else if (title.length > 255) {
    errors.push({
      field: "title",
      message: "Should contain less than 255 characters",
    });
  }

  if (synopsis == null) {
    errors.push({ field: "synopsis", message: "The field is required" });
  }

  if (poster == null) {
    errors.push({ field: "poster", message: "The field is required" });
  } else if (poster.length > 255) {
    errors.push({
      field: "poster",
      message: "Should contain less than 255 characters",
    });
  }

  if (country == null) {
    errors.push({ field: "country", message: "The field is required" });
  } else if (country.length > 100) {
    errors.push({
      field: "country",
      message: "Should contain less than 100 characters",
    });
  }

  if (year == null) {
    errors.push({ field: "year", message: "The field is required" });
  }

  // Add logic to handle errors if any
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const programs = await programRepository.readAll();
    res.json(programs);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);
    const program = await programRepository.read(programId);
    if (program == null) {
      res.sendStatus(404);
    } else {
      res.json(program);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const program = {
      id: Number(req.params.id),
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: Number(req.body.year),
      category_id: Number(req.body.category_id),
    };
    const affectedRows = await programRepository.update(program);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newprogram = {
      name: req.body.name,
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: Number(req.body.year),
      category_id: Number(req.body.category_id),
    };
    const insertId = await programRepository.create(newprogram);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);

    await programRepository.delete(programId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy, validate };
