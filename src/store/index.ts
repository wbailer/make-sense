import { combineReducers } from 'redux';
import {labelsReducer} from "./labels/reducer";
import {generalReducer} from "./general/reducer";
import {aiReducer} from "./ai/reducer";
import {fewshotReducer} from "./fewshot/reducer";

export const rootReducer = combineReducers({
    general: generalReducer,
    labels: labelsReducer,
    ai: aiReducer,
    fs: fewshotReducer
});

export type AppState = ReturnType<typeof rootReducer>;