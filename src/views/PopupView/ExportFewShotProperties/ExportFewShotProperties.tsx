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

interface IProps {
    projectType: ProjectType;
    updateActivePopupType: (activePopupType: PopupWindowType) => any;
}

const ExportFewShotProperties: React.FC<IProps> = (
    {
        projectType,
        updateActivePopupType,
    }) => {
        const initialProps = FewshotSelector.getProperties();
        const [properties, setProperties] = useState<Map<String,String>>(initialProps);


    const onAccept = () => {
        FewshotExporter.export();
        updateActivePopupType(null);
    };


    const onReject = () => {
        updateActivePopupType(null);
    };


    const renderContent = () => {
        return (<div className="FewShotProjectProperties">
            <div className="RightContainer">
                <div className="FewShotProjectPropertiesContent">
                                               

                        <div className="Message">
                        {
                           "When clicking continue, you will download three files:"
                        }
                        </div>

                        <div className="Message">
                        {
                           `1. COCO annotation JSON file, store under datasets/${properties['name']}/${properties['name']}.json`
                        }
                        </div>

                        <div className="Message">
                        {
                           "2. Training configuration YAML file store under config/custom_datasets"
                        }
                        </div>

                        <div className="Message">
                        {
                           "3. Training script, which assumes the Few Shot Detection code to be installed at $FSDET_ROOT. Either set this enviroment variable, or set the path locally in the downloaded script."
                        }
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
    updateActivePopupType,
};

const mapStateToProps = (state: AppState) => ({
    projectType: state.general.projectData.type
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExportFewShotProperties);
