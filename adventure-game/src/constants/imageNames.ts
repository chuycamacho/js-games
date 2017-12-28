import { CharacterType } from '../enums/characterType';

export module ImageNames {
    export const GROUND_IMAGE = "./images/world_ground.png";
    export const WALL_IMAGE = "./images/world_wall.png";
    export const GOAL_IMAGE = "./images/world_goal.png";
    export const DOOR_IMAGE = "./images/world_door.png";
    export const KEY_IMAGE = "./images/world_key.png";

    const WARRIOR_INITIAL_IMAGE = "./images/warrior/warrior_standing_east.png";
    const PRINCESS_INITIAL_IMAGE = "./images/princess/princess_standing_east.png";
    const BARBARIAN_INITIAL_IMAGE = "./images/barbarian/barbarian_standing_east.png";

    const WARRIOR_WALKING_EAST_IMAGES = [
        "./images/warrior/warrior_walk_east_001.png", "./images/warrior/warrior_walk_east_002.png", "./images/warrior/warrior_walk_east_003.png",
        "./images/warrior/warrior_walk_east_004.png", "./images/warrior/warrior_walk_east_005.png", "./images/warrior/warrior_walk_east_006.png",
        "./images/warrior/warrior_walk_east_007.png", "./images/warrior/warrior_walk_east_008.png"
    ];
    const WARRIOR_WALKING_WEST_IMAGES = [
        "./images/warrior/warrior_walk_west_001.png", "./images/warrior/warrior_walk_west_002.png", "./images/warrior/warrior_walk_west_003.png",
        "./images/warrior/warrior_walk_west_004.png", "./images/warrior/warrior_walk_west_005.png", "./images/warrior/warrior_walk_west_006.png",
        "./images/warrior/warrior_walk_west_007.png", "./images/warrior/warrior_walk_west_008.png"
    ];
    const WARRIOR_ATTACKING_EAST_IMAGES = [
        "./images/warrior/warrior_attack_east_001.png", "./images/warrior/warrior_attack_east_002.png", "./images/warrior/warrior_attack_east_003.png"
    ];
    const WARRIOR_ATTACKING_WEST_IMAGES = [
        "./images/warrior/warrior_attack_west_001.png", "./images/warrior/warrior_attack_west_002.png", "./images/warrior/warrior_attack_west_003.png"
    ];

    const PRINCESS_WALKING_EAST_IMAGES = [
        "./images/princess/princess_walk_east_001.png", "./images/princess/princess_walk_east_002.png", "./images/princess/princess_walk_east_003.png",
        "./images/princess/princess_walk_east_004.png", "./images/princess/princess_walk_east_005.png", "./images/princess/princess_walk_east_006.png",
        "./images/princess/princess_walk_east_007.png", "./images/princess/princess_walk_east_008.png"
    ];
    const PRINCESS_WALKING_WEST_IMAGES = [
        "./images/princess/princess_walk_west_001.png", "./images/princess/princess_walk_west_002.png", "./images/princess/princess_walk_west_003.png",
        "./images/princess/princess_walk_west_004.png", "./images/princess/princess_walk_west_005.png", "./images/princess/princess_walk_west_006.png",
        "./images/princess/princess_walk_west_007.png", "./images/princess/princess_walk_west_008.png"
    ];
    const PRINCESS_ATTACKING_EAST_IMAGES = [
        "./images/princess/princess_attack_east_001.png", "./images/princess/princess_attack_east_002.png", "./images/princess/princess_attack_east_003.png"
    ];
    const PRINCESS_ATTACKING_WEST_IMAGES = [
        "./images/princess/princess_attack_west_001.png", "./images/princess/princess_attack_west_002.png", "./images/princess/princess_attack_west_003.png"
    ];

    const BARBARIAN_WALKING_EAST_IMAGES = [
        "./images/barbarian/barbarian_walk_east_001.png", "./images/barbarian/barbarian_walk_east_002.png", "./images/barbarian/barbarian_walk_east_003.png",
        "./images/barbarian/barbarian_walk_east_004.png", "./images/barbarian/barbarian_walk_east_005.png", "./images/barbarian/barbarian_walk_east_006.png",
        "./images/barbarian/barbarian_walk_east_007.png", "./images/barbarian/barbarian_walk_east_008.png"
    ];
    const BARBARIAN_WALKING_WEST_IMAGES = [
        "./images/barbarian/barbarian_walk_west_001.png", "./images/barbarian/barbarian_walk_west_002.png", "./images/barbarian/barbarian_walk_west_003.png",
        "./images/barbarian/barbarian_walk_west_004.png", "./images/barbarian/barbarian_walk_west_005.png", "./images/barbarian/barbarian_walk_west_006.png",
        "./images/barbarian/barbarian_walk_west_007.png", "./images/barbarian/barbarian_walk_west_008.png"
    ];
    const BARBARIAN_ATTACKING_EAST_IMAGES = [
        "./images/barbarian/barbarian_attack_east_001.png", "./images/barbarian/barbarian_attack_east_002.png", "./images/barbarian/barbarian_attack_east_003.png"
    ];
    const BARBARIAN_ATTACKING_WEST_IMAGES = [
        "./images/barbarian/barbarian_attack_west_001.png", "./images/barbarian/barbarian_attack_west_002.png", "./images/barbarian/barbarian_attack_west_003.png"
    ];

    export function characterInitialImageName(characterType: CharacterType): string {
        switch (characterType) {
            case CharacterType.Warrior:
                return WARRIOR_INITIAL_IMAGE;
            case CharacterType.Princess:
                return PRINCESS_INITIAL_IMAGE;
            case CharacterType.Barbarian:
                return BARBARIAN_INITIAL_IMAGE;
            default:
                break;
        }
    }

    export function characterWalkingEastImageNames(characterType: CharacterType): string[] {
        switch (characterType) {
            case CharacterType.Warrior:
                return WARRIOR_WALKING_EAST_IMAGES;
            case CharacterType.Princess:
                return PRINCESS_WALKING_EAST_IMAGES;
            case CharacterType.Barbarian:
                return BARBARIAN_WALKING_EAST_IMAGES;
            default:
                break;
        }
    }

    export function characterWalkingWestImageNames(characterType: CharacterType): string[] {
        switch (characterType) {
            case CharacterType.Warrior:
                return WARRIOR_WALKING_WEST_IMAGES;
            case CharacterType.Princess:
                return PRINCESS_WALKING_WEST_IMAGES;
            case CharacterType.Barbarian:
                return BARBARIAN_WALKING_WEST_IMAGES;
            default:
                break;
        }
    }

    export function characterAttackingEastImageNames(characterType: CharacterType): string[] {
        switch (characterType) {
            case CharacterType.Warrior:
                return WARRIOR_ATTACKING_EAST_IMAGES;
            case CharacterType.Princess:
                return PRINCESS_ATTACKING_EAST_IMAGES;
            case CharacterType.Barbarian:
                return BARBARIAN_ATTACKING_EAST_IMAGES;
            default:
                break;
        }
    }

    export function characterAttackingWestImageNames(characterType: CharacterType): string[] {
        switch (characterType) {
            case CharacterType.Warrior:
                return WARRIOR_ATTACKING_WEST_IMAGES;
            case CharacterType.Princess:
                return PRINCESS_ATTACKING_WEST_IMAGES;
            case CharacterType.Barbarian:
                return BARBARIAN_ATTACKING_WEST_IMAGES;
            default:
                break;
        }
    }
}