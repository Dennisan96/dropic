// all api calls goes here:
import uuid from 'uuid';


const URL = 'http://cloudphoto.us-east-1.elasticbeanstalk.com';

export function createNewTrip(newTripName) {
    const tripId = uuid.v1();
    let bodyParams = {
        'id': tripId,
        'tripMember': ['user-uuid-fake-sheldon'],
        'tripName': newTripName
    };

    return new Promise((resolve) => {
        _asyncPostReq(URL + '/trips/new', bodyParams)
        .then(() => {
            const queryURL = URL + `/trips/addMember?memberId=user-uuid-fake-sheldon&tripId=${tripId}`;
            _asyncGetReq(queryURL)
            .then(() => resolve())
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });


    // heritage, crude but working code, just in case
    // .then((status) => {
    //     console.log(status);
        // if (status) {
        //     const queryURL = URL + `/trips/addMember?memberId=user-uuid-fake-sheldon&tripId=${tripId}`;
        //     _asyncGetReq(queryURL);
        // } else {
        //     // console.error('something wrong');
        // }

    // });

    // fetch(URL + '/trips/new', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(bodyParams),
    // })
    // .then((response) => {
    //     console.log(response);
    //     console.log(response.ok);
    //     console.log(tripId);


    //     const queryURL = URL + `/trips/addMember?memberId=user-uuid-fake-sheldon&tripId=${tripId}`;
    //     fetch(queryURL, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then((response) => {
    //         console.log(response);
    //         console.log(response.ok);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
          
    // })
    // .catch((error) => {
    //     console.error(error);
    // });
};

export function getTripList(userId) {
    return new Promise((resolve) => {
        const queryURL = URL + `/users/${userId}`;
        _asyncGetReq(queryURL)
        .then((response) => response.json())
        .then((response) => {
            resolve(response.trips);
        })
        .catch((err) => console.log(err));
    })
};

export function getFriendList(userId) {
    return new Promise((resolve) => {
        const queryURL = URL + `/users/${userId}`;
        _asyncGetReq(queryURL)
        .then((response) => response.json())
        .then((response) => {
            resolve(response.friends);
        })
        .catch((err) => console.log(err));
    })
};

export function getFriendsInfo(friendList) {
    let infoList = [];
    friendList.forEach((friendId, idx) => {
        const queryURL = URL + `/users/${friendId}`;
        let promise = new Promise(resolve => {
            _asyncGetReq(queryURL)
            .then((response) => response.json())
            .then((response) => {
                const {friends, profilePhotoId, trips, ...partialObject} = response;
                resolve(partialObject);
            })
            .catch((err) => console.log(err));
        });
        infoList.push(promise);
    });

    return new Promise((resolve) => {
        Promise.all(infoList)
        .then(values => {
            resolve(values);
        })
        .catch((err) => console.log(err));
    })
}


function _asyncGetReq(endpoint) {
    return new Promise((resolve, reject) => {
        fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.ok) {
                resolve(response);
            } else {
                reject('promise rej as post req not ok');
            }
        })
        .catch((error) => {
            reject('promise rej as post req error: ' + error);
        });
    });
};

function _asyncPostReq(endpoint, bodyParams) {
    return new Promise((resolve, reject) => {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParams)
        })
        .then((response) => {
              if (response.ok) {
                  resolve(response);
              } else {
                  reject('promise rej as post req not ok');
              }
        })
        .catch((error) => {
            reject('promise rej as post req error: ' + error);
        });
    });
};