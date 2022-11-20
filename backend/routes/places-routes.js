const express = require('express');

const router = express.Router();

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
];

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid // {pid: 'p1'}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    });

    if (!place) {
        //next better than throw, works also for async
       const error = new Error('Could not find the place for the provided place id.');
       error.code = 404;
       throw error;
    }   

    res.json({place: place}); //send json data
});

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    });

    if (!place) {
        const error = new Error('Could not find the place for the provided user id.');
        error.code = 404;
        return next(error);
     }
 
    res.json({place: place});
});


module.exports = router;