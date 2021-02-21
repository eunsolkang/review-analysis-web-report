const pythonShell = require('python-shell').PythonShell



exports.reviewAnalysis = async (req, res) =>{
	
	function reviewScoreCount(token){
		return new Promise((resolve,reject)=>{
			pythonShell.run(
				'./api/pyCode/reviewScoreCount.py',
				{args:['-t'+token]},
				(err, data)=>{
					if(err) reject(err);
					resolve(data);
				}
			);
		});
	}

	function reviewCloud(token){
		return new Promise((resolve,reject)=>{
			pythonShell.run(
				'./api/pyCode/wordCloudMaker.py',
				{args:['-t'+token]},
				(err, data)=>{
					if(err) reject(err);
					resolve(data);
				}
			);
		});
	}

	token = req.query.token;

	sc = await reviewCloud(token);
	sc = await reviewScoreCount(token);
	scores = JSON.parse(sc[0]);
	console.log(scores);
	result = {
		'score_count':scores,
		'keyword_cloud':'/file/'+token+'-allWC.png',
		'positive_keyword_cloud':'/file/'+token+'-conWC.png',
		'negative_keyword_cloud':'/file/'+token+'-proWC.png'
	};

	res.json(result);	
}

