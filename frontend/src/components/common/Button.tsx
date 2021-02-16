import React from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom'
import palette from '../../lib/styles/palette'

const buttonStyle = css`
    border : none;
    border-radius : 4px;
    font-size : 1rem;
    font-weight : bold;
    padding : .75rem 2.75rem;
    color : white;
    outline : none;
    cursor: pointer;

    background-color : ${palette.main[0]};
    &:hover{
        background-color : ${palette.main[1]}
    }
    ${props => 
        props.fullWidth &&
        css `
            padding-top : 0.75rem;
            padding-bottom : 0.75rem;
            width: 100%;
            font-size : 0.925rem;
        `
    }
    ${props => 
        props.gray &&
        css `
            background-color : ${palette.gray[6]};
            &:hover{
                background-color : ${palette.gray[7]}
            }
        `
    }
    ${props => 
        props.white &&
        css `
            background-color : white;
            color : black;

            border : 1px solid rgb(183, 183, 183); 
            &:hover{
                background-color : rgb(240, 240, 240)

            }
        `
    }
    ${props => 
        props.lightgray &&
        css `
            background-color : rgb(183, 183, 183);
            &:hover{
                background-color : rgb(163, 163, 163)
            }
        `
    }
    ${props => 
        props.disable &&
        css `
            background : ${palette.gray[4]} !important;
            cursor: default;
            /* &:hover {
                background : ${palette.cyan[4]}
            } */
        `
    }
    ${props => 
        props.static &&
        css `
            width : 100px;
            padding-left : 0;
            padding-right : 0;
        `
    }
    ${props =>
        props.cyan &&
        css `
            background : ${palette.main[0]};
            &:hover {
                background : ${palette.main[1]}
            }
        `
    }
    ${props =>
        props.red &&
        css `
            margin-left : 1rem;
            background : rgb(234, 64, 64);
            &:hover {
                background : rgb(224, 54, 54);
            }
        `
    }
`
const StyledButton = styled.button`
    ${buttonStyle}
`;
 
const StyledLink = styled(Link)`
    ${buttonStyle}
`;

const Button = props => {
    
    return props.to ? 
        (<StyledLink {...props} cyan={props.cyan ? 1 : 0}/>):
        (<StyledButton {...props} className="btn"/>)
}

export default Button;
