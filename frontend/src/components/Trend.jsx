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


const Trend = () => {
    console.log(moment("Jan 31").format('MM-DD'))
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
                                return moment("2021 " +splitList[0] + " " + splitList[1]).format('YYYY-MM-DD');
                            })],
                            y: [...interestOverTime.interestOverTime.map(time => time.value)],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                        },
                    ]}
                    layout={ {width: 1280, height: 580, title: 'InterestOverTime'} }
                />
            </section>
        </TrendBlock>
    )
}

export default Trend;