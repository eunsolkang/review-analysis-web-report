import React from 'react';
import styled from 'styled-components';
import {Button, Dropdown, Input} from "semantic-ui-react";

const ConsultantBlock = styled.div`
  margin-top: 2rem;
  h3{
    margin-bottom: 1rem;
  }
  .input-list{
    display: flex;
    flex-direction: column;
    //align-items: flex-start;
    .input + .input{
      margin-top: 1rem;
    }
    .dropdown{
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .button{
      margin-top: 1rem;
      background: rgb(12, 25, 181);
    }
  }
`;
const stateOptions = [
    {
        key: 'aa',
        text: 'Arts & Crafts',
        value: 'Arts & Crafts',
    },
    {
        key: 'aa',
        text: 'Automotive',
        value: 'Automotive',
    },
    {
        key: 'aa',
        text: 'Baby',
        value: 'Baby',
    },
    {
        key: 'aa',
        text: 'Beauty & Personal Care',
        value: 'Beauty & Personal Care',
    },
    {
        key: 'aa',
        text: 'Books',
        value: 'Books',
    },
    {
        key: 'aa',
        text: 'Arts & Crafts',
        value: 'Arts & Crafts',
    },
    {
        key: 'aa',
        text: 'Computers',
        value: 'Computers',
    },
    {
        key: 'Digital Music',
        text: 'Digital Music',
        value: 'Digital Music',
    },
    {
        key: 'Electronics',
        text: 'Electronics',
        value: 'Electronics',
    },
    {
        key: 'Kindle Store',
        text: 'Kindle Store',
        value: 'Kindle Store',
    },
    {
        key: 'Prime Video',
        text: 'Prime Video',
        value: 'Prime Video',
    },
    {
        key: 'Women’s Fashion',
        text: 'Women’s Fashion',
        value: 'Women’s Fashion',
    },
    {
        key: 'Men’s Fashion',
        text: 'Men’s Fashion',
        value: 'Men’s Fashion',
    },
    {
        key: 'Girl’s Fashion',
        text: 'Girl’s Fashion',
        value: 'Girl’s Fashion',
    }, {
        key: 'Boy’s Fashion',
        text: 'Boy’s Fashion',
        value: 'Boy’s Fashion',
    }, {
        key: 'Deals',
        text: 'Deals',
        value: 'Deals',
    },
    {
        key: 'Health & Household',
        text: 'Health & Household',
        value: 'Health & Household',
    }, {
        key: 'Home & Kitchen',
        text: 'Home & Kitchen',
        value: 'Home & Kitchen',
    }, {
        key: 'Industrial & Scientific',
        text: 'Industrial & Scientific',
        value: 'Industrial & Scientific',
    }, {
        key: 'Luggage',
        text: 'Luggage',
        value: 'Luggage',
    },
    {
        key: 'Movies & TC',
        text: 'Movies & TC',
        value: 'Movies & TC',
    },
    {
        key: 'Music. CDs & Vinyl',
        text: 'Music. CDs & Vinyl',
        value: 'Music. CDs & Vinyl',
    },
    {
        key: 'Pet Supplies',
        text: 'Pet Supplies',
        value: 'Pet Supplies',
    }, {
        key: 'Software',
        text: 'Software',
        value: 'Software',
    },
    {
        key: 'Sports & Outdoors',
        text: 'Sports & Outdoors',
        value: 'Sports & Outdoors',
    },
    {
        key: 'Tools & Home Improvement',
        text: 'Tools & Home Improvement',
        value: 'Tools & Home Improvement',
    },
    {
        key: 'Toys & Games',
        text: 'Toys & Games',
        value: 'Toys & Games',
    },
    {
        key: 'Video Games ',
        text: 'Video Games ',
        value: 'Video Games ',
    },


]
const Consultant = () => {
    return (
        <ConsultantBlock>
            <h3>
                Consulting
            </h3>
            <p>The form is related with Charged Service 3 (Consulting Service)<br/>
                Before mediating with consultant managers, clients will be demanded to fill out this form for collecting basic information regarding their business and purpose of registering for this service</p>
            <div className={'input-list'}>
                <Input placeholder={"Full Name : First Name / Last Name"}></Input>
                <Input placeholder={"Email"}></Input>
                <Input placeholder={"Phone Number"}></Input>
                <Dropdown
                    placeholder='Business Type'
                    fluid
                    multiple
                    search
                    selection
                    options={stateOptions}
                />
                <Input placeholder={"Name of Business (Company, Organization or Brand)"}></Input>
                <Input placeholder={"Expected Results from the Project (Name at least 1-3) "}></Input>
                <Input placeholder={"Expected Project Duration "}></Input>
                <Input placeholder={"Client Signature"}></Input>
                <Button primary={'true'}>Submit</Button>
            </div>
        </ConsultantBlock>
    )
}

export default Consultant;