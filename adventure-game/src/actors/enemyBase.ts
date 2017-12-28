import { Enemy } from './enemy';
import { CharacterBase } from './characterBase';
import { CharacterType } from '../enums/characterType';
import { Point } from '../dtos/point';
import { Direction } from '../enums/direction';
import { EnvConstants } from '../constants/envConstants';

export class EnemyBase extends CharacterBase implements Enemy {

    private readonly anchorPoint: Point;
    private readonly sightRange: number;
    private readonly patrolRange: number;

    private isAwareOfPlayer: boolean;
    private isPatrolling: boolean;
    private lastKnownPlayerPosition: Point;

    constructor(type: CharacterType, initialPositionX: number, initialPositionY: number, 
        anchorPositionX: number, anchorPositionY: number, isPatrolling: boolean) {
        super("randomEnemy", type, initialPositionX, initialPositionY, EnvConstants.DEFAULT_ENEMY_SPEED);
        this.anchorPoint = new Point(anchorPositionX, anchorPositionY);
        this.isPatrolling = isPatrolling;
        

        this.isAwareOfPlayer = false;
        this.sightRange = EnvConstants.ENEMY_SIGHT_RANGE;
        this.patrolRange = EnvConstants.ENEMY_PATROL_RANGE;
        this.lastKnownPlayerPosition = new Point(0,0);
    }

    public signalPlayerPosition = (playerPosition: Point): void => {
        this.lastKnownPlayerPosition = playerPosition;
    };

    public stopAgainstSurface = (): void => {
        if (this.lastWalkingXDirection == Direction.East) {
            this.lastWalkingXDirection = Direction.West;
        } else if (this.lastWalkingXDirection == Direction.West) {
            this.lastWalkingXDirection = Direction.East;
        }
    };

    public move = (): void => {
        let distanceToPlayer = this.position.x - this.lastKnownPlayerPosition.x;
        let distanceToPlayerAbs = Math.abs(distanceToPlayer);

        this.isAwareOfPlayer = (distanceToPlayerAbs <= this.sightRange && 
            ((distanceToPlayer >= 0 && this.lastWalkingXDirection == Direction.West) || (distanceToPlayer < 0 && this.lastWalkingXDirection == Direction.East)));
        this.isAttacking = this.isAwareOfPlayer && (distanceToPlayerAbs <= EnvConstants.CHARACTER_ATTACK_RANGE.x);
        this.isWalking = !this.isAttacking;

        if (this.isAttacking) {
            return;
        }
        
        if (this.isAwareOfPlayer) {
            this.follow(distanceToPlayer);
        } else {
            this.patrol();
        }
    };

    private patrol = (): void => {
        // let returnToAnchor = Math.abs(this.position.x - this.anchorPoint.x) > this.patrolRange;

        let distanceToAnchor = this.position.x - this.anchorPoint.x;
        
        if (Math.abs(distanceToAnchor) <= this.patrolRange) {
            switch(this.lastWalkingXDirection) {
                case Direction.East:
                    this.position.x += this.speed;
                    break;
                case Direction.West:
                    this.position.x -= this.speed;
                    break;
            }
            return;
        }


        if (distanceToAnchor >= 0) {
            if (this.lastWalkingXDirection == Direction.East) {
                this.lastWalkingXDirection = Direction.West;
            }
            this.position.x -= this.speed;
        } else {
            if (this.lastWalkingXDirection == Direction.West) {
                this.lastWalkingXDirection = Direction.East;
            }
            this.position.x += this.speed;
        }


        // switch(this.lastWalkingXDirection) {
        //     case Direction.East:
        //         if (returnToAnchor) {
        //             this.lastWalkingXDirection = Direction.West;
        //             this.position.x -= this.speed;
        //         } else {
        //             this.position.x += this.speed;
        //         }
        //         break;
        //     case Direction.West:
        //         if (returnToAnchor) {
        //             this.lastWalkingXDirection = Direction.East;
        //             this.position.x += this.speed;
        //         } else {
        //             this.position.x -= this.speed;
        //         }
        //         break;
        // }
    }

    private follow = (distanceToPlayer: number): void => {
        if (distanceToPlayer > 0) {
            this.lastWalkingXDirection = Direction.West;
            this.position.x -= this.speed;
        } else {
            this.lastWalkingXDirection = Direction.East;
            this.position.x += this.speed;
        }
    }
}