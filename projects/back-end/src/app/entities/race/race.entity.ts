import { Race } from '@dnd-mapp/data';
import { OmitType } from '@nestjs/mapped-types';
import { Entity } from 'typeorm';
import { NameableEntity } from '../models';

@Entity('race')
export class RaceEntity extends NameableEntity implements Race {}

export class CreateRaceDto extends OmitType(RaceEntity, ['id'] as const) {}
