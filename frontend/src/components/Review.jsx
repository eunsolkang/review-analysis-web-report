import React from 'react';
import styled from 'styled-components';
import Plot from 'react-plotly.js';

const ReviewBlock = styled.div`
    h3{
      color: #222;
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
    return (
        <ReviewBlock>
            <h3>
                Pos / Neg Review (Analysis)
            </h3>
            <section>
                <article>
                    <h4>
                        All Word
                    </h4>
                    <img src={'/img/wordcloud1.png'}/>
                </article>
                <article>
                    <h4>
                        Negative Word
                    </h4>
                    <img src={'/img/wordcloud2.png'}/>
                </article>
                <article>
                    <h4>
                        Positive Word
                    </h4>
                    <img src={'/img/wordcloud3.png'}/>
                </article>
            </section>
        </ReviewBlock>
    )
}

export default Review;