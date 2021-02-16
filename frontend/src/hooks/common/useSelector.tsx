import react, {useState} from 'react';
import moment from 'moment';

export default function useSelector() {
    const [content, setContent] = useState<any>([{name : '전체', value : 'all'}]);
    const selectContent = (data : any)  => {
        console.log(data);
        
        if (content.find(e => e.name === data.name)){
            
            setContent(content.filter(a => a.name !== data.name))
        }
        else{
            setContent([...content, data]);
        }
    }
    const onResetSelector = () =>{
        setContent([{name : '전체', value : 'all'}]);
    }
    return {
        selectContent, content, onResetSelector
    }
}