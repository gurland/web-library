import { Observer } from './observer';
import { config } from "./config";

const dir = config.observerOptions.upload_dir;

let obs = new Observer();
let currentStep = obs.Observe(dir);

let timeout = setTimeout(checkCallback, Observer.timeout);

async function checkCallback () {
    clearTimeout(timeout);
    await currentStep;    
    currentStep = obs.Observe(dir);
    timeout = setTimeout(checkCallback, Observer.timeout);
}
