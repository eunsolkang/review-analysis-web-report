const googleTrends = require('google-trends-api');
const fs = require('fs');

exports.trendAnalysis = async (req, res) =>{
	keyword = req.query.product_type;
	category = req.query.category;
	catNum = 0;
	if(category == 'fasion'){
		catNum = 185;
	}
	startTime = new Date();
	startTime.setFullYear(startTime.getFullYear() - 1);
	searchOption = {keyword:keyword,category:catNum, startTime:startTime}
	function interestOverTime(searchOption){
		return new Promise((resolve,reject)=>{
			googleTrends.interestOverTime(searchOption)
				.then(function(results){
					resData = {}
					const lidata = []
					var obj = JSON.parse(results)['default']['timelineData'];
					for (var i =0; i < obj.length; i+=1){
						lidata.push({'period':obj[i]['formattedTime'], 'score':obj[i]['value'][0]})
					}
					resolve(lidata)
				})
				.catch(function(err){
					reject(err);
				});
		});
	}
	function interestByRegion(searchOption){
		return new Promise((resolve,reject)=>{
			googleTrends.interestByRegion(searchOption)
			.then(function(results){
				resData = {}
				const lidata = []
				obj = JSON.parse(results)['default']['geoMapData']
				for(var i =0; i < obj.length; i+=1){
					if(obj[i]['value'][0] == 0) continue
					lidata.push({'region':obj[i]['geoName'], 'score':obj[i]['value'][0]})
				}
				resolve(lidata)
			})
			.catch(reject)
		});
	}
	function relatedTopics(searchOption){
		return new Promise((resolve,reject)=>{
			googleTrends.relatedTopics(searchOption)
			.then(function(results){
				resData = {}
				const lidata1 = []
				const lidata2 = []
				obj = JSON.parse(results)['default']['rankedList']
				keywordlist1 = obj[0]['rankedKeyword']
				for(var i =0; i < keywordlist1.length; i+=1)
					lidata1.push({'topic':keywordlist1[i]['topic']['title']+"("+keywordlist1[i]['topic']['type']+")",'score':keywordlist1[i]['formattedValue']})
				resData["top"] = lidata1
				keywordlist2 = obj[1]['rankedKeyword']
				for(var i =0; i < keywordlist2.length; i+=1)
					lidata2.push({'topic':keywordlist2[i]['topic']['title']+"("+keywordlist2[i]['topic']['type']+")",'score':keywordlist2[i]['formattedValue']})
				resData["rising"] = lidata1
				resolve(resData)

			}).catch(reject);
		});
	}
	function relatedQueries(searchOption){
		return new Promise((resolve,reject)=>{
			googleTrends.relatedQueries(searchOption)
			.then(function(results){
				resData={}
				const lidata1 = []
				const lidata2 = []
				obj = JSON.parse(results)['default']['rankedList']
				keywordlist1 = obj[0]['rankedKeyword']
				for(var i =0; i < keywordlist1.length; i+=1)
					lidata1.push({'query':keywordlist1[i]['query'],'score':keywordlist1[i]['formattedValue']})
				resData["top"] = lidata1
				keywordlist2 = obj[1]['rankedKeyword']
				for(var i =0; i < keywordlist2.length; i+=1)
					lidata2.push({'query':keywordlist2[i]['query'],'score':keywordlist2[i]['formattedValue']})
				resData["rising"] = lidata2
				resolve(resData)
			})
			.catch(reject);
		});
	}

	result = {}
	result['interest_over_time'] = await interestOverTime(searchOption)
	result['interest_by_resion'] = await interestByRegion(searchOption)
	result['related_queries'] = await relatedQueries(searchOption)
	result['related_topics'] = await relatedTopics(searchOption)

	res.json(result);	
}

