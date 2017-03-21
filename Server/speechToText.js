// var google = require('googleapis');

// // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
// // environment variables.
// google.auth.getApplicationDefault(function (err, authClient, projectId) {
//   if (err) {
//     throw err;
//   }

//   // The createScopedRequired method returns true when running on GAE or a local developer
//   // machine. In that case, the desired scopes must be passed in manually. When the code is
//   // running in GCE or a Managed VM, the scopes are pulled from the GCE metadata server.
//   // See https://cloud.google.com/compute/docs/authentication for more information.
//   if (authClient.createScopedRequired && authClient.createScopedRequired()) {
//     // Scopes can be specified either as an array or as a single, space-delimited string.
//     authClient = authClient.createScoped([
//       'https://www.googleapis.com/auth/compute'
//     ]);
//   }

//   // Fetch the list of GCE zones within a project.
//   // NOTE: You must fill in your valid project ID before running this sample!
//   var compute = google.compute({
//     version: 'v1',
//     auth: authClient
//   });
  
//   var projectId = 'YOUR_PROJECT_ID';

//   compute.zones.list({
//     project: projectId,
//     auth: authClient
//   }, function (err, result) {
//     console.log(err, result);
//   });
// });

const Speech = require('@google-cloud/speech');

// Your Google Cloud Platform project ID
const projectId = 'Isolineator';

// Instantiates a client
exports.speechClient = Speech({
  projectId: projectId
});

// The name of the audio file to transcribe
const fileName = './Test.m4a';

// The audio file's encoding and sample rate
const options = {
  encoding: 'm4a',
  sampleRate: 16000
};

// Detects speech in the audio file
// speechClient.recognize(fileName, options)
//   .then((results) => {
//     const transcription = results[0];
//     console.log(`Transcription: ${transcription}`);
//   });