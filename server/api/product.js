const uuid = require('uuid').v1
const pythonShell = require('python-shell').PythonShell

exports.product = async (req, res) =>{
	token = uuid();
	
	platform = req.query.platform;
	link = req.query.link;
	link = decodeURI(link);
	function crawlReview(link, token, platform){
		return new Promise((resolve,reject)=>{
			pythonShell.run(
				'./api/pyCode/crawlReview.py',
				{args:['-l'+link, '-t'+token, '-p'+platform]},
				(err, data)=>{
					if(err) reject(err);
					resolve(data);
				}
			);
		});
	}
	function labelReview(token){
		return new Promise((resolve,reject)=>{
			pythonShell.run(
				'./api/pyCode/labelReview.py',
				{args:['-t'+token]},
				(err, data)=>{
					if(err) reject(err);
					resolve(data);
				}
			);
		});
	}

	
	crawlRes = await crawlReview(link,token,platform);
	console.log(crawlRes);
	if(crawlRes.includes('success') != true){	
		console.log('error')
		res.status(500).json({'error_message':crawlRes[1]})
		return
	}
	labelRes = await labelReview(token);
	console.log(labelRes);
		



	retData = {'token' : token};
	res.send(retData);	
}

