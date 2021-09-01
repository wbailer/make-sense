import {store} from "../..";
import {find} from "lodash";
import {BaseModel} from "../../data/enums/BaseModel";

export class FewshotSelector {
    public static getProperties(): Map<String,String> {
        var props = new Map<String,String>();
        var fsstate = store.getState().fs;
        props['basetype'] = fsstate.baseModel; 
        props['dir'] = fsstate.datadir;
        props['file'] = fsstate.datafile;
        props['split'] = fsstate.datasplit; 
        props['name'] = fsstate.name; 
        return props;
    }

}