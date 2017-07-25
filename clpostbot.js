//Created by: Marcelo McAndrew

//require all the dependencies
var jquery = require('jquery')
var Nightmare = require('nightmare')
var uploader = require('nightmare-upload')(Nightmare);
var prompt = require('prompt')
var fs = require('fs')
var path = require('path')

//clear the local storage everytime nightmare runs
var nightmare = Nightmare({
  webPreferences: {
    partition: 'nopersist'
  }
  , show:true
})
//url of craigslist
var url="http://washingtondc.craigslist.org/"
var imgs= 0

//require user to input password and post.json file
var schema = {
  properties: {
    password: {
      required: true,
      hidden: true //hide password when user types it

    },
    post_file: {
      required: true,
      hidden: false
    }
  }
};

console.time("Runtime: ")

//start the prompt
prompt.start();
//prompts can be accessed by result.password and result.post_file

prompt.get(schema, function (err, result) {

  //get the post_file from the post folder in the root directory
  var contents = fs.readFileSync(path.resolve('posts')+'/'+result.post_file);
  //parse contents e.g post.img, post.title
  var post = JSON.parse(contents);

  //start nightmare and set the viewport and go to craigslist url
  nightmare.viewport(1000,500).goto(url)

    //on the craigslist home page
    .wait('#post')//wait for the post element to load
    .click('#post')//click "post to classifieds"

    //on the choose sale type page
    .click('input[value='+post.type+']')//click the "for sale by owner" radio button
    .click('.pickbutton')//click continue

    //on the select category page
    .wait(2000)//wait 500ms for page to load
    .click('li:nth-child('+post.category+') > label')//select category from JSON

    //on the location page
    .wait(2000)
    .click('li:nth-child(3) > label')//select Maryland
    .click('.pickbutton')//hit continue

    //on the login page
    .wait(1000)
    .click('a[href^="https"]')//click login
    .wait(2000)
    .insert('#inputEmailHandle', post.email)//enter the email from the JSON
    .insert('#inputPassword', result.password)//enter the password from the prompt
    .wait(2000)
    .click('.accountform-btn')//hit login

    //on the post page
    .wait(2000)
    .type('#PostingTitle', post.postTitle)//enters post title from JSON
    .type('#Ask',post.price)//enters post price from JSON
    .type('#PostingBody',post.postBody)//enters post body from JSON
    .type('#postal_code',post.postalCode)//enters postal code from JSON
    .click('#wantamap')//uncheck "show on map"
    .wait(250)
    .click('.bigbutton')//click publish

    //image uploading page
    .wait(1000)
    .click('#classic')//click the "classic image uploader" button
    .wait(2000)

    //loops through and posts all images in the img array in the JSON
    //.upload('input[type="file"]:nth-child(3)' , post.img[0]).wait(5000)

    .wait(1000)
    .click('.done.bigbutton')//hit done with images
    .wait(1000)
    .click('.button')//click the post button
    .wait(2000)
    .screenshot('test.png')//take screenshot and use it as test.png
    .end()

    .then(function(result){
      console.log("Successful post!");
      console.timeEnd("Runtime: ")
    })

});
