const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "London Eye",
    description: "A must see in London!",
    imageUrl:
      "https://cdn.britannica.com/26/95926-050-0228E1A6/London-Eye-River-Thames.jpg",
    address: "London SW1A 0AA, Regatul Unit",
    location: {
      lat: 51.5005221,
      lng: -0.1248936,
    },
    creator: "u1",
  },
  //,
  // {
  //     id: 'p2',
  //     title: 'Big Ben',
  //     description: 'One of the most impressing buildings!',
  //     imageUrl: 'https://cdn.britannica.com/49/136849-050-6A33C899/Big-Ben-London.jpg',
  //     address: 'Riverside Building, County Hall, London SE1 7PB, Regatul Unit',
  //     location: {
  //         lat: 51.5007292,
  //         lng: -0.1268141
  //     },
  //     creator: 'u2'
  // }
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // {pid: 'p1'}
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    //next better than throw, works also for async
    throw new HttpError(
      "Could not find the place for the provided place id.",
      404
    );
  }

  res.json({ place: place }); //send json data
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find the places for the provided user id.", 404)
    );
  }

  res.json({ places: places });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs, please check your data", 422);
  }

  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid.v4(),
    title: title,
    description: description,
    location: coordinates,
    address: address,
    creator: creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === p.id);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
