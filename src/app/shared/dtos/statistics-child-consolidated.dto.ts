import { StatisticsChild } from './statistics-child.dto';
import { StatisticsChildMilestonesPending } from './statistics-child-milestones-pending.dto';
import { StatisticsChildObservationsDue } from './statistics-child-observations-due.dto';
import { StatisticsChildSeekingAdvice } from './statistics-child-seeking-advice.dto';

export class StatisticsChildConsolidated {
    statistics: StatisticsChild;
    milestones_pending: StatisticsChildMilestonesPending;
    observations_due: StatisticsChildObservationsDue;
    seeking_advice: StatisticsChildSeekingAdvice;
}
