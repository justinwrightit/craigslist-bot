var jquery = require('jquery')
var Nightmare = require('nightmare')
var uploader = require('nightmare-upload')(Nightmare);
var prompt = require('prompt')
var fs = require('fs')
var path = require('path')

var nightmare = Nightmare({
  webPreferences: {
    partition: 'nopersist'
  }
})

var url="http://washingtondc.craigslist.org/"

var schema = {
  properties: {
    password: {
      required: true,
      hidden: true

    },
    post_file: {
      required: true,
      hidden: false
    }
  }
};


prompt.start();
prompt.get(schema, function (err, result) {

  // Get content from file
  var contents = fs.readFileSync(path.resolve('posts')+'/'+result.post_file);
  // Define to JSON type
  var post = JSON.parse(contents);

  nightmare.viewport(2560,1440).goto(url)
  //loads craigslist home page

    .wait('#post')
    //waits 1/2 of a second for the page to load
    .click('#post')
    //clicks 'post to classifieds' (#post)
    .click('input[value=fso]')
    //clicks the for sale by owner radio button
    .click('.pickbutton')
    //clicks the continue button
    .wait(500)
    //waits 1/2 second for the page to load
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
    .wait(1000)

    .click('#classic')

    .wait(2000).end();
    //wait 1/2 of a second for the page to load and end nightmare

    for(var x=0;x<post.img.length;x++){
      nightmare.upload('input:nth-of-type(3)' , post.img[x]).wait(1000).end();
    }
    //loops through the imgs


    nightmare.wait(750)//restart nightmare and wait

    .click('button.done.bigbutton')//done w images
    .wait(500)//wait 1/2 of a second

    .click('.button')//publish the ad
    .wait(2000)//wait 1/2 of a second



    .screenshot('test.png')
    //.click('button.pickbutton')



    .end()

    .then(function(result){
      //console.log(test);
    })

    });
