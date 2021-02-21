import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';
import {baseURL, getReviewAnalysis} from "../api";
import {Dimmer, Image, Loader, Segment} from "semantic-ui-react";

const ReviewBlock = styled.div`
    h3{
      color: #222;
    }
    .segment{
      height: 340px;
    }
    section{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 1rem;
      border-radius: 10px;
      background: white;
      padding: 2rem;
      article{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h4{
          text-align: center;
        }
        img{
          margin-right: 1rem;
          margin-left: 1rem;
          width: 90%;
          box-shadow: 0 10px 40px 0 rgba(195, 208, 226, 0.7);
        }
      }
    }
`;

const Review = () => {
    const [data, setData] = useState();
    const [total, setTotal] = useState();
    useEffect(()=>{
        getData();
    }, []);

    const getData = async () => {
        const token = '2a04dc20-7333-11eb-ae9e-758a5443ae76';
        const res = await getReviewAnalysis({token});
        setData(res.data);
    }

    return (
        <ReviewBlock>
            <h3>
                Pos / Neg Review (Analysis)
            </h3>
            {
                data ? <section>
                    <article>
                        <h4>
                            Overall
                        </h4>
                        <img src={baseURL + data.keyword_cloud}/>
                    </article>
                    <article>
                        <h4>
                            Negative Words
                        </h4>
                        <img src={baseURL +  data.positive_keyword_cloud}/>
                    </article>
                    <article>
                        <h4>
                            Positive Words
                        </h4>
                        <img src={baseURL + data.negative_keyword_cloud}/>
                    </article>
                </section> : (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

                    </Segment>
                )
            }

        </ReviewBlock>
    )
}

export default Review;