const WARRIOR_INITIAL_IMAGE = "images/warrior/warrior_standing_east.png";
const PRINCESS_INITIAL_IMAGE = "images/princess/princess_standing_east.png";

const WARRIOR_WALKING_EAST_IMAGES = [
    "images/warrior/warrior_walk_east_001.png", "images/warrior/warrior_walk_east_002.png", "images/warrior/warrior_walk_east_003.png", 
    "images/warrior/warrior_walk_east_004.png", "images/warrior/warrior_walk_east_005.png", "images/warrior/warrior_walk_east_006.png", 
    "images/warrior/warrior_walk_east_007.png", "images/warrior/warrior_walk_east_008.png"
];
const WARRIOR_WALKING_WEST_IMAGES = [
    "images/warrior/warrior_walk_west_001.png", "images/warrior/warrior_walk_west_002.png", "images/warrior/warrior_walk_west_003.png", 
    "images/warrior/warrior_walk_west_004.png", "images/warrior/warrior_walk_west_005.png", "images/warrior/warrior_walk_west_006.png", 
    "images/warrior/warrior_walk_west_007.png", "images/warrior/warrior_walk_west_008.png"
];
const PRINCESS_WALKING_EAST_IMAGES = [
    "images/princess/princess_walk_east_001.png", "images/princess/princess_walk_east_002.png", "images/princess/princess_walk_east_003.png", 
    "images/princess/princess_walk_east_004.png", "images/princess/princess_walk_east_005.png", "images/princess/princess_walk_east_006.png", 
    "images/princess/princess_walk_east_007.png", "images/princess/princess_walk_east_008.png"
];
const PRINCESS_WALKING_WEST_IMAGES = [
    "images/princess/princess_walk_west_001.png", "images/princess/princess_walk_west_002.png", "images/princess/princess_walk_west_003.png", 
    "images/princess/princess_walk_west_004.png", "images/princess/princess_walk_west_005.png", "images/princess/princess_walk_west_006.png", 
    "images/princess/princess_walk_west_007.png", "images/princess/princess_walk_west_008.png"
];
const GROUND_IMAGE = "images/world_ground.png";
const WALL_IMAGE = "images/world_wall.png";
const GOAL_IMAGE = "images/world_goal.png";
const DOOR_IMAGE = "images/world_door.png";
const KEY_IMAGE = "images/world_key.png";

function characterInitialImageName(characterType) {
    switch (characterType) {
        case WARRIOR_TYPE:
            return WARRIOR_INITIAL_IMAGE;
        case PRINCESS_TYPE:
            return PRINCESS_INITIAL_IMAGE;
        default:
            break;
    }
}

function characterWalkingEastImageNames(characterType) {
    switch (characterType) {
        case WARRIOR_TYPE:
            return WARRIOR_WALKING_EAST_IMAGES;
        case PRINCESS_TYPE:
            return PRINCESS_WALKING_EAST_IMAGES;
        default:
            break;
    }
}

function characterWalkingWestImageNames(characterType) {
    switch (characterType) {
        case WARRIOR_TYPE:
            return WARRIOR_WALKING_WEST_IMAGES;
        case PRINCESS_TYPE:
            return PRINCESS_WALKING_WEST_IMAGES;
        default:
            break;
    }
}
