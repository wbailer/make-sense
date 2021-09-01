export enum BaseModel {
    COCO60 = "COCO60",
    COCO80 = "COCO80"
}

export function getBaseModel(modelType: String){
    if (modelType==='COCO60') return BaseModel.COCO60;
    if (modelType==='COCO80') return BaseModel.COCO80;
    else return BaseModel.COCO60;
} 

export function getBaseModelLabel(modelType: BaseModel){
    if (modelType==BaseModel.COCO60) return 'COCO60';
    if (modelType==BaseModel.COCO80) return 'COCO80';
    else return 'COCO60';
} 