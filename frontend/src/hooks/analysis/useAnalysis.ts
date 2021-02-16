import react, {useState, useCallback, useEffect} from 'react';
import moment from 'moment';
import { useRouter } from '../common/useRouter';

export default function useAnalysis() {    
    const router = useRouter();

    const onSubmit = ({radio, content, country, date, type}) => {

    }

    const onSubmitCountry = ({radio, content, date, type}) =>{

    }
    const onSubmitAge = ({date, type, content}) =>{

    }
    const onResetChart = () =>{

    }
    useEffect(()=>{
        if ( sessionStorage.getItem('logged') !== "로그인"){
            router.history.push('/login');
        }
    },[]);
    useEffect(()=>{

    }, []);

    return {
        onSubmit, onSubmitCountry, onSubmitAge, onResetChart
    }
}