import {BaseModel} from "../../data/enums/BaseModel";
import { getBaseModelLabel } from "../../data/enums/BaseModel"; 
import { getBaseModelCfg } from "../../data/enums/BaseModel"; 
import {ExporterUtil} from "../../utils/ExporterUtil";
import { COCOExporter } from "./polygon/COCOExporter"; 
import {findLast} from "lodash";
import { store } from "../.."; 




export class FewshotExporter {
    public static export(): void {
        this.exportFSConfig()
        this.exportFSScript()

        const fsstate = store.getState().fs;

        console.log("serversave");
        console.log(fsstate.saveToServer);
        if (fsstate.saveToServer==true){
            var content = COCOExporter.exportString();
            this.postFile('datasets/tm2/${fsstate.name}.json',content);
        } 

        var dsname = fsstate.name
        COCOExporter.exportWithName(`${dsname}.json`);

    }

    private static exportFSConfig(): void {
        var content = '';

        const fsstate = store.getState().fs;

        const training_problem_name = getBaseModelLabel(fsstate.baseModel) + '_' + fsstate.name;
        
        content = content + '\n' + getBaseModelCfg(fsstate.baseModel);
        content = content + '\nname: ' + training_problem_name;
        content = content + '\nnovel: ';
        content = content + '\n  data: ' + fsstate.datafile;
        content = content + '\n  data_dir: ' + fsstate.datadir;
        content = content + '\n  data_split: ' + fsstate.datasplit;  

        const fileName: string = `${training_problem_name}.yaml`;

        if (fsstate.saveToServer==true){
            this.postFile('configs/custom_datasets/'+fileName,content);
        } 

        ExporterUtil.saveAs(content, fileName);
    }

    private static exportFSScript(): void {

        const fsstate = store.getState().fs;
        const training_problem_name = getBaseModelLabel(fsstate.baseModel) + '_' + fsstate.name;

        var content = `cd $FSDET_ROOT\npython train_few_shot.py --datasetconfig configs/custom_datasets/${training_problem_name}.yaml --ignoreunknown`;
    
        const fileName: string = `run_${training_problem_name}.sh`;

        if (fsstate.saveToServer==true){
            this.postFile(fileName,content);
        } 

        ExporterUtil.saveAs(content, fileName);
    } 

    private static async postFile(name: String, content: string){

        const baseUrl = "http://localhost:3010/store?name=";

        var myUrl = baseUrl + name;

        const response = await fetch(myUrl, {
            method: 'POST',
            body: content,
            headers: {'Content-Type': 'text/plain; charset=UTF-8'} });
          
          if (!response.ok) { console.log("POST of file failed") }
        

    } 


    
}