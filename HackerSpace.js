Tasks = new Mongo.Collection("tasks");

Tweets = new Mongo.Collection("tweets");

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
}

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("tasks");

    Meteor.subscribe("tweets");

    Template.body.onRendered(function() {


        var routes = [{
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



        var routes1 = [{
            origin: new google.maps.LatLng(42.36069, -71.08751),
            destination: new google.maps.LatLng(42.37334, -71.11891)
        }, {
            origin: new google.maps.LatLng(42.37334, -71.11891),
            destination: new google.maps.LatLng(42.3709, -71.12323)
        }, {
            origin: new google.maps.LatLng(42.3709, -71.12323),
            destination: new google.maps.LatLng(42.37695, -71.12638)
        }, {
            origin: new google.maps.LatLng(42.37695, -71.12638),
            destination: new google.maps.LatLng(42.37486, -71.14242)
        }, {
            origin: new google.maps.LatLng(42.37486, -71.14242),
            destination: new google.maps.LatLng(42.37341, -71.13112)
        }, {
            origin: new google.maps.LatLng(42.37341, -71.13112),
            destination: new google.maps.LatLng(42.37348, -71.11908)
        }];


        var routes2 = [{
                origin: new google.maps.LatLng(42.3607764, -71.0878372),
                destination: new google.maps.LatLng(42.342464, -71.083617)
            }, {
                origin: new google.maps.LatLng(42.342464, -71.083617),
                destination: new google.maps.LatLng(42.30065, -71.11387)
            },

            {
                origin: new google.maps.LatLng(42.30065, -71.11387),
                destination: new google.maps.LatLng(42.32934, -71.09578)
            }, {
                origin: new google.maps.LatLng(42.31463, -71.10538),
                destination: new google.maps.LatLng(42.32282, -71.10102)
            }, {
                origin: new google.maps.LatLng(42.30628, -71.10944),
                destination: new google.maps.LatLng(42.31463, -71.10538)
            }, {
                origin: new google.maps.LatLng(42.30065, -71.11387),
                destination: new google.maps.LatLng(42.30628, -71.10944)
            }
        ];

        var routes3 = [{
            origin: new google.maps.LatLng(42.3607764, -71.0878372),
            destination: new google.maps.LatLng(44.92131, -93.21405)
        }, {
            origin: new google.maps.LatLng(44.92131, -93.21405),
            destination: new google.maps.LatLng(46.87894, -110.36282)
        }, {
            origin: new google.maps.LatLng(46.87894, -110.36282),
            destination: new google.maps.LatLng(42.19465, -122.70926)
        }, {
            origin: new google.maps.LatLng(42.19465, -122.70926),
            destination: new google.maps.LatLng(34.86973, -111.76097)
        }, {
            origin: new google.maps.LatLng(34.86973, -111.76097),
            destination: new google.maps.LatLng(37.23881, -76.50964)
        }, {
            origin: new google.maps.LatLng(37.23881, -76.50964),
            destination: new google.maps.LatLng(42.3607764, -71.0878372)
        }];

        var routesArray = [routes, routes1, routes2];
        var rendererOptions = {
            preserveViewport: true
                // suppressMarkers:true,
                // routeIndex:i
        };

        $(function() {

        });

        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        // var map;
        var startPoint = new google.maps.LatLng(42.36069, -71.08751);
        var endPoint = new google.maps.LatLng(42.36069, -71.08751);









        $(document).ready(function() {
            function initialize() {
                var latlng = new google.maps.LatLng(42.5052221, 1.5219545);
                var mapOptions = {
                    zoom: 15,
                    styles: styles,
                    center: latlng
                }
                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                infowindow = new google.maps.InfoWindow();
                addMarkers();
                fetchWordData();

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


                var infowindowMark2 = new google.maps.InfoWindow({
                    content: "Scenic route 5km 30min"
                });


                var marker2 = new google.maps.Marker({
                    position: new google.maps.LatLng(42.380994, -71.118972),
                    map: map,
                    title: 'Hello World!'
                });
                google.maps.event.addListener(marker2, 'click', function() {
                    infowindowMark2.open(map, marker2);
                });
                // infowindowMark2.open(map,marker2);





                var infowindowMark3 = new google.maps.InfoWindow({
                    content: "Midium Challenge 15km 90min"
                });
                var marker3 = new google.maps.Marker({
                    position: new google.maps.LatLng(42.374210, -71.070220),
                    map: map,
                    title: 'Hello World!'
                });
                google.maps.event.addListener(marker3, 'click', function() {
                    infowindowMark3.open(map, marker3);
                });
                // infowindowMark3.open(map,marker3);




                var infowindowMark4 = new google.maps.InfoWindow({
                    content: "Challenging route 28km 190min"
                });
                var marker4 = new google.maps.Marker({
                    position: new google.maps.LatLng(42.3002287, -71.1114684),
                    map: map,
                    title: 'Hello World!'
                });
                google.maps.event.addListener(marker4, 'click', function() {
                    infowindowMark4.open(map, marker4);
                });
                var routesArray = [routes, routes1, routes2];

            }






            function addMarkers() {
                for (marker in markers) {
                    addMarker(marker, markers[marker], mcircle1f)
                }

                for (marker2 in markers2) {
                    addMarker(marker2, markers2[marker2], mcircle2f)
                }

                for (marker3 in markers3) {
                    addMarker(marker3, markers3[marker3], mcircle3f)
                }

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

            function addMarker(place, myLatLng, markcircle) {
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    title: place,
                    map: map
                });
                // marker.setIcon(mcircle1f);
                marker.setIcon(markcircle);


                // This can be changed from 'click' to 'hover' if desired
                google.maps.event.addListener(marker, 'click', function() {
                    // TODO: Add more information about each location in the popup window

                    infowindow.setContent("<h3>" + place + "</h3>");
                    infowindow.open(map, this);



                });
            }

            google.maps.event.addDomListener(window, 'load', initialize);
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

        }
    });

    Template.body.events({
        "submit .new-task": function(event) {
            // Prevent default browser form submit
            console.log(event);
            event.preventDefault();
            // Insert a task into the collection
            // Get value from form element


            var text = event.target.text.value;
            Meteor.call("addTask", text);

            // Insert a task into the collection
            // Tasks.insert({
            //   text: text,
            //   createdAt: new Date(),            // current time
            //   owner: Meteor.userId(),           // _id of logged in user
            //   username: Meteor.user().username  // username of logged in user
            // });
            // Clear form
            event.target.text.value = "";
        },
        "change .hide-completed input": function(event) {
            Session.set("hideCompleted", event.target.checked);
        }
    });



    Template.body.helpers({
        initMap: function() {



        }
    })

    Template.task.helpers({
        isOwner: function() {
            // return this.owner === Meteor.userId();
            return true;
        }
    });

    Template.tweet.helpers({
        tweetJson: function() {
            var tweet1 = Tweets.find().fetch();
            // console.log(JSON.stringify(tweet1));


            return tweet1;
        }
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