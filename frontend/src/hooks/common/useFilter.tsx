import react, {useState, useCallback} from 'react';
import moment from 'moment';

export default function useFilter() {    
    const [term, setTerm] = useState('all');
    const [country, setCountry] = useState('ko');
    const [date, setDate] = useState({
        start : 'all',
        end : 'all'
    });
    const selectTerm = (select, count ) => {
        setTerm(select + count);
        if(select === 'all'){
            setDate({
                start : 'all',
                end : 'all'
            }) 
            return;
        }
        setDate({
            start : moment().add(count, select).format('YYYY-MM-DD') ,
            end : moment().format('YYYY-MM-DD'),
        })
    }
    const onChangeDrop = (e, {value, name} : any) : any =>{
        setCountry(value);
    }

    const onFilterReset = useCallback(() => {
        setDate({
            start : 'all',
            end : 'all'
        });
        setTerm('all')
        setCountry('ko')
    }, []);

    const onChange = (e) => {
        const {name, value} = e.target;
        setDate({
            ...date,
            [name] : value
        });
        
    }

    return {
        selectTerm,setCountry,  term, date, onChangeDrop, country, onFilterReset, onChange
    }
}