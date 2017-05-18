# Craigslist Bot

Allows user to automatically post on craigslist through entering information in a post template json, then entering password and the json file name.

## How to use full version

1. Make a copy of the `post.json` file in the posts file and name it whatever you want. e.g `nikes.json`
2. Open the `nikes.json` in a text editor and change the arguments to your post
	* You can add images in the `"img"` array by putting the file location in qoutes and using a comma to seperate different images
3. Open the source folder
4. Open your console and run `npm install`. Then run `node clpostbot.js`
5. Enter your CL password and the name of your json file e.g `nikes.json` and hit enter
6. Once the program finishes running check your email and that's it for the bot

### Important Side Notes###
1. This is preconfigured to work for the `www.washingtondc.craigslist.org` url and Maryland as the location
2. To change this, you need to change the "washingtondc" part to your city in the url and you need to look at the value of the CSS selector of the input that corresponds to the location you wish to use (e.g Maryland input has a value of 3)

