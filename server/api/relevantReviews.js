const pythonShell = require('python-shell').PythonShell



exports.relevantReviews = async (req, res) =>{
	
	function relevantReviews(token){
		return new Promise((resolve,reject)=>{
			pythonShell.run(
				'./api/pyCode/findRelevant.py',
				{args:['-t'+token]},
				(err, data)=>{
					if(err) reject(err);
					resolve(data);
				}
			);
		});
	}


	token = req.query.token;

	pyres = await relevantReviews(token);
	rrs = JSON.parse(pyres[1]);
	console.log(rrs);
	result = {'relevant_reviews':rrs};

	res.json(result);	
}

