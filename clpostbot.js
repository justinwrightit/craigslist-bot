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
    .wait(1000)//wait 500ms for page to load
    .click('label:nth-of-type('+post.category+')')//select category from JSON

    //on the location page
    .wait(1000)//wait 500ms for page to load
    .click('label:nth-of-type(3)')//select Maryland
    .click('.pickbutton')//hit continue

    //on the login page
    .wait(500)//wait 500ms for page to load
    .click('a[href^="https"]')//click login
    .wait('#inputEmailHandle')//wait 500ms for page to load
    .insert('#inputEmailHandle', post.email)//enter the email from the JSON
    .insert('#inputPassword', result.password)//enter the password from the prompt
    .wait(1000)//wait 500ms for page to load
    .click('.accountform-btn')//hit login

    //on the post page
    .wait(1000)//wait 1 second for page to load
    .insert('#PostingTitle', post.postTitle)//enters post title from JSON
    .insert('#Ask',post.price)//enters post price from JSON
    .insert('#PostingBody',post.postBody)//enters post body from JSON
    .insert('#postal_code',post.postalCode)//enters postal code from JSON
    .click('#wantamap')//uncheck "show on map"
    .wait(250)//wait 250ms for page to load
    .click('.bigbutton')//click publish

    //image uploading page
    .wait(1000)//wait 1 second for page to load
    .click('#classic')//click the "classic image uploader" button
    .wait(2000)
    .end();//wait 2 seconds and end nightmare

    //loops through and posts all images in the img array in the JSON
    for(var x=0;x<post.img.length;x++){
      nightmare.upload('input:nth-of-type(3)' , post.img[x]).wait(2000).end();
    }

    nightmare.wait(1000)//start nightmare again and wait 750ms for page to load
    .click('.done.bigbutton')//hit done with images
    .wait(1000)//wait 1 seconds for page to load
    .click('.button')//click the post button
    .wait(2000)//wait 2 seconds for page to load
    .screenshot('test.png')//take screenshot and use it as test.png
    .end()

    .then(function(result){
      console.log("Successful post!");
      console.timeEnd("Runtime: ")
    })

});
