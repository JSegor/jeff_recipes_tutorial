# Recipe Manager Tutorial (Programmer's Journal)

You can access the playlist videos for this tutorial here. 

[Webalacrity Opus 01 - Recipe Manager](https://www.youtube.com/playlist?list=PLIhjKYKf766BWCM-0o5G6B-Jt5kJgisPk)

GitHub Location of Source Code: [jeff_recipes_tutorial](https://github.com/JSegor/jeff_recipes_tutorial)

Use git clone to copy this project from a DOS command line into your own directory:

`git clone https://github.com/JSegor/jeff_recipes_tutorial`

To run this web application, navigate into the recipes folder and run

`npm install`

Make the appropriate changes in computer's system variables (see video slides and video tutorials)

Follow the installation steps of Elasticsearch and Kibana from the video tutorials

Modify the launch.json file to fit your computer's environment

Make sure the http_ca.crt file is copied from your elasticsearch/config/certs directory into the recipes/server directory. Otherwise, you will get an HTTP 500 error when launching your app.  The http_ca.crt file in this repo is not valid for your instance of Elasticsearch. 

`ng build`

Launch the Elasticsearch node in a Command Window and wait for it to come up

`node server.js`

Then access the app from a browser using this URL, the IP address is found with ipconfig (see videos). 

`http://<your computer's IP address>:98`

Note that this is an ongoing project which may continually be updated. 

## Author

Jeff Segor
YouTube Channel: [Jeff Segor](https://www.youtube.com/user/jsegor)

## Packages (modules) used for this project:

- Angular
- NodeJS
- Elasticsearch
- Kibana
- Bootstrap
- Express
- Angular Material
- Elastic Client

## Other Tools Used

- Visual Studio Code
- Git

## Functionality

This is a small recipe manager to keep track of your favorite recipes and includes an in-stock inventory, shopping list, accessories.  It imports 9 recipes into a database and new recipes can be created. 