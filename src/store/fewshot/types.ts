import {Action} from "../Actions";
import {BaseModel} from "../../data/enums/BaseModel" 

export type FewshotState = {
    baseModel: BaseModel;
    datafile: String;
    datadir: String;
    datasplit: number;
    name: String;  
}

interface UpdateProperties {
    type: typeof Action.UPDATE_FS_PROPERTIES;
    payload: {
        props: Map<String,String>;
    }
}

export type FewshotActionTypes = UpdateProperties