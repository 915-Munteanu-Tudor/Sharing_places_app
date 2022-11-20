import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'London Eye',
        description: 'A must see in London!',
        imageUrl: 'https://cdn.britannica.com/26/95926-050-0228E1A6/London-Eye-River-Thames.jpg',
        address: 'London SW1A 0AA, Regatul Unit',
        location: {
            lat: 51.5005221,
            lng: -0.1248936,
        },
        creator: 'u1'
    },

    {
        id: 'p2',
        title: 'Big Ben',
        description: 'One of the most impressing buildings!',
        imageUrl: 'https://cdn.britannica.com/49/136849-050-6A33C899/Big-Ben-London.jpg',
        address: 'Riverside Building, County Hall, London SE1 7PB, Regatul Unit',
        location: {
            lat: 51.5007292,
            lng: -0.1268141
        },
        creator: 'u2'
    }

]

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return (
        <PlaceList items={loadedPlaces} />
    );
};

export default UserPlaces;