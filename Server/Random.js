var Translate = require('./TextTranslateApi.js')

app.post('/textTranslate', function(req, res) {
	Translate.Translater(req.body.TranslationText, 'es')
})