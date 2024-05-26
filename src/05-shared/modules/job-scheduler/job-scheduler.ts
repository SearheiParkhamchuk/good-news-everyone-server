import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class JobScheduler {
  constructor(private readonly scheduler_registry: SchedulerRegistry) {}

  createJob(
    crontime: string,
    name: string,
    onTick: () => Promise<void>,
    options: { runOnInit?: boolean } = {},
  ): CronJob {
    const job = new CronJob(crontime, onTick, null, true, null, null, options.runOnInit);
    this.scheduler_registry.addCronJob(name, job);
    return job;
  }

  deleteJob(name: string): void {
    this.scheduler_registry.deleteCronJob(name);
  }
}
