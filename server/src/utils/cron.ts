import cron from "node-cron";
import Reminder from "../models/Reminder";

/**
 * Placeholder cron job for reminder notifications
 * This runs every day at 8:00 AM to check which reminders should be sent
 *
 * In production, this would:
 * 1. Find all reminders matching today's day of week
 * 2. Send email/push notifications to users
 * 3. Log successful notifications
 */
export const startReminderCron = () => {
  // Run every day at 8:00 AM
  cron.schedule("0 8 * * *", async () => {
    try {
      const today = new Date().getDay(); // 0-6 (Sunday to Saturday)

      console.log(`Checking reminders for day ${today} (${getDayName(today)})`);

      const reminders = await Reminder.find({ dayOfWeek: today }).populate(
        "userId",
        "name email",
      );

      if (reminders.length === 0) {
        console.log("No reminders scheduled for today");
        return;
      }

      console.log(`Found ${reminders.length} reminders for today`);

      // In production, send actual notifications here
      for (const reminder of reminders) {
        const user = reminder.userId as any;
        console.log(
          `[REMINDER] Would send to ${user.name} (${user.email}): ${reminder.notes || "Collection day reminder"}`,
        );

        // TODO: Implement actual email/push notification
        // await sendEmail(user.email, 'Waste Collection Reminder', reminder.notes);
        // await sendPushNotification(user.id, reminder.notes);
      }

      console.log("Reminder check completed");
    } catch (error) {
      console.error(`Error processing reminders: ${error}`);
    }
  });

  console.log("Reminder cron job started - runs daily at 8:00 AM");
};

const getDayName = (day: number): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
};
