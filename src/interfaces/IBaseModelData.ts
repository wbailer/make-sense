import {BaseModel} from "../data/enums/BaseModel";

export interface IBaseModelData {
    type: BaseModel,
    label: string
   // classes_subset: [8, 10, 11, 13, 14, 15, 22, 23, 24, 25, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 65, 70, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 84, 85, 86, 87, 88, 89, 90], 

    //model: models/coco/faster_rcnn_R_101_FPN_base/model_final.pth
    //test: datasets/cocosplit/datasplit/5k.json
    //test_dir: coco/val2014
    //trainval: datasets/cocosplit/datasplit/trainvalno5k.json
    //trainval_dir: coco/train2014
}