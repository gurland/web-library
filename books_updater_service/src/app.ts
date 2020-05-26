import { Observer } from './observer';

const bluebird = require("bluebird");
const dir = "upload";

let obs = new Observer();
let currentStep = obs.Observe(dir);

let interval = setInterval(checkCallback, Observer.timeout);

async function checkCallback () {
    clearInterval(interval);
    await currentStep;    
    currentStep = obs.Observe(dir);
    interval = setInterval(checkCallback, Observer.timeout);
}
