# Annotation and configuration for few-shot object detection

This is a fork of [makesense.ai](https://github.com/SkalskiP/make-sense), with modifications to facilitate few-shot object detection with own datasets. The original make-sense readme with installation instructions can be found [here](README_make-sense.md).

This version supports setting up a few-shot training task using [our version](https://github.com/wbailer/few-shot-object-detection) of the Frustratingly Simple Few-Shot Object framework by Wang et al. This framework needs to be installed to run the training. The generated scripts use a variable ```FSDET_HOME``` to refer to the root directory of the framework installation.

- When starting the application, a dialog with few-shot training properties pops up. This dialog can later also be accessed via the application menu. The following properties can be set:
    - the name of the new dataset (the few-shot training problem will then use ```<basemodel>_<new dataset>``` for the names of configuration files
    - the base model (COCO60 is the one that can be obtained from the the [FsDet model zoo](https://github.com/ucbdrive/few-shot-object-detection/blob/master/docs/MODEL_ZOO.md))
    - the name of the annotation file for the new dataset (relative to ```FSDET_HOME```)
    - the image directory (relative to the ```datasets/``` directory of the framework)
- The labels defined will be those used as novel classes.
- Use polygon annotations.
- The exporter will provide three files: the annotations in COCO format, the training configuration in YAML format and the script for running the training. The export dialog provides information where to put these files.
- To run the training, make the downloaded script exectuable using ```chmod +x <filename>```.
