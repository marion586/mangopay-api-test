const cron = require('node-cron');

// Example of a cron job that runs every minute
const exampleCronJob = cron.schedule('* * * * *', () => {
  console.log('Running a task every minute', new Date().getTime());
  // Add your task logic here, such as cleaning up old data, sending emails, etc.
}, {
  scheduled: true,  // start the job automatically when the app runs
  timezone: "UTC"   // Set timezone if needed, for example, "America/New_York"
});

// A cron job that runs daily at midnight
const dailyCronJob = cron.schedule('0 0 * * *', () => {
  console.log('Running daily cleanup task');
  // Add your daily task logic here
}, {
  scheduled: true,
  timezone: "UTC"
});

// A cron job that runs every Sunday at 6 AM
const weeklyCronJob = cron.schedule('0 6 * * 0', () => {
  console.log('Running weekly task');
  // Add your weekly task logic here
}, {
  scheduled: true,
  timezone: "UTC"
});

// Add more cron jobs as needed

// Expose the jobs to start them elsewhere in the app
module.exports = { exampleCronJob, dailyCronJob, weeklyCronJob };
