import {Action} from "../Actions";
import { FewshotState  } from "./types"; 

export function updateProperties(props: Map<String,String>) {
    return {
        type: Action.UPDATE_FS_PROPERTIES,
        payload: {
            props,
        }
    }
}
