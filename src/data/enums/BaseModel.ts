export enum BaseModel {
    COCO60 = "COCO60",
    COCO80 = "COCO80"
}

export function getBaseModel(modelType: String){
    if (modelType==='COCO60') return BaseModel.COCO60;
    if (modelType==='COCO80') return BaseModel.COCO80;
    else return BaseModel.COCO60;
} 