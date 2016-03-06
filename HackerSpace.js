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
        return Tweets.find({}, { fields: { "data.link": 1 } });
      });
  }

  if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("tasks");

    Meteor.subscribe("tweets");


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

    Template.task.helpers({
      isOwner: function() {
            // return this.owner === Meteor.userId();
            return true;
          }
        });

    Template.tweet.helpers({
      tweetJson: function() {
        var tweet1=Tweets.find().fetch();
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