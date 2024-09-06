# Description

This is a simple web app that generates stories based on the user input of age range, story length and setting of the story.

# Dependencies

This project uses the Node18 runtime environment


# Installation and Local Setup

## Clone the repository

Run
```bash
git clone https://github.com/husainrangwala/story-generator.git
```
to clone the repository in your system

## Installing dependencies

Run
```bash
cd story-generator
npm install
```
to install all the related dependencies.

## Creating .env file

Create a .env file and copy all the contents of the .env.sample file in it

## Start the application

Run
```bash
npm run start
```
to run the project locally.
Additional scripts can be found in the next section.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


# Further Improvements

Following are some improvements that I would have liked to add, given the time and the resources.

## Setup Test Cases

Set up test cases to verify that the application is operating as expected and terminate any edge cases.

## Add Openai API key

Openai API key can be added to get better results. Better prompt engineering can be done to get enhanced results and tailor a more specific story.

## Backend Integration

A full fledged backend can be introduced to run all the logic behind story generating and the story can be sent to frontend to display.

## Modularity

Different components can be introduced to improve the modularity of the project which can make debugging easier.