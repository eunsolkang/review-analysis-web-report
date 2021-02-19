import React from 'react';
import styled from 'styled-components';
const PositioningBlock = styled.div`
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

const Positioning = () => {
    return (
        <PositioningBlock>
            <h3>
                Positioning
            </h3>
            <section>
                asd
            </section>
        </PositioningBlock>
    )
}

export default Positioning;