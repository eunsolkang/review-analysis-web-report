import React from 'react';
import styled from 'styled-components';
const PositioningBlock = styled.div`
    margin-top: 2rem;
    h3{
      color: #222;
    }
    section{
      margin-top: 1rem;
      height: 280px;
      border-radius: 10px;
      background: white;
      //padding: 1rem;
      position: relative;
      display: flex;
      justify-content: center;
      .background{
          border-radius: 10px;
          width: 100%;
          height: 100%;
          background: rgba(34, 34, 34, 0.5);
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: bold;
          font-size: 24px;
        }
        img{
          padding-top: 2rem;
          padding-bottom: 2rem;
          height: 280px;
          position: absolute;
        }
    }
    
`;

const Positioning = () => {
    return (
        <PositioningBlock>
            <h3>
                Positioning
            </h3>
            <section>
                <img src={'img/' +
                'position.png'}/>
                <div className={'background'}>
                    This function is under development.
                </div>
            </section>
        </PositioningBlock>
    )
}

export default Positioning;