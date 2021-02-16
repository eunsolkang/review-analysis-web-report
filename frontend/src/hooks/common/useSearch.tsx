import react, {useState} from 'react';
import moment from 'moment';

export default function useSearch( defaultOption : string) {    
    const [searchType, setSearchType] = useState(defaultOption);
    const [searchWord, setSearchWord] = useState('');
    const onChangeDrop = (e, {value, name} : any) : any =>{
        setSearchType(value)
    }
    const onChange = (e) =>{
        const {name, value} = e.target;
        setSearchWord(value)
    }

    const onResetSearch = () => {
        setSearchType(defaultOption);
        setSearchWord('');
    }
    return {
        onChangeDrop, searchType, onChange, searchWord, onResetSearch
    }
}