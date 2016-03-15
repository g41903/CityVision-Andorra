Tasks = new Mongo.Collection("tasks");

Tweets = new Mongo.Collection("tweets");

Tweets3 = new Mongo.Collection("tweets3");


if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("tasks", function() {
        return Tasks.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId }
            ]

        });
    });


    Meteor.publish("tweets", function() {
        // return Tweets.find({"data.link":"https://www.instagram.com/p/BCFlf2FsaHm/"}).fetch();
        // return Tweets.find({}, { fields: { "data.link": 1 } });
        return Tweets.find({}, { "data.caption.from.full_name": 1, "data.caption.from.profile_picture": 1, "data.caption.text": 1, "data.images.low_resolution.url": 1, "data.images.low_resolution.height": 1, "data.images.low_resolution.width": 1, "data.link": 1, "data.location.name": 1, "data.location.latitude": 1, "data.location.longitude": 1, "data.tags": 1 });
    });

    Meteor.publish("tweets3", function() {
        // return Tweets.find({"data.link":"https://www.instagram.com/p/BCFlf2FsaHm/"}).fetch();
        // return Tweets.find({}, { fields: { "data.link": 1 } });
        return Tweets3.find({}, { "data.caption.from.full_name": 1, "data.caption.from.profile_picture": 1, "data.caption.text": 1, "data.images.low_resolution.url": 1, "data.images.low_resolution.height": 1, "data.images.low_resolution.width": 1, "data.link": 1, "data.location.name": 1, "data.location.latitude": 1, "data.location.longitude": 1, "data.tags": 1 });
    });
}

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("tasks");

    Meteor.subscribe("tweets");

    Meteor.subscribe("tweets3");

    Template.body.onRendered(function() {


        route = [{
            origin: new google.maps.LatLng(42.3607764, -71.0878372),
            destination: new google.maps.LatLng(42.35511, -71.06558)
        }, {
            origin: new google.maps.LatLng(42.35511, -71.06558),
            destination: new google.maps.LatLng(42.3587, -71.05749)
        }, {
            origin: new google.maps.LatLng(42.3587, -71.05749),
            destination: new google.maps.LatLng(42.3601, -71.05476)
        }, {
            origin: new google.maps.LatLng(42.3601, -71.05476),
            destination: new google.maps.LatLng(42.37397, -71.05542)
        }, {
            origin: new google.maps.LatLng(42.37397, -71.05542),
            destination: new google.maps.LatLng(
                42.3607764, -71.0878372)
        }];

        routes = [route];


        mcircle1f = {
            path: 'M0,0m-2,0a2,2 0 1,0 4,0a2,2 0 1,0 -4,0',
            fillColor: 'red',
            fillOpacity: 1,
            scale: 2,
            strokeWeight: 0
        };

        mcircle2f = {
            path: 'M0,0m-2,0a2,2 0 1,0 4,0a2,2 0 1,0 -4,0',
            fillColor: 'red',
            fillOpacity: 1,
            scale: 2,
            strokeWeight: 0
        };

        rendererOptions = {
            preserveViewport: true
                // suppressMarkers:true,
                // routeIndex:i
        };

        $(function() {

        });

        // var directionsDisplay;
        // var directionsService = new google.maps.DirectionsService();
        // var map;
        var startPoint = new google.maps.LatLng(42.36069, -71.08751);
        var endPoint = new google.maps.LatLng(42.36069, -71.08751);



        $(document).ready(function() {
            function initMap() {
                var latlng = new google.maps.LatLng(42.5052221, 1.5219545);
                var mapOptions = {
                    zoom: 15,
                    styles: styles,
                    center: latlng
                }
                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                // addMarkers();
                fetchWordData();



                infowindow = new google.maps.InfoWindow({
                    maxWidth: 150
                });


                var infowindowMark1 = new google.maps.InfoWindow({
                    content: "Here's Andorra lavella"
                });


                var marker1 = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: 'Hello World!'
                });
                google.maps.event.addListener(marker1, 'click', function() {
                    infowindowMark1.open(map, marker1);
                });
                infowindowMark1.open(map, marker1);





                // var service = new google.maps.places.PlacesService(map);
                // service.nearbySearch({
                //     location: latlng,
                //     radius: 500,
                //     type: ['store']
                // }, callback);


                // function callback(results, status) {
                //     alert('callback' + results)
                //     if (status === google.maps.places.PlacesServiceStatus.OK) {
                //         for (var i = 0; i < results.length; i++) {
                //             createMarker(results[i]);
                //             alert('Here:' + results);
                //         }
                //     }
                // }

                // function createMarker(place) {
                //     var placeLoc = place.geometry.location;
                //     var marker = new google.maps.Marker({
                //         map: map,
                //         position: place.geometry.location,
                //         icon: mcircle2f
                //     });

                //     google.maps.event.addListener(marker, 'click', function() {
                //         infowindow.setContent(place.name);
                //         infowindow.open(map, this);
                //     });
                // }



            }


            function fetchWordData() {
                // TODO: read in the list of words and their counts associated with the word

                // $("#autocomplete").autocomplete({
                //     source: words,
                //     minLength: 2,
                //     select: function(event, ui) {
                //         searchTerm(ui.item.label)
                //     }
                // });
                // $("#autocomplete").keyup(function(e) {
                //     if (e.keyCode == 13) {
                //         val = $("#autocomplete").val()
                //         searchTerm(val) 
                //     }
                // });
            }

            function searchTerm(term) {
                alert("I AM SEARCHING FOR: " + term)
                    // TODO: Search the term in the list and change the map display
            }

            google.maps.event.addDomListener(window, 'load', initMap);
        });

    });



    Template.body.helpers({
        tasks: function() {
            if (Session.get("hideCompleted")) {
                // If hide completed is checked, filter tasks
                return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
            } else {
                // Otherwise, return all of the tasks
                return Tasks.find({}, { sort: { createdAt: -1 } });
            }
        },
        hideCompleted: function() {
            return Session.get("hideCompleted");
        },
        incompleteCount: function() {
            return Tasks.find({ checked: { $ne: true } }).count();
        },
        getTweets: function() {

            var tweet_details = [];
            Meteor.autorun(function() {
                var subs = Meteor.subscribe('tweets');
                if (subs.ready()) {
                    tweet1 = Tweets.find().fetch();
                    for (var document_key in tweet1) {
                        document_val = tweet1[document_key];
                        for (var record_key in document_val) {
                            record_val = document_val[record_key];
                            img_date = record_val['img_date'][0];
                            img_url = record_val['img_url'];
                            img_tags = record_val['img_tags'];
                            detail_tags = record_val['detail_tags'];
                            img_latitude = record_val['img_latitude'][0];
                            img_longitude = record_val['img_longitude'][0];
                            img_result = record_val['img_result'];
                            text_result = record_val['text_result'];
                            created_time = record_val['created_time'];
                            updated_time = record_val['updated_time'];
                            tweet_details.push([img_tags, img_latitude, img_longitude, img_date]);
                            // social_marker_locations.push([tags.toString(),latitude,longitude,myContent]);


                        }
                    }
                    console.log(JSON.stringify(tweet_details));
                    Meteor.call("addMarkers", tweet_details);

                }
            })

        },






    });


    Template.task.helpers({
        isOwner: function() {
            // return this.owner === Meteor.userId();
            return true;
        }
    });






    Template.tweet.helpers({


        tweetJson: function() {


            var social_marker_locations = [];

            // var subs= Meteor.subscribe('tweets');

            Meteor.autorun(function() {

                var subs = Meteor.subscribe('tweets');

                if (subs.ready()) {
                    tweet1 = Tweets.find().fetch();
                    // console.log(tweet1[0]['data'][0]['location']['latitude']);
                    for (var obj_key in tweet1) {
                        // console.log(tweet1[obj_key]);
                        //obj_val is object intex number, don't add quotation 'instagram_record_key', it will become string.
                        var obj_val = tweet1[obj_key]
                        for (var instagram_record_key in obj_val['data']) {
                            // console.info(obj_val['data']);
                            //instagram_record_key is object intex number, don't add quotation 'instagram_record_key', it will become string.

                            var instagram_record_val = obj_val['data'][instagram_record_key];
                            // console.info(instagram_record_val['location']['latitude']);
                            // console.info(instagram_record_val['location']['longitude']);
                            var latitude = instagram_record_val['location']['latitude'];
                            var longitude = instagram_record_val['location']['longitude'];
                            var tags = instagram_record_val['tags'];
                            // "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12328427_249602455371344_1712327594_n.jpg?ig_cache_key=MTE5MDUyMjQ4ODgxMTk4MzUxNw%3D%3D.2.l"
                            var myContent = instagram_record_val['images']['low_resolution']['url'];
                            // var myContent='Andorra';
                            social_marker_locations.push([tags.toString(), latitude, longitude, myContent]);
                            // social_marker_locations.push(['Ernie',latitude,longitude,myContent]);

                        }
                    }
                    Meteor.call("addMarkers", social_marker_locations);
                }



            });
        },

        getTweets3: function() {

            var tweet_details = [];
            Meteor.autorun(function() {
                var subs = Meteor.subscribe('tweets3');
                if (subs.ready()) {
                    tweet3 = Tweets3.find().fetch();
                    for (var document_key in tweet3) {
                        record_val = tweet3[document_key];
                        // for(var record_key in document_val){
                        // record_val=document_val[record_key];
                        img_date = record_val['img_date'];
                        img_url = record_val['img_url'][0];
                        img_tags = record_val['img_tags'];
                        detail_tags = record_val['detail_tags'];
                        img_latitude = record_val['img_latitude'][0];
                        img_longitude = record_val['img_longitude'][0];
                        img_result = record_val['img_result'];
                        text_result = record_val['text_result'];
                        created_time = record_val['created_time'];
                        updated_time = record_val['updated_time'];
                        tweet_details.push([img_date+" "+img_tags, img_latitude, img_longitude, img_date]);
                        // social_marker_locations.push([tags.toString(),latitude,longitude,myContent]);


                        // }
                    }
                    console.log(JSON.stringify(tweet_details));
                    Meteor.call("addMarkers", tweet_details);

                }
            })

        }





    });

    Template.tweet.onCreated(function() {




        }


    );






    Template.body.events({
        // 'click .mark-tweets': function() {
        //     var map;
        //     var infowindow;
        //     var mcircle2f = {
        //         path: 'M0,0m-2,0a2,2 0 1,0 4,0a2,2 0 1,0 -4,0',
        //         fillColor: 'blue',
        //         fillOpacity: 1,
        //         scale: 2,
        //         strokeWeight: 0
        //     };


        //     function initMap() {
        //         var pyrmont = {
        //             lat: 42.5052221,
        //             lng: 1.5219545
        //         };

        //         map = new google.maps.Map(document.getElementById('map'), {
        //             center: pyrmont,
        //             zoom: 15
        //         });

        //         infowindow = new google.maps.InfoWindow();
        //         var service = new google.maps.places.PlacesService(map);
        //         service.nearbySearch({
        //             location: pyrmont,
        //             radius: 1000,
        //             type: ['store']
        //         }, callback);
        //     }

        //     function callback(results, status) {
        //         if (status === google.maps.places.PlacesServiceStatus.OK) {
        //             for (var i = 0; i < results.length; i++) {
        //                 createMarker(results[i]);
        //             }
        //         }
        //     }

        //     function createMarker(place) {
        //         var placeLoc = place.geometry.location;
        //         var marker = new google.maps.Marker({
        //             map: map,
        //             position: place.geometry.location,
        //             icon: mcircle2f
        //         });

        //         google.maps.event.addListener(marker, 'click', function() {
        //             infowindow.setContent(place.name);
        //             infowindow.open(map, this);
        //         });
        //     }

        // }
    });


    Template.task.events({
        "click .toggle-checked": function() {
            // Set the checked property to the opposite of its current value
            Meteor.call("setChecked", this._id, !this.checked);
        },
        "click .delete": function() {
            Meteor.call("deleteTask", this._id);
        },
        "click .toggle-private": function() {
            Meteor.call("setPrivate", this._id, !this.private);
        }
    });


    Template.tweet.events({
        'click .tweet-checked': function() {
            Meteor.call("findTweets", this._id);
        },

        'click .test-router': function() {
            Meteor.call("renderDirection", routes);
        }
    });




    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });


}


Meteor.methods({
    addTask: function(text) {
        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Tasks.insert({
            text: text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    deleteTask: function(taskId) {
        var task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }
        Tasks.remove(taskId);
    },
    setChecked: function(taskId, setChecked) {
        var task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error("not-authorized");
        }
        Tasks.update(taskId, { $set: { checked: setChecked } });

    },
    setPrivate: function(taskId, setToPrivate) {
        var task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Tasks.update(taskId, { $set: { private: setToPrivate } });
    },

    findTweets: function() {
        // var tweet=Tweets.find({});
        // var tweet= Tweets.find({},{"data.caption.from.full_name":1,"data.caption.from.profile_picture":1,"data.caption.text":1,"data.images.low_resolution.url":1,"data.images.low_resolution.height":1,"data.images.low_resolution.width":1,"data.link":1,"data.location.name":1,"data.location.latitude":1,"data.location.longitude":1,"data.tags":1});
        var tweet = Tweets.find({});
        console.log(tweet);
    },


    renderDirection: function(routes) {

        var directionsService = new google.maps.DirectionsService();
        var i = 0;
        routes.forEach(function(route) {
            // console.log('Here J is: '+j);
            console.log(JSON.stringify(route));
            var request = {
                origin: route.origin,
                destination: route.destination,
                travelMode: google.maps.TravelMode.WALKING
            };
            var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

            directionsDisplay.setMap(map);

            directionsService.route(request, function(result, status) {
                console.log(result);

                if (status == google.maps.DirectionsStatus.OK) {
                    setTimeout(function() {

                        directionsDisplay.setDirections(result);

                    }, '1000');

                }
            });
        });
    },
    addMarkers: function(markers) {
        for (var marker in markers) {
            var marker_val = markers[marker];
            Meteor.call('addMarker', marker_val[0], marker_val[1], marker_val[2], marker_val[3]);
        }
    },

    // var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    addMarker: function(place, latitude, longitude, myContent) {

        // var instagram_img = {
        //     path: myContent,
        //     height:150,
        //     width:150
        // };
        //   var instagram_img = {
        //     url: myContent,
        //     size: new google.maps.Size(71, 71),
        //     origin: new google.maps.Point(0, 0),
        //     anchor: new google.maps.Point(17, 34),
        //     scaledSize: new google.maps.Size(25, 25)
        // };

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            title: place,
            map: map,
            icon: mcircle1f
                // icon:instagram_img
        });
        // This can be changed from 'click' to 'hover' if desired
        google.maps.event.addListener(marker, 'click', function() {
            // TODO: Add more information about each location in the popup window
            // infowindow.setContent("<h3>" + place + "</h3>");

            infowindow.setContent('<p><img src=' + myContent + 'height="150" width="150"></p>' + "<h3>" + place + "</h3>");
            infowindow.open(map, this);
        });
    }

});




// FlowRouter.route('/lists/:_id', {
//   name: 'Lists.show',
//   action(params, queryParams) {
//     console.log("Looking at a list?");
//     console.log("params: "+JSON.stringify(params));
//     console.log("queryParams: "+JSON.stringify(queryParams));
//   }
// });

// FlowRouter.route('/gps',{
//   name:"gps.show",
//   action(params,queryParams){
//     console.log("GPS queryParams:"+ JSON.stringify(queryParams));
//     console.log("GPS param: "+ JSON.stringify(params));
//     Meteor.call("addTask", JSON.stringify(queryParams));

//   }
// });




// Map
