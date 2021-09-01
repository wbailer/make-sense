import React, { useState } from 'react'
import './FewShotProjectProperties.scss'
import { GenericYesNoPopup } from "../GenericYesNoPopup/GenericYesNoPopup";
import { PopupWindowType } from "../../../data/enums/PopupWindowType";
import { updateProperties } from "../../../store/fewshot/actionCreators";
import { updateActivePopupType } from "../../../store/general/actionCreators";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import Scrollbars from 'react-custom-scrollbars';
import TextInput from "../../Common/TextInput/TextInput";
import { ImageButton } from "../../Common/ImageButton/ImageButton";
import uuidv4 from 'uuid/v4';
import { LabelName } from "../../../store/labels/types";
import { LabelUtil } from "../../../utils/LabelUtil";
import { FewshotSelector } from "../../../store/selectors/FewshotSelector";
import { LabelActions } from "../../../logic/actions/LabelActions";
import { ProjectType } from "../../../data/enums/ProjectType";
import {IBaseModelData} from "../../../interfaces/IBaseModelData";
import {BaseModel} from "../../../data/enums/BaseModel";
import {getBaseModel} from "../../../data/enums/BaseModel";
import {getBaseModelLabel} from "../../../data/enums/BaseModel";
import {BaseModelData} from "../../../data/BaseModelData";
import {BaseModelDataMap} from "../../../data/BaseModelData";

interface IProps {
    projectType: ProjectType;
    updateActivePopupType: (activePopupType: PopupWindowType) => any;
    updateProperties: (properties: Map<String,String>) => any;
    isUpdate: boolean;
}

const FewShotProjectProperties: React.FC<IProps> = (
    {
        projectType,
        updateActivePopupType,
        updateProperties,
        isUpdate
    }) => {
    const initialProps = FewshotSelector.getProperties();
    const [properties, setProperties] = useState(initialProps);


    const onChange = (key: string, value: string) => {
        const newProperties = properties;
        properties[key]=value; 
        setProperties(newProperties);
    };

    const onCreateAccept = () => {
        updateProperties(properties);
        updateActivePopupType(PopupWindowType.FEW_SHOT_PROPERTIES);
    };

    const onUpdateAccept = () => {

        updateProperties(properties);
    };

    const onCreateReject = () => {
        updateActivePopupType(null);
    };

    const onUpdateReject = () => {
        updateActivePopupType(null);
    };



    const onSelect = (baseModel: BaseModel) => {
        properties['basetype'] = getBaseModelLabel(baseModel);
    };

    const getOptions = (baseModelType: IBaseModelData[]) => {
        return baseModelType.map((entry: IBaseModelData) => {
            return <div
                className="OptionsItem"
                onClick={() => onSelect(entry.type)}
                key={entry.type}
            >
                {entry.type === getBaseModel(properties['basetype']) ?
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
                               {getOptions(BaseModelData['COCO80'])}
                            </div>
               
                        <div className="Message">
                        {
                           "Data for the novel classes to be trained:"
                        }
                        </div>
                        <div className="LabelEntry" key='dsname'>
                            <TextInput
                                key='dsname'
                                value={'mydataset'}
                                isPassword={false}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('dsname', event.target.value)}
                                label={"Dataset name"}
                            />
                        </div>
                        <TextInput
                            key='dsname1'
                            value={'datasets/mydataset/train.json'}
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('dsname1', event.target.value)}
                            label={"Dataset annotation file"}
                        />
                        <TextInput
                            key='dsname2'
                            value={'datasets/mydataset/images'}
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('dsname2', event.target.value)}
                            label={"Dataset image directory"}
                        />
                        <TextInput
                            key='dsname3'
                            value={'0.7'}
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('dsname3', event.target.value)}
                            label={"Share of data to be used for training"}
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
