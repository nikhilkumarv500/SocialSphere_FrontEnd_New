import { useDispatch } from 'react-redux';
import { updateInnerGlodalStore, updateToastState ,silenceToastMsg} from './GlobalReducers';

export const useUpdateStore = () => {
    const dispatch = useDispatch();
    const setGlobalStore = (data) => {
        dispatch(updateInnerGlodalStore(data));
    };
    const setToastState = async (data) => {
        dispatch(updateToastState(data));
        await setTimeout(()=>{},100)
        dispatch(silenceToastMsg());
    }
    return {setGlobalStore,setToastState};
};

export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

