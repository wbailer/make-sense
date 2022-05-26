import {FewshotActionTypes, FewshotState} from "./types";
import {Action} from "../Actions";
import { BaseModel } from "../../data/enums/BaseModel";
import { getBaseModel } from "../../data/enums/BaseModel";

const initialState: FewshotState = {
    baseModel: BaseModel.COCO60,
    datafile: "datasets/mydataset/mydataset.json",
    datadir: "mydataset/images",
    datasplit: 0.7,
    name: "mydataset",
    saveToServer: false,
};

export function fewshotReducer(
    state = initialState,
    action: FewshotActionTypes
): FewshotState {
    switch (action.type) {
        case Action.UPDATE_FS_PROPERTIES: {
            return {
                ...state,
                name: action.payload.props['name'],
                datafile: action.payload.props['file'],
                datadir: action.payload.props['dir'],
                datasplit: action.payload.props['split'],
                baseModel: getBaseModel(action.payload.props['basetype']),
                saveToServer: action.payload.props['saveToServer'] 
            }
        }
  
        default:
            return state;
    }
}

