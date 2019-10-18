require('module-alias/register');

import Challenges from './challenges';


const CHALLENGE_VALUES = Object.values(Challenges)

CHALLENGE_VALUES.map((challenge: string) => {
    console.log(challenge);
    console.log('############################################');
});
