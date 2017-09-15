import { CharacterBase} from './characterBase';
import { CharacterType } from '../enums/characterType';
import { CharacterControl } from './characterControl';

export class PlayerPrincess extends CharacterBase {
    constructor(name: string) {
        let control = new CharacterControl();
        super(name, CharacterType.Princess, undefined, control);
    }
}