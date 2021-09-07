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

export function getBaseModelCfg(modelType: BaseModel){
    if (modelType==BaseModel.COCO60) return `base:
  classes_subset:
  - 8
  - 10
  - 11
  - 13
  - 14
  - 15
  - 22
  - 23
  - 24
  - 25
  - 27
  - 28
  - 31
  - 32
  - 33
  - 34
  - 35
  - 36
  - 37
  - 38
  - 39
  - 40
  - 41
  - 42
  - 43
  - 46
  - 47
  - 48
  - 49
  - 50
  - 51
  - 52
  - 53
  - 54
  - 55
  - 56
  - 57
  - 58
  - 59
  - 60
  - 61
  - 65
  - 70
  - 73
  - 74
  - 75
  - 76
  - 77
  - 78
  - 79
  - 80
  - 81
  - 82
  - 84
  - 85
  - 86
  - 87
  - 88
  - 89
  - 90
  model: models/coco/faster_rcnn_R_101_FPN_base/model_final.pth
  test: datasets/cocosplit/datasplit/5k.json
  test_dir: coco/val2014
  trainval: datasets/cocosplit/datasplit/trainvalno5k.json
  trainval_dir: coco/train2014
idoffset: 1000
`; 
    else if (modelType==BaseModel.COCO80) return `base:
  model: models/coco/faster_rcnn_R_101_FPN_base/model_final.pth
  test: datasets/cocosplit/datasplit/5k.json
  test_dir: coco/val2014
  trainval: datasets/cocosplit/datasplit/trainvalno5k.json
  trainval_dir: coco/train2014
idoffset: 1000
`; 
    return '';
} 