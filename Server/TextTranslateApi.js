const {voices} = require('./voices.js');

var credentials = JSON.stringify(process.env.SPEECH_TO_TEXT_API);

const Translate = require('@google-cloud/translate')({
	projectId: 'isolineator-162918',
	// keyFilename: './APIs/Isolineator-a25b826f81b6.json'
  credentials: credentials;
})


exports.Translater = function(text, target, callback) {
	Translate.translate(text, target).then((results) => {
    callback(results[0]);
  }).catch((error) => {
  		console.log(error);
  })
};

exports.listLanguages = (callback) => {
  Translate.getLanguages()
    .then((results) => {
      let finalLanguages = [];
      let voicesLanguages = voices.map((voice) => {
        return voice.LanguageName;
      });

      const languages = results[0];
      languages.forEach((language) => {
        if (voicesLanguages.includes(language.name)) {
          finalLanguages.push(language);
        }
      });
      finalLanguages.forEach((language) => console.log(language));

      callback(finalLanguages);
    });
};

























//*******************This was original code used to call API*********************



// var exampleData = ['All work and no play makes Jack a dull boy'];

// var format = exampleData[0].split(' ').reduce(function(acc, value) {
// 	return acc + value + '%20';
// }, 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCciuiJZRV2VU7NSbm_Tjv4mboAEID-D3w&source=en&target=es&q=')

// var url = format.slice(0, -3);

// var options = {
// 	'Content-Type': 'plain/text',
// 	'url': url
// }

// var Translate = request(options, function (error, response, body) {
// 	if (error) {
// 		console.log(error);
// 	}

//   if (!error && response.statusCode === 200) {
//     console.log(body)
//   } 
// });

// module.exports.Translate = Translate;