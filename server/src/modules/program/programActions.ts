import type { RequestHandler } from "express";
import programRepository from "./programRepository";

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

export default { browse, read, edit, add, destroy };
