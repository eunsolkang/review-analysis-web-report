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
      margin-top: 1rem;
      border-radius: 10px;
      background: white;
      padding: 1rem;
      article{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h4{
          text-align: center;
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
                    <Plot
                        data={[
                            {
                                type: 'bar',
                                x: [20, 14, 23],
                                y: ['great', 'normal', 'bad'],
                                orientation: 'h'
                            },
                        ]}
                        layout={ {width: 500, height: 400, title: 'Pos / Neg Review'} }
                    />
                </article>
                <article>
                    <h4>
                        Word Cloud
                    </h4>
                    <img src={'/img/wordcloud.png'}/>
                </article>
            </section>
        </ReviewBlock>
    )
}

export default Review;