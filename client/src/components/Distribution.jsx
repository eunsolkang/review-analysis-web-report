import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getReviewAnalysis} from "../api";
import {Image, Loader, Dimmer, Progress, Rating, Segment} from "semantic-ui-react";
import {useRouter} from '../useRouter';

const DistributionBlock = styled.div`
 margin-top: 2rem;
    h3{
      color: #222;
    }
    .segment{
      height: 280px;
    }
    section{
      margin-top: 1rem;
      //height: 280px;
      border-radius: 10px;
      background: white;
      //padding: 1rem;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .rate-box{
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    .rate-list{
      display: flex;
      align-items: center;
      justify-content: center;
      .rate{
        margin-left: 1rem;
        margin-top: 1.5rem;
        width: calc(100vw - 400px);
      }
    }
`;

const Distribution = () => {
    const [data, setData] = useState();
    const [total, setTotal] = useState();
    const router = useRouter();

    useEffect(()=>{
        getData();
    }, []);


    useEffect(()=>{
        const totalData = data && Object.entries(data).reduce((acc, val) => {
            return acc + val[1];
        }, 0);
        setTotal(totalData);
    }, [data]);

    const getData = async () => {
        const {token, category, productType} = router.query;
        const t = token ? token : '2a04dc20-7333-11eb-ae9e-758a5443ae76';
        const res = await getReviewAnalysis({token: t});
        setData(res.data.score_count);
    }
    return (
        <DistributionBlock>
            <h3>Review Score</h3>
            {
                data ? (
                    <section>

                        <div className={'rate-box'}>
                            {
                                Object.entries(data).map((d, i) => {
                                    return (
                                        <div className={'rate-list'} key={i}>
                                            <Rating disabled maxRating={5} defaultRating={5 - i} icon='star' size='large'  />
                                            <div className={'rate'}>
                                                <Progress value={Math.floor(d[1] / 10)} total={Math.floor(total / 10)} progress='percent' warning active />
                                            </div>
                                        </div>
                                    )
                                })

                            }
                        </div>

                    </section>
                ) : (
                    <Segment>
                        <Dimmer inverted active>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </Segment>
                )
            }

        </DistributionBlock>
    )
}

export default Distribution;