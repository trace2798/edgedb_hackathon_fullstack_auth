# Productivus: Efficiently manage your task 

### This repo is for my submission for the EdgeDB hackathon which took place during April 26 — May 26, 2024

## Getting Started

### Prerequisites

**Node.js 18.17 or later.
**macOS, Windows (including WSL), and Linux are supported.
**EdgeDB CLI (It is preferred that you have it already setup, but below I am writing the instruction on how to install below. Refer to the link mentioned if you are having difficulties.)

### Install EdgeDB CLI

## Linux and Mac
```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.edgedb.com | sh
```

## Windows Powershell
```sh
iwr https://ps1.edgedb.com -useb | iex
```

For more installation options, see the [EdgeDB installation guide](https://docs.edgedb.com/cli).


### To directly clone the repo

```shell
git clone https://github.com/trace2798/edgedb_hackathon_fullstack_auth.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

### Initiating EdgeDB

```sh
edgedb project init
```
After running that command it will ask you to specify the name of the instance with a default value. You can just press Enter and use the default value.

Then it should ask you to specify the branch name with default as main. Keep it that way.

![image](https://github.com/trace2798/edgedb_hackathon_fullstack_auth/assets/113078518/ea306c95-02d0-4e0a-a5c4-f75389169707)


Then run 
```sh
edgedb ui 
```
I should open up the EdgeDB GUI. Then click on main --> Data viewer. Then you should see the tables which has been defined on the schema

![image](https://github.com/trace2798/edgedb_hackathon_fullstack_auth/assets/113078518/452994f2-437e-4745-9c9a-cda9fa5161b5)


### Setting up Authetication
For this application I have used EdgeDB auth with the Github provider. For that you can follow the guide mentioned on their official website. [EdgeDB Auth Guide](https://docs.edgedb.com/guides/auth)

I have used the GUI to set the auth for my application. I have taken the following steps:
1. Click on auth admin icon on the left sidebar. It is the 6th option. A screen like below should appear
![image](https://github.com/trace2798/edgedb_hackathon_fullstack_auth/assets/113078518/8d6c72be-119b-4b0d-bcce-debf9ea77521)

2. Fill it up with your desired name and I did keep the allowed_redirect_urls field empty.
3. Cick on Providers --> Add Provider. For this application I have used Github. Fill in with your Client ID and Secret. I kept my additional scope blank.
4. To get the Github ID and Secret do the following 
Go to your github account --> settings --> Developer settings --> Oauth Apps. Then create a new app by clicking on "New OAuth App"
5. On github both the Homepage URL and Authorized Callback URL has been set to http://localhost:3000/

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
| `build`         | To build your application                |
| `start`         | Starts a production  instance of the app |

"prebuild": "npx @edgedb/generate edgeql-js" is required if you want to deploy your site to vercel.

