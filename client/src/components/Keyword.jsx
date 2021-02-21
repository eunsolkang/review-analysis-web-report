import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getKeyword, getReviewAnalysis} from "../api";
import {Dimmer, Image, Loader, Segment} from "semantic-ui-react";
const KeywordBlock = styled.div`
    margin-top: 2rem; 
    h3{
      color: #222;
    }
    section{
      margin-top: 1rem;
      //height: 180px;
      border-radius: 10px;
      background: white;
      padding: 2rem;
      display: flex;
      flex-direction: row;
      //justify-content: space-between;
    }
    .keyword-item{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .title{
        width: 100%;
        text-align: center;
        margin-bottom: .5rem;
      }
      .sentence-item{
        background: rgb(251, 255, 244);
        color: rgb(33, 91, 41);
        display: inline-block;
        border: 1px solid rgba(34, 34, 34, 0.2);
        border-radius: 20px;
        padding: .75rem 1rem .85rem;
        margin-top: .5rem;
        margin-bottom: .5rem;
      }
      .positive{
        background: rgb(251, 255, 244);
        color: rgb(33, 91, 41);
      }
      .negative{
        background: rgb(255, 244, 245);
        color: rgb(161, 64, 65);
      }
      .normal{
        background: rgb(248, 249, 250);
        color: rgb(34, 34, 34);
      }
    }
    .keyword-item + .keyword-item{
      margin-left: 2rem;
    }
    .segment{
      height: 280px;
    }
`;

const Keyword = () => {
    const category = 'fashion';
    const productType = 'shirt';

    const [data, setData] = useState();
    useEffect(()=>{
        getData();
    }, []);


    const getData = async () => {
        const token = '2a04dc20-7333-11eb-ae9e-758a5443ae76';
        const res = await getKeyword({token, category, productType});
        setData(res.data.relevant_reviews);
    }

    return (
        <KeywordBlock>
            <h3>
                Keyword
            </h3>
            {
                data ? (
                    <section>
                        {
                            Object.entries(data).map((keyword, j) => {
                                return(
                                    <div className={'keyword-item'} key={j}>
                                        <h3 className={'title'}>
                                            #{keyword[0]}
                                        </h3>
                                        {
                                            keyword[1].map((item, i) => {
                                                return (
                                                    <div key={i + '' + j} className={`sentence-item ${item.sentiment === 2 ? "negative" : (item.sentiment === 1 ? "positive" : "normal")}`}>
                                                        {item.sentence}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </section>
                ): (
                    <Segment>
                        <Dimmer inverted active>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </Segment>
                )
            }
        </KeywordBlock>
    )
}

export default Keyword;