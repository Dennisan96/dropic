// all api calls goes here:
import uuid from 'uuid';


const URL = 'http://cloudphoto.us-east-1.elasticbeanstalk.com';

export const createNewTrip = (newTripName) => {
    // console.log(newTripName);
    // console.log(uuid.v1());
    const tripId = uuid.v1();
    let bodyParams = {
        'id': tripId,
        'tripMember': ['user-uuid-fake-sheldon'],
        'tripName': newTripName
    };


    fetch(URL + '/trips/new', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParams),
    })
    .then((response) => {
        console.log(response);
        console.log(response.ok);
        console.log(tripId);


        const queryURL = URL + `/trips/addMember?memberId=user-uuid-fake-sheldon&tripId=${tripId}`;
        fetch(queryURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response);
            console.log(response.ok);
        })
        .catch((error) => {
            console.error(error);
        });
          
    })
    .catch((error) => {
        console.error(error);
    });
};

export const GetTripList = (userId) => {
    const queryURL = URL + `/users/user-uuid-fake-sheldon`;
    fetch(queryURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      console.log(responseJson.trips);
    })
    .catch((error) => {
        console.error(error);
    });

};



_asyncGetReq = (endpoint, params) => {
    let options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    options = {...params, ...options};
    console.log(options);
    fetch(endpoint, options)
    .then((response) => {
          console.log(response);
          console.log(response.ok);
    })
    .catch((error) => {
        console.error(error);
    });
};

_asyncPostReq = (endpoint, bodyParams) => {
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyParams)
    })
    .then((response) => {
          console.log(response);
          console.log(response.ok);
    })
    .catch((error) => {
        console.error(error);
    });
};