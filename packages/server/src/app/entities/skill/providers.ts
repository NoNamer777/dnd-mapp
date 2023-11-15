import { SKILL_SERVICE_TOKEN, SkillService } from './skill.service';

export const skillServiceProvider = {
    provide: SKILL_SERVICE_TOKEN,
    useExisting: SkillService,
};
