import React, { useState } from 'react'
import './FewShotProjectProperties.scss'
import { GenericYesNoPopup } from "../GenericYesNoPopup/GenericYesNoPopup";
import { PopupWindowType } from "../../../data/enums/PopupWindowType";
import { updateProperties } from "../../../store/labels/actionCreators";
import { updateActivePopupType } from "../../../store/general/actionCreators";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import Scrollbars from 'react-custom-scrollbars';
import TextInput from "../../Common/TextInput/TextInput";
import { ImageButton } from "../../Common/ImageButton/ImageButton";
import uuidv4 from 'uuid/v4';
import { LabelName } from "../../../store/labels/types";
import { LabelUtil } from "../../../utils/LabelUtil";
import { LabelsSelector } from "../../../store/selectors/LabelsSelector";
import { LabelActions } from "../../../logic/actions/LabelActions";
import { ProjectType } from "../../../data/enums/ProjectType";
import {IBaseModelData} from "../../../interfaces/IBaseModelData";
import {BaseModel} from "../../../data/enums/BaseModel";
import {BaseModelData} from "../../../data/BaseModelData";
import {BaseModelDataMap} from "../../../data/BaseModelData";

interface IProps {
    projectType: ProjectType;
    updateActivePopupType: (activePopupType: PopupWindowType) => any;
    updateProperties: (properties: LabelName[]) => any;
    isUpdate: boolean;
}

const FewShotProjectProperties: React.FC<IProps> = (
    {
        projectType,
        updateActivePopupType,
        updateProperties,
        isUpdate
    }) => {
    const initialLabels = LabelUtil.convertLabelNamesListToMap(LabelsSelector.getLabelNames());
    const [labelNames, setLabelNames] = useState(initialLabels);
    const [baseModel, setBaseModel] = useState(null);

    const addHandle = () => {
        const newLabelNames = { ...labelNames, [uuidv4()]: "" };
        setLabelNames(newLabelNames);
    };

    const deleteHandle = (key: string) => {
        const newLabelNames = { ...labelNames };
        delete newLabelNames[key];
        setLabelNames(newLabelNames);
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addHandle();
        }
    }

    const labelInputs = Object.keys(labelNames).map((key: string) => {
        return <div className="LabelEntry" key={key}>
            <TextInput
                key={key}
                value={labelNames[key]}
                isPassword={false}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(key, event.target.value)}
                label={"Insert label"}
                onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(event)}
            />
            <ImageButton
                image={"ico/trash.png"}
                imageAlt={"remove_label"}
                buttonSize={{ width: 30, height: 30 }}
                onClick={() => deleteHandle(key)}
            />
        </div>
    });

    const onChange = (key: string, value: string) => {
        const newLabelNames = { ...labelNames, [key]: value };
        setLabelNames(newLabelNames);
    };

    const onCreateAccept = () => {
        const labelNamesList: string[] = extractLabelNamesList();
        if (labelNamesList.length > 0) {
            updateProperties(LabelUtil.convertMapToLabelNamesList(labelNames));
        }
        updateActivePopupType(PopupWindowType.INSERT_LABEL_NAMES);
    };

    const onUpdateAccept = () => {
        const labelNamesList: string[] = extractLabelNamesList();
        const updatedLabelNamesList: LabelName[] = LabelUtil.convertMapToLabelNamesList(labelNames);
        const missingIds: string[] = LabelUtil.labelNamesIdsDiff(LabelsSelector.getLabelNames(), updatedLabelNamesList);
        LabelActions.removeLabelNames(missingIds);
        if (labelNamesList.length > 0) {
            updateProperties(LabelUtil.convertMapToLabelNamesList(labelNames));
            updateActivePopupType(null);
        }
    };

    const onCreateReject = () => {
        updateActivePopupType(null);
    };

    const onUpdateReject = () => {
        updateActivePopupType(null);
    };


    const extractLabelNamesList = (): string[] => {
        return Object.values(labelNames).filter((value => !!value)) as string[];
    };

    const onSelect = (baseModel: BaseModel) => {
        setBaseModel(baseModel);
    };

    const getOptions = (baseModelType: IBaseModelData[]) => {
        return baseModelType.map((entry: IBaseModelData) => {
            return <div
                className="OptionsItem"
                onClick={() => onSelect(entry.type)}
                key={entry.type}
            >
                {entry.type === baseModel ?
                    <img
                        draggable={false}
                        src={"ico/checkbox-checked.png"}
                        alt={"checked"}

                    /> :
                    <img
                        draggable={false}
                        src={"ico/checkbox-unchecked.png"}
                        alt={"unchecked"}

                    />}
                {entry.label}
            </div>
        })
    };

    const renderContent = () => {
        return (<div className="FewShotProjectProperties">
            <div className="RightContainer">
                <div className="Message">
                    {
                        "Set properties of few shot learning project"
                    }
                </div>
                <Scrollbars>
                <div className="FewShotProjectPropertiesContent">
                                               

                        <div className="Message">
                        {
                           "Type of the base model (i.e. already trained classes):"
                        }
                        </div>

                        
                            <div className="Options">
                               {getOptions(BaseModelData['COCO60'])}
                            </div>
               
                        <div className="Message">
                        {
                           "Data for the novel classes to be trained:"
                        }
                        </div>
                        <TextInput
                            key='dsname'
                            value={'mydataset'}
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('dsname', event.target.value)}
                            label={"Dataset name"}
                            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(event)}
                        />
                        <TextInput
                            key='dsname'
                            value={'datasets/mydataset/train.json'}
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('dsname', event.target.value)}
                            label={"Dataset annotation file"}
                            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(event)}
                        />
                        <TextInput
                            key='dsname'
                            value={'datasets/mydataset/images'}
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('dsname', event.target.value)}
                            label={"Dataset image directory"}
                            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(event)}
                        />
                        <TextInput
                            key='dsname'
                            value={'0.7'}
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('dsname', event.target.value)}
                            label={"Share of data to be used for training"}
                            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(event)}
                        />
                        </div>
                    </Scrollbars> 
                        

               
            </div>
        </div>);
    };

    return (
        <GenericYesNoPopup
            title={isUpdate ? "Update few shot properties" : "Set few shot properties"}
            renderContent={renderContent}
            acceptLabel={isUpdate ? "Accept" : "Continue"}
            onAccept={isUpdate ? onUpdateAccept : onCreateAccept}
            rejectLabel={isUpdate ? "Cancel" : "Cancel"}
            onReject={isUpdate ? onUpdateReject : onCreateReject}
        />)
};

const mapDispatchToProps = {
    updateActivePopupType,
    updateProperties
};

const mapStateToProps = (state: AppState) => ({
    projectType: state.general.projectData.type
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FewShotProjectProperties);
