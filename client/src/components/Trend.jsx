import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';
import moment from "moment";
import {getTrend} from "../api";
import {Dimmer, Loader, Segment} from "semantic-ui-react";
import {useRouter} from '../useRouter';


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
    const router = useRouter();


    useEffect(()=>{
        getData();
    }, []);

    const getData = async () => {
        const {token, category, productType} = router.query;
        const t = token ? token : '2a04dc20-7333-11eb-ae9e-758a5443ae76';
        const c = category ? category : 'fashion';
        const p = productType ? productType : 'shirt';
        try{
            const res = await getTrend({token : t, category : c, productType : p});
            console.log(res);
            setData(res.data);
        }catch (e){
            console.log(e);
            // alert(e);
        }

    }
    console.log( data && data.related_topics);
    return (
        <TrendBlock>
            <h3>
                Trend Analysis
            </h3>
            {
                data ? (
                    <section>
                        {
                            data.interest_over_time && (
                                <Plot
                                    data={[
                                        {
                                            x: [...data.interest_over_time.map(element => {
                                                const splitList = element.period.split(' ');
                                                return moment("2021 " + splitList[0] + " " + splitList[1]).format('YYYY-MM-DD');
                                            })],
                                            y: [...data.interest_over_time.map(time => time.score)],
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: {color: 'red'},
                                        },
                                    ]}
                                    layout={{width: width - 120, height: 580, title: 'Interest Over Time'}}
                                />
                            )
                        }
                        {
                            data.related_topics && (
                                <Plot
                                    data={[
                                        {
                                            type: 'bar',
                                            x: [...data.related_topics.top.map(topic => topic.topic)],
                                            y: [...data.related_topics.top.map(topic => topic.score)]
                                        },
                                    ]}
                                    layout={{width: width - 120, height: 580, title: 'Related Topics Top'}}
                                />
                            )
                        }
                        {
                            data.interest_by_region && (
                                <Plot
                                    data={[
                                        {
                                            type: 'choropleth',
                                            locationmode: 'country names',
                                            locations: [...data.interest_by_region.map(region => region.region)],
                                            z: [...data.interest_by_region.map(region => region.score)],
                                            text: [...data.interest_by_region.map(region => region.region)],
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
                            )
                        }

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