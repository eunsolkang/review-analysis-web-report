import React from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';
import moment from "moment";


const TrendBlock = styled.div`
    margin-top: 2rem; 
    h3{
      color: #222;
    }
    section{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
      //height: 180px;
      border-radius: 10px;
      background: white;
      padding: 1rem;
    }
`;

const interestByRegion = {
    "interestByRegion": [{"region": "Albania", "value": 100}, {
        "region": "United Kingdom",
        "value": 46
    }, {"region": "Netherlands", "value": 43}, {"region": "Cambodia", "value": 43}, {
        "region": "Jamaica",
        "value": 42
    }, {"region": "Singapore", "value": 34}, {"region": "South Africa", "value": 29}, {
        "region": "United Arab Emirates",
        "value": 28
    }, {"region": "Sweden", "value": 27}, {"region": "France", "value": 25}, {
        "region": "Italy",
        "value": 24
    }, {"region": "Germany", "value": 24}, {"region": "Australia", "value": 23}, {
        "region": "Philippines",
        "value": 23
    }, {"region": "Hong Kong", "value": 21}, {"region": "Slovenia", "value": 20}, {
        "region": "Denmark",
        "value": 20
    }, {"region": "Kuwait", "value": 20}, {"region": "Belgium", "value": 20}, {
        "region": "Ireland",
        "value": 19
    }, {"region": "United States", "value": 19}, {"region": "Austria", "value": 19}, {
        "region": "Switzerland",
        "value": 19
    }, {"region": "Malaysia", "value": 18}, {"region": "Greece", "value": 18}, {
        "region": "Ghana",
        "value": 18
    }, {"region": "Tunisia", "value": 17}, {"region": "Serbia", "value": 15}, {
        "region": "Canada",
        "value": 13
    }, {"region": "Nigeria", "value": 12}, {"region": "Pakistan", "value": 12}, {
        "region": "Norway",
        "value": 12
    }, {"region": "Romania", "value": 12}, {"region": "Portugal", "value": 11}, {
        "region": "Bulgaria",
        "value": 11
    }, {"region": "Algeria", "value": 11}, {"region": "Morocco", "value": 10}, {
        "region": "Slovakia",
        "value": 10
    }, {"region": "India", "value": 9}, {"region": "Finland", "value": 9}, {
        "region": "Croatia",
        "value": 8
    }, {"region": "Vietnam", "value": 8}, {"region": "Poland", "value": 8}, {
        "region": "Israel",
        "value": 8
    }, {"region": "New Zealand", "value": 8}, {"region": "Saudi Arabia", "value": 7}, {
        "region": "Bangladesh",
        "value": 7
    }, {"region": "Brazil", "value": 6}, {"region": "Turkey", "value": 6}, {
        "region": "Egypt",
        "value": 5
    }, {"region": "Thailand", "value": 5}, {"region": "Hungary", "value": 5}, {
        "region": "Czechia",
        "value": 5
    }, {"region": "South Korea", "value": 4}, {"region": "Indonesia", "value": 4}, {
        "region": "Taiwan",
        "value": 3
    }, {"region": "Ukraine", "value": 2}, {"region": "Spain", "value": 2}, {
        "region": "Mexico",
        "value": 2
    }, {"region": "Colombia", "value": 2}, {"region": "Russia", "value": 2}, {
        "region": "Argentina",
        "value": 1
    }, {"region": "Japan", "value": 1},]
}

const interestOverTime = {
    "interestOverTime": [{"time": "Feb 16 – 22, 2020", "value": 70}, {
        "time": "Feb 23 – 29, 2020",
        "value": 74
    }, {"time": "Mar 1 – 7, 2020", "value": 65}, {
        "time": "Mar 8 – 14, 2020",
        "value": 60
    }, {"time": "Mar 15 – 21, 2020", "value": 48}, {
        "time": "Mar 22 – 28, 2020",
        "value": 41
    }, {"time": "Mar 29 – Apr 4, 2020", "value": 45}, {
        "time": "Apr 5 – 11, 2020",
        "value": 60
    }, {"time": "Apr 12 – 18, 2020", "value": 67}, {
        "time": "Apr 19 – 25, 2020",
        "value": 61
    }, {"time": "Apr 26 – May 2, 2020", "value": 75}, {
        "time": "May 3 – 9, 2020",
        "value": 71
    }, {"time": "May 10 – 16, 2020", "value": 76}, {
        "time": "May 17 – 23, 2020",
        "value": 82
    }, {"time": "May 24 – 30, 2020", "value": 85}, {
        "time": "May 31 – Jun 6, 2020",
        "value": 83
    }, {"time": "Jun 7 – 13, 2020", "value": 86}, {
        "time": "Jun 14 – 20, 2020",
        "value": 84
    }, {"time": "Jun 21 – 27, 2020", "value": 81}, {
        "time": "Jun 28 – Jul 4, 2020",
        "value": 90
    }, {"time": "Jul 5 – 11, 2020", "value": 87}, {
        "time": "Jul 12 – 18, 2020",
        "value": 100
    }, {"time": "Jul 19 – 25, 2020", "value": 92}, {
        "time": "Jul 26 – Aug 1, 2020",
        "value": 93
    }, {"time": "Aug 2 – 8, 2020", "value": 96}, {
        "time": "Aug 9 – 15, 2020",
        "value": 83
    }, {"time": "Aug 16 – 22, 2020", "value": 88}, {
        "time": "Aug 23 – 29, 2020",
        "value": 80
    }, {"time": "Aug 30 – Sep 5, 2020", "value": 74}, {
        "time": "Sep 6 – 12, 2020",
        "value": 81
    }, {"time": "Sep 13 – 19, 2020", "value": 76}, {
        "time": "Sep 20 – 26, 2020",
        "value": 64
    }, {"time": "Sep 27 – Oct 3, 2020", "value": 67}, {
        "time": "Oct 4 – 10, 2020",
        "value": 69
    }, {"time": "Oct 11 – 17, 2020", "value": 60}, {
        "time": "Oct 18 – 24, 2020",
        "value": 59
    }, {"time": "Oct 25 – 31, 2020", "value": 56}, {
        "time": "Nov 1 – 7, 2020",
        "value": 58
    }, {"time": "Nov 8 – 14, 2020", "value": 53}, {
        "time": "Nov 15 – 21, 2020",
        "value": 63
    }, {"time": "Nov 22 – 28, 2020", "value": 70}, {
        "time": "Nov 29 – Dec 5, 2020",
        "value": 64
    }, {"time": "Dec 6 – 12, 2020", "value": 69}, {
        "time": "Dec 13 – 19, 2020",
        "value": 62
    }, {"time": "Dec 20 – 26, 2020", "value": 77}, {
        "time": "Dec 27, 2020 – Jan 2, 2021",
        "value": 60
    }, {"time": "Jan 3 – 9, 2021", "value": 56}, {
        "time": "Jan 10 – 16, 2021",
        "value": 59
    }, {"time": "Jan 17 – 23, 2021", "value": 56}, {
        "time": "Jan 24 – 30, 2021",
        "value": 55
    }, {"time": "Jan 31 – Feb 6, 2021", "value": 65}, {"time": "Feb 7 – 13, 2021", "value": 59}]
}

const relatedTopicsTop = {
    "relatedTopicsTop": [{
        "topic": "T-shirt(Clothing)",
        "value": "100"
    }, {"topic": "Shirt(Garment)", "value": "68"}, {
        "topic": "Shoulder(Topic)",
        "value": "12"
    }, {"topic": "Moschino(Fashion label)", "value": "10"}, {
        "topic": "Sleeve(Topic)",
        "value": "2"
    }, {"topic": "Amiri(Fashion label)", "value": "1"}, {
        "topic": "Burberry(Topic)",
        "value": "<1"
    }, {"topic": "Vlone(Topic)", "value": "<1"}, {"topic": "Marcelo Burlon(Topic)", "value": "<1"}],
    "relatedTopicsRising": [{"topic": "T-shirt(Clothing)", "value": "100"}, {
        "topic": "Shirt(Garment)",
        "value": "68"
    }, {"topic": "Shoulder(Topic)", "value": "12"}, {
        "topic": "Moschino(Fashion label)",
        "value": "10"
    }, {"topic": "Sleeve(Topic)", "value": "2"}, {
        "topic": "Amiri(Fashion label)",
        "value": "1"
    }, {"topic": "Burberry(Topic)", "value": "<1"}, {
        "topic": "Vlone(Topic)",
        "value": "<1"
    }, {"topic": "Marcelo Burlon(Topic)", "value": "<1"}]
}

const relatedQueriesTop = {
    "relatedQueriesTop": [{"query": "versace shirt", "value": "100"}, {
        "query": "dior shirt",
        "value": "88"
    }, {"query": "t shirt versace", "value": "56"}, {
        "query": "armani shirt",
        "value": "54"
    }, {"query": "moschino shirt", "value": "53"}, {"query": "white shirt", "value": "50"}, {
        "query": "t shirt dior",
        "value": "48"
    }, {"query": "louis vuitton shirt", "value": "48"}, {
        "query": "shirt dress",
        "value": "45"
    }, {"query": "t shirt armani", "value": "40"}, {
        "query": "moschino t shirt",
        "value": "40"
    }, {"query": "givenchy shirt", "value": "33"}, {
        "query": "gucci shirt",
        "value": "31"
    }, {"query": "off shoulder shirt", "value": "30"}, {
        "query": "dolce gabbana shirt",
        "value": "30"
    }, {"query": "dsquared shirt", "value": "28"}, {
        "query": "tee shirt",
        "value": "26"
    }, {"query": "christian dior shirt", "value": "26"}, {
        "query": "louis vuitton t shirt",
        "value": "24"
    }, {"query": "alexander mcqueen shirt", "value": "23"}, {
        "query": "burberry shirt",
        "value": "22"
    }, {"query": "t shirt dsquared", "value": "22"}, {
        "query": "t shirt dolce gabbana",
        "value": "22"
    }, {"query": "dior t shirt mens", "value": "5"}, {"query": "dior atelier shirt", "value": "5"}],
    "relatedQueriesRising": [{"query": "air dior shirt", "value": "Breakout"}, {
        "query": "koton t shirt erkek",
        "value": "Breakout"
    }, {"query": "how to cut the sleeves off a shirt", "value": "Breakout"}, {
        "query": "3 pack hugo boss t shirt",
        "value": "Breakout"
    }, {"query": "cold shoulder long sleeve shirt", "value": "+2,900%"}, {
        "query": "how to get lint off black shirt",
        "value": "+2,850%"
    }, {"query": "how to cut sleeves off a shirt", "value": "+600%"}, {
        "query": "t shirt calvin klein homme",
        "value": "+350%"
    }, {"query": "palm angels", "value": "+300%"}, {
        "query": "polo ralph lauren",
        "value": "+250%"
    }, {"query": "dior t shirt mens", "value": "+250%"}, {
        "query": "moschino bear t shirt",
        "value": "+250%"
    }, {"query": "dior shirt men", "value": "+250%"}, {
        "query": "versace collection t shirt",
        "value": "+250%"
    }, {"query": "dior atelier shirt", "value": "+200%"}, {
        "query": "how to style white shirt",
        "value": "+190%"
    }, {"query": "ysl oversized t shirt", "value": "+190%"}, {
        "query": "jean shirt outfit",
        "value": "+190%"
    }, {"query": "t shirt christian dior atelier", "value": "+180%"}, {
        "query": "dior shirt women",
        "value": "+170%"
    }, {"query": "christian dior atelier shirt", "value": "+130%"}, {
        "query": "dior atelier t shirt",
        "value": "+130%"
    }, {"query": "christian dior shirt", "value": "+130%"}, {
        "query": "versace collection shirt",
        "value": "+110%"
    }, {"query": "dior shirt", "value": "+110%"}]
}


const Trend = () => {
    // console.log(moment("Jan 31").format('MM-DD'))
    const width = window.innerWidth;

    return (
        <TrendBlock>
            <h3>
                Trend Analysis
            </h3>
            <section>
                <Plot
                    data={[
                        {
                            x: [...interestOverTime.interestOverTime.map(element => {
                                const splitList = element.time.split(' ');
                                // console.log(splitList);
                                return moment("2021 " + splitList[0] + " " + splitList[1]).format('YYYY-MM-DD');
                            })],
                            y: [...interestOverTime.interestOverTime.map(time => time.value)],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                        },
                    ]}
                    layout={{width: width - 120, height: 580, title: 'Interest Over Time'}}
                />
                <Plot
                    data={[
                        {
                            type: 'bar',
                            x: [...relatedTopicsTop.relatedTopicsTop.map(topic => topic.topic)],
                            y: [...relatedTopicsTop.relatedTopicsTop.map(topic => topic.value)]
                        },
                    ]}
                    layout={{width: width - 120, height: 580, title: 'Related Topics Top'}}
                />
                <Plot
                    data={[
                        {
                            type: 'choropleth',
                            locationmode: 'country names',
                            locations: [...interestByRegion.interestByRegion.map(region => region.region)],
                            z: [...interestByRegion.interestByRegion.map(region => region.value)],
                            text: [...interestByRegion.interestByRegion.map(region => region.region)],
                            autocolorscale: true
                        },
                    ]}
                    layout={{width: width - 120, height: 580, title: 'Interest By Region',
                        geo: {
                            projection: {
                                type: 'robinson'
                            }
                        }}}
                />
            </section>
        </TrendBlock>
    )
}

export default Trend;