const googleTrends = require('google-trends-api');
const fs = require('fs');

startTime = new Date();
startTime.setFullYear(startTime.getFullYear() - 1);
searchOption = {keyword:'shirt',category:185, startTime:startTime}


//*
googleTrends.interestOverTime(searchOption)
.then(function(results){
	resData = {}
	//console.log('=========[interest over time]=================================================')
	const lidata = []
	var obj = JSON.parse(results)['default']['timelineData'];
  	for (var i =0; i < obj.length; i+=1){
		//console.log(obj[i]['formattedTime'],'\t\t',obj[i]['value'][0])
		lidata.push({'time':obj[i]['formattedTime'], 'value':obj[i]['value'][0]})
	}
	resData["interestOverTime"] = lidata
	//console.log(JSON.stringify(resData))
	fs.writeFileSync('interestOverTime.json',JSON.stringify(resData));
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});
//*/
///*
googleTrends.interestByRegion(searchOption)
.then(function(results){
	resData = {}
	const lidata = []
	//console.log('========[interest by region]==================================================')
  	obj = JSON.parse(results)['default']['geoMapData']
	for(var i =0; i < obj.length; i+=1){
		if(obj[i]['value'][0] == 0) continue
		//console.log(obj[i]['geoName'],'\t\t', obj[i]['value'])
		lidata.push({'region':obj[i]['geoName'], 'value':obj[i]['value'][0]})
	}
	//console.log(lidata)
	resData["interestByRegion"] = lidata
	//geoName, value 
	fs.writeFileSync('interestByRegion.json',JSON.stringify(resData));
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});
//*/
///*
googleTrends.relatedQueries(searchOption)
.then(function(results){
	resData = {}
	const lidata1 = []
	const lidata2 = []
	obj = JSON.parse(results)['default']['rankedList']
	//console.log('==========[related queries top]================================================')
	keywordlist1 = obj[0]['rankedKeyword']
	for(var i =0; i < keywordlist1.length; i+=1)
		//console.log(keywordlist1[i]['query'],'\t\t',keywordlist1[i]['formattedValue'])
		lidata1.push({'query':keywordlist1[i]['query'],'value':keywordlist1[i]['formattedValue']})
	//console.log(lidata1)
	resData["relatedQueriesTop"] = lidata1
	//console.log('==========[related queries rising]================================================')
	keywordlist2 = obj[1]['rankedKeyword']
	for(var i =0; i < keywordlist2.length; i+=1)
		lidata2.push({'query':keywordlist2[i]['query'],'value':keywordlist2[i]['formattedValue']})
		//console.log(keywordlist2[i]['query'],'\t\t',keywordlist2[i]['formattedValue'])
	resData["relatedQueriesRising"] = lidata2
	fs.writeFileSync('relatedQueries.json',JSON.stringify(resData));
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});
//*/
//*
googleTrends.relatedTopics(searchOption)
.then(function(results){
	resData = {}
	const lidata1 = []
	const lidata2 = []
	obj = JSON.parse(results)['default']['rankedList']
	//console.log('==========[related topics top]================================================')
	keywordlist1 = obj[0]['rankedKeyword']
	for(var i =0; i < keywordlist1.length; i+=1)
		lidata1.push({'topic':keywordlist1[i]['topic']['title']+"("+keywordlist1[i]['topic']['type']+")",'value':keywordlist1[i]['formattedValue']})
		//console.log(keywordlist1[i]['topic'],'\t\t',keywordlist1[i]['formattedValue'])
	resData["relatedTopicsTop"] = lidata1
	//console.log('==========[related topics rising]================================================')
	keywordlist2 = obj[1]['rankedKeyword']
	for(var i =0; i < keywordlist2.length; i+=1)
		//console.log(keywordlist2[i]['topic'],'\t\t',keywordlist2[i]['formattedValue'])
		lidata2.push({'topic':keywordlist2[i]['topic']['title']+"("+keywordlist2[i]['topic']['type']+")",'value':keywordlist2[i]['formattedValue']})
	resData["relatedTopicsRising"] = lidata1
	fs.writeFileSync('relatedTopics.json',JSON.stringify(resData));
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});
//*/
