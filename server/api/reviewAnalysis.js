
exports.reviewAnalysis = (req, res) =>{
	
	result = {
		'score_count':{
			'5':1350,
			'4':341,
			'3':10,
			'2':2,
			'1':321
		},
		'keyword_cloud':'/file/abcdefg_wordcloud.png',
		'positive_keyword_cloud':'/file/abcdefg_wordcloud_negative.png',
		'negative_keyword_cloud':'/file/abcdefg_wordcloud_positive.png'
	};

	res.json(result);	
}

