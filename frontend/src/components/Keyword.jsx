import React from 'react';
import styled from 'styled-components';
const KeywordBlock = styled.div`
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

const Keyword = () => {
    return (
        <KeywordBlock>
            <h3>
                Keyword
            </h3>
            <section>
                asd
            </section>
        </KeywordBlock>
    )
}

export default Keyword;