import React, { useState, Children } from 'react';
import styled, {css} from 'styled-components';
import palette from '../../lib/styles/palette'
import { Dropdown, Form, Input } from 'semantic-ui-react';
import useFilter from '../../hooks/common/useFilter';
import Button from '../common/Button';


const FilterBlock = styled.div`

    background : rgb(240, 240, 240);
    padding : 1rem;
    display: flex;
    border-top : 2px solid black;
    flex-direction: column;
    width: calc(100vw - 225px);
    font-size : 1.125rem;
    #p1{
        .title{
            width: 100px;
        }
        .contents{
            display: flex;
            flex-direction: column;
        }
        display: flex;
        flex-direction: row;
        border-bottom : 1px solid lightgray;
    }
    #p2{
        .title{
            width: 100px;
        }
        padding-top : 1.5rem;
        .filter-box{
            display: flex;
            flex-direction: row;
        }
    }
    section{
        
        display: flex;
        flex-direction: row;

    }
    .btn-box{
        display: flex;
        justify-content: flex-end;
        margin-right: .25rem;
        .btn{
            margin-left: .5rem;
        }
    }
`;


const Filter = ({children, onSubmit, onReset = ()=>{}}) => {
    return (
        <FilterBlock>
            {children}
            <section className="btn-box">
                <Button static className="btn" onClick={onSubmit} >조회</Button>
                <Button static className="btn" gray onClick={onReset}>초기화</Button>
            </section>
           
        </FilterBlock>
    )
}

export default Filter;