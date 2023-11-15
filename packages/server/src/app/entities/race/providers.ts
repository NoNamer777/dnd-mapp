import { RACE_SERVICE_TOKEN, RaceService } from './race.service';

export const raceServiceProvider = {
    provide: RACE_SERVICE_TOKEN,
    useExisting: RaceService,
};
