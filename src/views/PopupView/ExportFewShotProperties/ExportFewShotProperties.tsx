import React, { useState } from 'react'
import './ExportFewShotProperties.scss'
import { GenericYesNoPopup } from "../GenericYesNoPopup/GenericYesNoPopup";
import { PopupWindowType } from "../../../data/enums/PopupWindowType";
import { updateActivePopupType } from "../../../store/general/actionCreators";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import { FewshotSelector } from "../../../store/selectors/FewshotSelector";
import { ProjectType } from "../../../data/enums/ProjectType";
import {IBaseModelData} from "../../../interfaces/IBaseModelData";
import {BaseModel} from "../../../data/enums/BaseModel";
import {getBaseModel} from "../../../data/enums/BaseModel";
import {getBaseModelLabel} from "../../../data/enums/BaseModel";
import {BaseModelData} from "../../../data/BaseModelData";
import {FewshotExporter} from "../../../logic/export/FewshotExport"  
import { updateProperties } from "../../../store/fewshot/actionCreators";

interface IProps {
    projectType: ProjectType;
    updateActivePopupType: (activePopupType: PopupWindowType) => any;
    updateProperties: (properties: Map<String,String>) => any;
 
}

const ExportFewShotProperties: React.FC<IProps> = (
    {
        projectType,
        updateActivePopupType,
        updateProperties,
    }) => {
        const initialProps = FewshotSelector.getProperties();
        const [properties, setProperties] = useState<Map<String,String>>(initialProps);


    const onAccept = () => {
        updateProperties(properties);
        FewshotExporter.export();
        updateActivePopupType(null);
    };


    const onReject = () => {
        updateActivePopupType(null);
    };

    const onSelect = (saveToServer: boolean) => {

        if (saveToServer==undefined) saveToServer = true;
        else saveToServer = !saveToServer;
        const newProperties = { ...properties, ['saveToServer']: saveToServer };
        setProperties(newProperties);
    };

    const getOptions = (saveToServer: boolean) => {
            return <div
                className="OptionsItem"
                onClick={() => onSelect(saveToServer)}
            >
                {saveToServer == true ?
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
               {"Save to server"}
            </div>
        
    };

    const renderContent = () => {
        return (<div className="FewShotProjectProperties">
            <div className="RightContainer">
                <div className="FewShotProjectPropertiesContent">
                                               

                        <div className="Message">
                        {
                           "When clicking continue, you will download three files (optionally save to server):\n"+

                           "1. COCO annotation JSON file, store under datasets/${properties['name']}/${properties['name']}.json\n"+

                           "2. Training configuration YAML file store under config/custom_datasets\n"+

                           "3. Training script, which assumes the Few Shot Detection code to be installed at $FSDET_ROOT. Either set this enviroment variable, or set the path locally in the downloaded script.\n"
                        }
                        </div>
                        <div className="Options">
                            {getOptions(properties['saveToServer'])}
                        </div>
                       
                    </div>
                        

               
            </div>
        </div>);
    };

    return (
        <GenericYesNoPopup
            title={ "Export few shot properties" }
            renderContent={renderContent}
            acceptLabel={ "Continue"}
            onAccept={ onAccept }
            rejectLabel={"Cancel"}
            onReject={onReject }
        />)
};

const mapDispatchToProps = {
    updateProperties,
    updateActivePopupType

};

const mapStateToProps = (state: AppState) => ({
    projectType: state.general.projectData.type
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExportFewShotProperties);
