# webpage-analysis-tool

An Electron App that reports some statistic about the HTML structure of a web page.


## Install

Clone the repository, and then install the dependencies:

```bash
npm install
```

## Usage

Start the application with:

```bash
npm start
```

## Why Electron?

When it came to what technologies I could use I add plenty of options. I choose Electron for various reasons:

1. This task is to showcase programming skills, but, it's for a React Dev position. For this reason will be ideal to choose a technology that gives me a chance to use React.
This excludes CLI interfaces.
2. I want the final product to be simple to use. A simple web app has the downside that it cannot make calls without CORS, using a CORS proxy is an option, but I have not guarantee that server will be up in the future.
With Electron I have no CORS limitations, because I can download the HTML page using the Node.JS side of the app.
3. It makes possible to separate business logic from presentation logic. The main logic of the script is on the node side, the frontend side is only responsible of collecting and showing the data.
4. It's a technology I never worked with before, and I found this project to be a good learning opportunity to try this technology.
  
## How everything is organized?

### Node.js side

You can find the code for the node.js "server" side under `src/main/`.

In this folder you will find the main entry-point: `src/main/main.ts`, this file is responsible for initialise the App, and start the listening for the various events.

The file `src/main/analyze.ts` has all the logic regarding parsing and analyzing the HTML/XML file.

### App rendering side

You can find the code of the React application under `src/renderer`.

The entry-point is `src/rendered/app.tsx`.

In `src/rendered/pages` you can find the various pages of the app.  
In `src/rendered/components` you can find the various components of the app. 
