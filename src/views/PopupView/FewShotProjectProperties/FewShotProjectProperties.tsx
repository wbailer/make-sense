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
import { FewshotSelector } from "../../../store/selectors/FewshotSelector";
import { ProjectType } from "../../../data/enums/ProjectType";
import {IBaseModelData} from "../../../interfaces/IBaseModelData";
import {BaseModel} from "../../../data/enums/BaseModel";
import {getBaseModel} from "../../../data/enums/BaseModel";
import {getBaseModelLabel} from "../../../data/enums/BaseModel";
import {BaseModelData} from "../../../data/BaseModelData";

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
    const [properties, setProperties] = useState<Map<String,String>>(initialProps);
   

    const onChange = (key: string, value: string) => {
        const newProperties = { ...properties, [key]: value };
        setProperties(newProperties);
    };

    const onCreateAccept = () => {
        updateProperties(properties);
        updateActivePopupType(PopupWindowType.INSERT_LABEL_NAMES);
    };

    const onUpdateAccept = () => {

        updateProperties(properties);
        updateActivePopupType(null);
    };

    const onCreateReject = () => {
        updateActivePopupType(null);
    };

    const onUpdateReject = () => {
        updateActivePopupType(null);
    };


    const onSelect = (baseModel: BaseModel) => {
        const newProperties = { ...properties, ['basetype']: getBaseModelLabel(baseModel) };
        setProperties(newProperties);
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
                        <TextInput
                            key='dsname'
                            value={properties['name'] } 
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('name', event.target.value)}
                            label={"Dataset name"}
                        />

                        <TextInput
                            key='dsfile'
                            value={properties['file'] } 
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('file', event.target.value)}
                            label={"Dataset annotation file"}
                        />
                        <TextInput
                            key='dsdir'
                            value={properties['dir'] } 
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('dir', event.target.value)}
                            label={"Dataset image directory (absolute or relative to datasets/)"}
                        />
                        <TextInput
                            key='dsplit'
                            value={properties['split'] } 
                            isPassword={false}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange('split', event.target.value)}
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
