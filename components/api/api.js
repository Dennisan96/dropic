// all api calls goes here:
import uuid from 'uuid';


const URL = 'http://cloudphoto.us-east-1.elasticbeanstalk.com';
const imgUploadURL = 'https://1bapz3fit6.execute-api.us-east-1.amazonaws.com/v01/img';

export function createNewTrip(newTripName, userId) {
    const tripId = uuid.v1();
    let bodyParams = {
        'id': tripId,
        'tripMember': [userId],
        'tripName': newTripName
    };

    return new Promise((resolve) => {
        _asyncPostReq(URL + '/trips/new', bodyParams)
        .then(() => {
            const queryURL = URL + `/trips/addMember?memberId=${userId}&tripId=${tripId}`;
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

export function listTripPhotoes(userId, tripId) {
    return new Promise((resolve) => {
        const queryURL = URL + `/photos/findAll?userId=${userId}&tripId=${tripId}`;
        console.log(queryURL);
        _asyncGetReq(queryURL)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            resolve(response);
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

export function inviteFriendsArr(tripId, addList) {
    const bodyParams = addList
    
    return new Promise(resolve => {
        _asyncPostReq(URL + `/trips/addMember?tripId=${tripId}`, bodyParams)
        .then(res => resolve(res));
    });
}

export function inviteFriends(tripId, addList) {
    let promiseList = [];
    addList.forEach((friendId, idx) => {
        const queryURL = URL + `/trips/addMember?memberId=${friendId}&tripId=${tripId}`;
        console.log(queryURL);
        let promise = new Promise(resolve => {
            _asyncGetReq(queryURL)
            .then((response) => {
                console.log(response.ok);
                resolve(response);
            })
            .catch((err) => console.log(err));
        });
        setTimeout(() => {
            promiseList.push(promise);
        }, 1000);
    });

    return new Promise((resolve) => {
        Promise.all(promiseList)
        .then(()=> {
            resolve();
        })
        .catch((err) => console.log(err));
    })
}

export function getUserProfile(userId) {
    return new Promise(resolve => {
        _asyncGetReq(URL + `/users/${userId}`)
        .then((response) => response.json())
        .then((res) => resolve(res))
    });
}

export function uploadProfilePhoto(msgList) {
    const bodyParams = msgList;
    // console.log(bodyParams);
    return new Promise((resolve) => {
        _asyncPostReq(imgUploadURL, bodyParams)
        .then((response) => response.json())
        .then((res) => resolve(res.messages))
    });
}

export function saveUserProfile(bodyParams) {
    return new Promise(resolve => {
        _asyncPostReq(URL + '/users/save', bodyParams)
        .then(res => resolve(res));
    })
}

export function getFriendsInfo(friendList) {
    let infoList = [];
    friendList.forEach((friendId, idx) => {
        const queryURL = URL + `/users/${friendId}`;
        let promise = new Promise(resolve => {
            _asyncGetReq(queryURL)
            .then((response) => response.json())
            .then((response) => {
                const {friends, trips, ...partialObject} = response;
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

export function sendFriendReq(fromUserId, toUserId) {
    const bodyParams = {
        fromUserId: fromUserId,
        status: 'pending',
        timeStamp: Date.now(),
        toUserId: toUserId
    }

    return new Promise(resolve => {
        _asyncPostReq(URL + '/users/addfriend', bodyParams)
        .then(res => resolve(res));
    })
}

export function getSentFriendReq(fromUserId) {
    const queryURL = URL + `/users/friendrequestsfrom?userId=${fromUserId}`;
    return new Promise(resolve => {
        _asyncGetReq(queryURL)
        .then(res => resolve(res));
    })
}

export function imgPostDB(resList, userId, tripId) {
    let photosList = [];
    resList.forEach((item, idx) => {
        photosList.push({
            id: item.img_id,
            ownerId: userId,
            photoAddress: {
              addressBucket: 'anda-bucket-cloudphoto-app',
              addressKey: item.img_id
            },
            tripId: tripId
        });
    });
    const bodyParams = {photos: photosList};
    // console.log(bodyParams);

    return new Promise((resolve) => {
        _asyncPostReq(URL + '/photos/newPhotos', bodyParams)
        .then(res => resolve(res));
    });
}

export function uploadImages(msgList, userId, tripId) {
    const bodyParams = {"messages": msgList};

    return new Promise((resolve) => {
        _asyncPostReq(imgUploadURL, bodyParams)
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson);
            imgPostDB(responseJson.messages, userId, tripId)
            .then(res => resolve(res));
        })
    });


    // const body = {
    //     "messages": [
    //       {
    //         "msg_id": "test-img-from-frontend",
    //         "img_id": "",
    //         "img": result.base64,
    //         "timestamp": Date.now(),
    //         "width": result.width,
    //         "height": result.height,
    //         "Schema": "Image"
    //       }
    //     ]
    // }

    //   fetch('https://8gqr11z8n1.execute-api.us-east-1.amazonaws.com/v01/img', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(
    //       body
    //     ),
    //   })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson.messages[0].img_id);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
}

export function searchUser(email) {
    return new Promise(resolve => {
        const eml = email.toLowerCase();
        const queryURL = URL + `/users/search?email=${eml}`;
        _asyncGetReq(queryURL)
        .then((response) => response.json())
        .then(res => resolve(res));
    });
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
                reject('promise rej as get req not ok');
            }
        })
        .catch((error) => {
            reject('promise rej as get req error: ' + error);
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