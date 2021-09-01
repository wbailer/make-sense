import {BaseModel} from "./enums/BaseModel";
import { IBaseModelData } from "../interfaces/IBaseModelData";

export type BaseModelDataMap = { [s in BaseModel]: IBaseModelData[]; };

export const BaseModelData: BaseModelDataMap = {
    'COCO60':
     [ 
        {
            type: BaseModel.COCO60,
            label: "Model trained on 60 COCO classes",
        }
    ] ,
    'COCO80':
    [ 
       {
           type: BaseModel.COCO80,
           label: "Model trained on 80 COCO classes",
       }
   ] ,  
}