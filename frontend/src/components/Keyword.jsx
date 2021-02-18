import React from 'react';
import styled from 'styled-components';
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
    
`;

const keywordData = {
    "fit": [
        {
            "id": 9469,
            "sentence": "He is 16 and 6 foot 3, so if you are ordering for someone tall be cautious",
            "sentiment": "0"
        },
        {
            "id": 9946,
            "sentence": "Fit great",
            "sentiment": "1"
        },
        {
            "id": 10509,
            "sentence": "The shirt fits Perfect",
            "sentiment": "1"
        },
        {
            "id": 10882,
            "sentence": "remember to size up to make a shirt not feel skin tight 2-3\" for tighter fit, 4 - 5 regular fit, 6+ baggy",
            "sentiment": "0"
        },
        {
            "id": 1443,
            "sentence": "It worked",
            "sentiment": "0"
        }
    ],
    "color": [
        {
            "id": 1427,
            "sentence": "Great shirt - bought it for my husband for a wedding, it wasn_ see-thru and a great color",
            "sentiment": "1"
        },
        {
            "id": 5970,
            "sentence": "Great purchase, materials great, husband is very happy",
            "sentiment": "1"
        },
        {
            "id": 10346,
            "sentence": "This came directly from Amazon, in original packaging",
            "sentiment": "0"
        },
        {
            "id": 5250,
            "sentence": "A bit clearly wrinkled when it arrived, just from the folds",
            "sentiment": "2"
        },
        {
            "id": 6623,
            "sentence": "Beautiful color well-made husband looks great in it",
            "sentiment": "1"
        }
    ],
    "material": [
        {
            "id": 2386,
            "sentence": "Quality feel",
            "sentiment": "1"
        },
        {
            "id": 8837,
            "sentence": "Very comfortable, easy to wash with minimal ironing",
            "sentiment": "1"
        },
        {
            "id": 7988,
            "sentence": "Did not like material",
            "sentiment": "2"
        },
        {
            "id": 11435,
            "sentence": "Fabric is kinda thick",
            "sentiment": "0"
        },
        {
            "id": 7549,
            "sentence": "excellent t-shirt",
            "sentiment": "1"
        }
    ]
}
const Keyword = () => {
    return (
        <KeywordBlock>
            <h3>
                Keyword
            </h3>
            <section>
                {
                    Object.entries(keywordData).map((keyword) => {
                        return(
                            <div className={'keyword-item'}>
                                <h3 className={'title'}>
                                    #{keyword[0]}
                                </h3>
                                {
                                    keyword[1].map(item => {
                                        return (
                                            <div className={`sentence-item ${item.sentiment === "2" ? "negative" : item.sentiment === "1" ? "normal" : "positive"}`}>
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
        </KeywordBlock>
    )
}

export default Keyword;