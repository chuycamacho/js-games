"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var characterType_1 = require("../enums/characterType");
var ImageNames;
(function (ImageNames) {
    ImageNames.GROUND_IMAGE = "./images/world_ground.png";
    ImageNames.WALL_IMAGE = "./images/world_wall.png";
    ImageNames.GOAL_IMAGE = "./images/world_goal.png";
    ImageNames.DOOR_IMAGE = "./images/world_door.png";
    ImageNames.KEY_IMAGE = "./images/world_key.png";
    var WARRIOR_INITIAL_IMAGE = "./images/warrior/warrior_standing_east.png";
    var PRINCESS_INITIAL_IMAGE = "./images/princess/princess_standing_east.png";
    var WARRIOR_WALKING_EAST_IMAGES = [
        "./images/warrior/warrior_walk_east_001.png", "./images/warrior/warrior_walk_east_002.png", "./images/warrior/warrior_walk_east_003.png",
        "./images/warrior/warrior_walk_east_004.png", "./images/warrior/warrior_walk_east_005.png", "./images/warrior/warrior_walk_east_006.png",
        "./images/warrior/warrior_walk_east_007.png", "./images/warrior/warrior_walk_east_008.png"
    ];
    var WARRIOR_WALKING_WEST_IMAGES = [
        "./images/warrior/warrior_walk_west_001.png", "./images/warrior/warrior_walk_west_002.png", "./images/warrior/warrior_walk_west_003.png",
        "./images/warrior/warrior_walk_west_004.png", "./images/warrior/warrior_walk_west_005.png", "./images/warrior/warrior_walk_west_006.png",
        "./images/warrior/warrior_walk_west_007.png", "./images/warrior/warrior_walk_west_008.png"
    ];
    var WARRIOR_ATTACKING_EAST_IMAGES = [
        "./images/warrior/warrior_attack_east_001.png", "./images/warrior/warrior_attack_east_002.png", "./images/warrior/warrior_attack_east_003.png"
    ];
    var WARRIOR_ATTACKING_WEST_IMAGES = [
        "./images/warrior/warrior_attack_west_001.png", "./images/warrior/warrior_attack_west_002.png", "./images/warrior/warrior_attack_west_003.png"
    ];
    var PRINCESS_WALKING_EAST_IMAGES = [
        "./images/princess/princess_walk_east_001.png", "./images/princess/princess_walk_east_002.png", "./images/princess/princess_walk_east_003.png",
        "./images/princess/princess_walk_east_004.png", "./images/princess/princess_walk_east_005.png", "./images/princess/princess_walk_east_006.png",
        "./images/princess/princess_walk_east_007.png", "./images/princess/princess_walk_east_008.png"
    ];
    var PRINCESS_WALKING_WEST_IMAGES = [
        "./images/princess/princess_walk_west_001.png", "./images/princess/princess_walk_west_002.png", "./images/princess/princess_walk_west_003.png",
        "./images/princess/princess_walk_west_004.png", "./images/princess/princess_walk_west_005.png", "./images/princess/princess_walk_west_006.png",
        "./images/princess/princess_walk_west_007.png", "./images/princess/princess_walk_west_008.png"
    ];
    var PRINCESS_ATTACKING_EAST_IMAGES = [
        "./images/princess/princess_attack_east_001.png", "./images/princess/princess_attack_east_002.png", "./images/princess/princess_attack_east_003.png"
    ];
    var PRINCESS_ATTACKING_WEST_IMAGES = [
        "./images/princess/princess_attack_west_001.png", "./images/princess/princess_attack_west_002.png", "./images/princess/princess_attack_west_003.png"
    ];
    function characterInitialImageName(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return WARRIOR_INITIAL_IMAGE;
            case characterType_1.CharacterType.Princess:
                return PRINCESS_INITIAL_IMAGE;
            default:
                break;
        }
    }
    ImageNames.characterInitialImageName = characterInitialImageName;
    function characterWalkingEastImageNames(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return WARRIOR_WALKING_EAST_IMAGES;
            case characterType_1.CharacterType.Princess:
                return PRINCESS_WALKING_EAST_IMAGES;
            default:
                break;
        }
    }
    ImageNames.characterWalkingEastImageNames = characterWalkingEastImageNames;
    function characterWalkingWestImageNames(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return WARRIOR_WALKING_WEST_IMAGES;
            case characterType_1.CharacterType.Princess:
                return PRINCESS_WALKING_WEST_IMAGES;
            default:
                break;
        }
    }
    ImageNames.characterWalkingWestImageNames = characterWalkingWestImageNames;
    function characterAttackingEastImageNames(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return WARRIOR_ATTACKING_EAST_IMAGES;
            case characterType_1.CharacterType.Princess:
                return PRINCESS_ATTACKING_EAST_IMAGES;
            default:
                break;
        }
    }
    ImageNames.characterAttackingEastImageNames = characterAttackingEastImageNames;
    function characterAttackingWestImageNames(characterType) {
        switch (characterType) {
            case characterType_1.CharacterType.Warrior:
                return WARRIOR_ATTACKING_WEST_IMAGES;
            case characterType_1.CharacterType.Princess:
                return PRINCESS_ATTACKING_WEST_IMAGES;
            default:
                break;
        }
    }
    ImageNames.characterAttackingWestImageNames = characterAttackingWestImageNames;
})(ImageNames = exports.ImageNames || (exports.ImageNames = {}));
//# sourceMappingURL=imageNames.js.map