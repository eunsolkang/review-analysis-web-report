import React from 'react';
import styled from 'styled-components';
const TrendBlock = styled.div`
    margin-top: 2rem; 
    h3{
      color: #222;
    }
    section{
      margin-top: 1rem;
      height: 180px;
      border-radius: 10px;
      background: white;
      padding: 1rem;
    }
`;

const Trend = () => {
    return (
        <TrendBlock>
            <h3>
                Trend Analysis
            </h3>
            <section>
                asd
            </section>
        </TrendBlock>
    )
}

export default Trend;