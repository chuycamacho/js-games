import { PlayerBase} from './playerBase';
import { CharacterType } from '../enums/characterType';
import { CharacterControl } from './characterControl';

export class PlayerPrincess extends PlayerBase {
    constructor(name: string, mainPlayer: boolean) {
        let control = new CharacterControl(mainPlayer);
        super(name, CharacterType.Princess, control);
    }
}