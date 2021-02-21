import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';
import moment from "moment";
import {getReviewAnalysis, getTrend} from "../api";
import {Dimmer, Loader, Segment} from "semantic-ui-react";


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
    .segment{
      height: 280px;
    }
`;

const Trend = () => {
    // console.log(moment("Jan 31").format('MM-DD'))
    const width = window.innerWidth;

    const [data, setData] = useState();
    const category = 'fashion';
    const productType = 'shirt';

    useEffect(()=>{
        getData();
    }, []);

    const getData = async () => {
        const token = '2a04dc20-7333-11eb-ae9e-758a5443ae76';

        try{
            const res = await getTrend({token, category, productType});
            setData(res.data);
        }catch (e){
            alert(e);
        }

    }

    return (
        <TrendBlock>
            <h3>
                Trend Analysis
            </h3>
            {
                data ? (
                    <section>
                        <Plot
                            data={[
                                {
                                    x: [...data.interestOverTime.interestOverTime.map(element => {
                                        const splitList = element.time.split(' ');
                                        return moment("2021 " + splitList[0] + " " + splitList[1]).format('YYYY-MM-DD');
                                    })],
                                    y: [...data.interestOverTime.interestOverTime.map(time => time.value)],
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
                                    x: [...data.relatedTopicsTop.relatedTopicsTop.map(topic => topic.topic)],
                                    y: [...data.relatedTopicsTop.relatedTopicsTop.map(topic => topic.value)]
                                },
                            ]}
                            layout={{width: width - 120, height: 580, title: 'Related Topics Top'}}
                        />
                        <Plot
                            data={[
                                {
                                    type: 'choropleth',
                                    locationmode: 'country names',
                                    locations: [...data.interestByRegion.interestByRegion.map(region => region.region)],
                                    z: [...data.interestByRegion.interestByRegion.map(region => region.value)],
                                    text: [...data.interestByRegion.interestByRegion.map(region => region.region)],
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
                ) : (
                    <Segment>
                        <Dimmer inverted active>
                            <Loader>Loading</Loader>
                        </Dimmer>
                    </Segment>
                )
            }
        </TrendBlock>
    )
}

export default Trend;