import react, {useState} from 'react';
import moment from 'moment';

export default function useCheck() {    
    const [check, setCheck] = useState("");
    const selectCheck = (name : string)  => {
        setCheck(name);
    }
    return {
        selectCheck, check
    }
}