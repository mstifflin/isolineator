const {voices} = require('./voices.js');

var credentials = {
  type: "service_account",
  project_id: "isolineator-162918",
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC8X9z/aqE9r97V\nPgMv1m0v4wqeq9V4lYRtgUCqoPjrKGJX0vVIR5h4Cjy4QnEE9BcaQgYPk9Epq2A1\n6fRtAvGseIXo04r307leSUUdaQz4dS6HA30LEK9d1MFWcIivmYUiyL2/KSaLdJdh\nXzikfy2+58FSjF7Pa9oo9UMCZRmh9jZohLHI2PRVgCRlhxouyrb8MkG4WfBX5Px3\n1m5X5enghd3BlWoheBnnAi3BFpdJf3NHtQn5nKgH3HdRZ9xrFzYvm5Z3ocboY1vf\nnbXFW5/1PyEcOj6vE/YNmxSUu5GEVyNgEuhJsiMQYfw5gQ4t/dlIRK5iA3FwfjMa\n6VPnDROZAgMBAAECggEAXQq0a2vNbFyboZPZmx08HPT1X93buI2RNU0sFZsgl3YA\n7QQDpsnGIzRbPV+D10CA0LVfrP4Dx6MgCEEgO1/C4r881Pz3nOT0n/9spdQnVej7\nLDCq6HY7SAs322wF90XKnp2sKuk2YpcZ1jxkC8vNWoe50v4GLklFHgnWKS6qdHYA\nw4JaFLagZk0LiSb4QhWZZ9Ijfg8+4esoAbRxDwP53NjyKBcEf3pZgSWs2PUez+3I\nXaGvHyauH5C/5d+xaigCXJi1YNVIEeWL0+I9B9fRr0buhTjo+EZE6y/N3lkic+Cn\n/LsRFMuvk6vs07vY6jbqvIMirAmXyHjFu03H9N0kAQKBgQDms2mDzaXAKXW1Wh/T\ntee9Oze3sh73Oo8cH/BOcFD28SnjI0edb7SPOqvF8b4aAq4Gve/5aEyIUqtcLtPC\npZXs+yPhUZR3+jXmVpOWvRarmVXje7x1VEzjZGAYvEICrxQxdOSldp5bhuAfh21R\n7V/kphCa0mdIj/l1wsRGw81gwQKBgQDRCDNR3KLAy28oj9oYrF9Zf9ju54H3+3yM\nvjtrmAN41g+zbuQGoOlykmdosNGibDiIjg5KwI9uACRoupmcU8C9eMX0f/OE778a\n9Ig5TctvdHhfFDKzgHXDdAgfl1Dy9pRTOvxL12OnJhW3buV/LppHTGF6XOn/Qv3R\nambLCGoQ2QKBgHd8Hr8UCK/RCVTnG6rUAPVCMWZjy6PyYWKIrDaD93sehrpMcG/7\nBgJUudiojvP7xVRalWqQeWr1nij9W9HpXxBBNmEhlorZPYdR+djNkGtJ3HEYihAe\nnD/9ocPN5UZslUHUMAP+vp/a6EOMKbOQBOVwmRMGvFWZs/Mo7+1SxhFBAoGAUiL+\nx3QDH+7QRwf/kyJodSqfe4DMuTzAvC0j/CtHcfvrP36ba19fW/3bVG/mcARGUqI/\nS3BO69JyfBSWt67RVaJXZrPAZMQwO89Kl/nRroH9qp6tLYuUurClYIR88nuh3PKY\noNSJ++wjLGkPFOKjDNEenI5WBE+2nMtKiQ1NYEECgYATCZKHiWQv5Pfzd3+D/lfn\nCPfy+zo19FRNKyTlv7jTxac3a63tcL6HAcNZoGomnKR++unbH4aCEKYUDTlsYHf/\nomVRWGCp3pOy9JmUq0V889HNkiQ+7125vfcV1hm7UBHmZb0cw1v+dK1cW8WoXyq/\ncYoKfeLM5He2JhxfXByzWg==\n-----END PRIVATE KEY-----\n',
  client_email: "isolineator@isolineator-162918.iam.gserviceaccount.com",
  client_id: "108655960826759356460",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://accounts.google.com/o/oauth2/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/isolineator%40isolineator-162918.iam.gserviceaccount.com"
}

const Translate = require('@google-cloud/translate')({
	projectId: 'isolineator-162918',
	// keyFilename: './APIs/Isolineator-a25b826f81b6.json'
  credentials: credentials
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