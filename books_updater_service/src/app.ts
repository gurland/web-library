import { Observer } from './observer';

const bluebird = require("bluebird");
const dir = "upload";

let obs = new Observer();
let currentStep = obs.Observe(dir);

let timeout = setTimeout(checkCallback, Observer.timeout);

async function checkCallback () {
    clearTimeout(timeout);
    await currentStep;    
    currentStep = obs.Observe(dir);
    timeout = setTimeout(checkCallback, Observer.timeout);
}
