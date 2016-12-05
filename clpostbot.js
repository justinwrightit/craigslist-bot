var jquery = require('jquery')
// jquery allows easy selection of css/html elements in the dom
var Nightmare = require('nightmare')
var uploader = require('nightmare-upload')(Nightmare);
//require nightmare js
var prompt = require('prompt')
//require prompt
var fs = require('fs')


var nightmare = Nightmare({
  webPreferences: {
    partition: 'nopersist'
  }
})
//clears the local storage

var url="http://washingtondc.craigslist.org/"

// Get content from file
var contents = fs.readFileSync("post.json");
// Define to JSON type
var post = JSON.parse(contents);


var schema = {
  properties: {

    password: {
      required: true,
      hidden: true

    }
  }
};
//requires email and password and hides password

prompt.start();
//
// Get two properties from the user: email, password
//
prompt.get(schema, function (err, result) {



  nightmare.viewport(2560,1440).goto(url)
  //loads craigslist home page

    .wait(500)
    //waits 1/2 of a second for the page to load
    .click('#post')
    //clicks 'post to classifieds' (#post)
    .click('input[value=fso]')
    //clicks the for sale by owner radio button
    .click('.pickbutton')
    //clicks the continue button
    .wait(500)
    //waits 1 second for the page to load
    .click('label:nth-of-type('+post.category+')')
    //type 18: clothing
    //type 22: electronics
    //clicks the electronics by owner radio button

    .wait(500)
    //waits 1/2 of a second for the page to load
    .click('label:nth-of-type(3)')
    //clicks on location radio button
    .click('.pickbutton')
    //clicks continue

    //now you're at the posting page

    .wait(500)
    //wait 1/2 of a second for the page to load
    .click('a[href^="https"]')
    //lets the user login

    .wait(500)
    //wait 1/2 of a second for the page to load
    .type('#inputEmailHandle', post.email)
    .type('#inputPassword', result.password)
    //fills in email and password from the prompt
    .wait(500)
    //wait 1/2 of a second for the page to load
    .click('.accountform-btn')

    .wait(1000)
    //wait 1/2 of a second for the page to load
    .insert('#PostingTitle', post.postTitle)
    .insert('#Ask',post.price)
    .insert('#PostingBody',post.postBody)
    .insert('#postal_code',post.postalCode)
    .click('#wantamap')
    //fills in the post contents*/
    .wait(250)
    //wait 1/4 of a second for the page to load

    .click('.bigbutton')
    //proceed to image uploader

    .wait(2000)
    //wait 1/2 of a second for the page to load
    .upload('#plupload','golf.jpg')
    //upload image (has to be in imgs folder)

    .wait(1000)
    .screenshot('test.png')
    //.click('button.pickbutton')



    .end()

    .then(function(result){
      //console.log(test);
    })

    });
