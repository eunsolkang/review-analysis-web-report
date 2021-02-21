import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {Button} from "semantic-ui-react";
import Review from "./Review";
import Trend from "./Trend";
import Keyword from "./Keyword";
import Positioning from "./Positioning";
import Consultant from "./Consultant";
import Distribution from "./Distribution";

const AnalysisBlock = styled.div`
  
  h3{
    margin: 0;
  }
  header{
    z-index: 100000 !important;
    position: fixed;
    height: 5.5rem;
    width: 100%;
    background: #001bc0;
    //background: rgb(73, 113, 229);
    display: flex;
    align-items: center;
    justify-content: space-between;
    div img{
      margin-left: 2rem;
      width: 120px;
      //height: 80px;
    }
    .nav-list{
      display: flex;
      flex-direction: row;
      nav{
        min-width: 100px;
        cursor: pointer;
        font-size: 1.125rem;
        font-weight: bold;
        color: white;
        padding-left: .75rem;
        padding-right: .75rem;
        text-align: center;
      }
      nav + nav{
        border-left: 1px solid white;
      } 
    }
    .button-group{
       margin-right: 2rem;
     }
  }
  main{
    //height: calc(100vh - 5.5rem);
    
    padding: 4rem;
    padding-top: 7.5rem;
    background: rgb(233, 238, 241);
  }
  
`;

const AnalysisComponent = () => {
    const scrollTo = useCallback((tag) => {
        let location = document.querySelector(tag).offsetTop;
        window.scrollTo({top: location, behavior: 'smooth'});
    }, []);

   
    
    return (
        <AnalysisBlock>
            <header>
                <div><img src={'img/logo-white.png'}/></div>
                <div className={'nav-list'}>
                    <nav onClick={()=>{scrollTo('#p1')}}>
                        Pos / Neg Review
                    </nav>
                    <nav onClick={()=>{scrollTo('#p2')}}>
                        Trend Analysis
                    </nav>
                    <nav onClick={()=>{scrollTo('#p3')}}>
                        Keyword
                    </nav>
                    <nav onClick={()=>{scrollTo('#p4')}}>
                        Review Score
                    </nav>
                    <nav onClick={()=>{scrollTo('#p5')}}>
                        Positioning
                    </nav>
                </div>
                <div className={'button-group'} >
                    <Button basic inverted onClick={()=>{scrollTo('#p5')}}>
                        Consultant Matching
                    </Button>
                </div>
            </header>
            <main>
                <div id={'p1'}>
                    <Review></Review>
                </div>
                <div id={'p2'}>
                    <Trend></Trend>
                </div>
                <div id={'p3'}>
                    <Keyword></Keyword>
                </div>
                <div id={'p4'}>
                    <Distribution></Distribution>
                </div>
                <div id={'p5'}>
                    <Positioning></Positioning>
                </div>
                <div id={'p6'}>
                    <Consultant/>
                </div>
            </main>
        </AnalysisBlock>
    )
}

export default AnalysisComponent;
