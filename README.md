# Project Name

> Link to screen shots: http://imgur.com/a/wVxXY

## Team

  - Christopher Yang
  - Raphael Feliciano
  - Apurva Shastry
  - Michael Diodoro
  - Jeffery Briner
  - Laura Greenbaum
  - Tiffany Lin
  - Eugene Shifrin

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage



> Some usage instructions

##To Run:



## Requirements

- @google-cloud/speech ^0.7.0,
- @google-cloud/translate ^0.7.0,
- angular ^1.6.3,
- angular-animate ^1.6.3,
- angular-loading-bar ^0.9.0,
- angular-touch ^1.6.3,
- async ^2.1.5,
- aws-sdk >= 2.0.9,
- bluebird ^3.5.0,
- body-parser ^1.17.1,
- bootstrap ^3.3.7,
- express ^4.15.0,
- googleapis ^18.0.0,
- gridfs-stream ^1.1.1,
- jquery ^3.1.1,
- mongo ^0.1.0,
- mongoose ^4.8.6,
- multer ^1.3.0,
- node >=6.4.0,
- node-fs ^0.1.7,
- node-record-lpcm16 ^0.2.0,
- react-dom ^15.4.2,
- request ^2.81.0,
- socket.io ^1.7.3

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

For livestreaming in local environment, in the terminal run:

```sh
brew install sox
```

### Setup API Credentials
Go to this links and setup your service account.
```sh
https://cloud.google.com/speech/docs/getting-started
https://cloud.google.com/translate/docs/getting-started
http://docs.aws.amazon.com/polly/latest/dg/setting-up.html
```
After downloading the .json key file for each API, create a folder in the root directory named: "APIs".
Insert each .json key file into that folder and make sure the file path in each file in server is correct. 

### Roadmap

View the project roadmap [here](https://docs.google.com/spreadsheets/d/1KeovNVSHdTILa-RPxVEvSDcAIDQ4_mgNWfjAK5o27Sk/edit?usp=sharing)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
