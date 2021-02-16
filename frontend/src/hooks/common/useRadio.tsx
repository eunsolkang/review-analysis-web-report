import react, {useState} from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

export default function useRadio() {    
    const [radio, setRadio] = useState( { 
        agree : '' as any,
        ageGroup : '' as any,
        shape : '' as any,
        isFunctional : '' as any,
        isShow : '' as any,
        gender : '전체' as any
    } );
    const onChangeRadio = (name, select) : any => {
        setRadio({
            ...radio,
            [name] : select
        })
        
    }

    const onChangeInput = (name, select)=>{
        setRadio({
            ...radio,
            [name] : select
        })
    }

    const onResetRadio = () =>{
        setRadio({ 
            agree : '' as any,
            ageGroup : '' as any,
            shape : '' as any,
            isFunctional : '' as any,
            isShow : '' as any,
            gender : '전체' as any
        });
    }
    return {
        onChangeRadio, radio, onChangeInput, setRadio, onResetRadio
    }
}