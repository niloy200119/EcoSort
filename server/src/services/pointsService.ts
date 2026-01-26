import User, { IUser } from "../models/User";

export enum PointsAction {
  CREATE_REMINDER = 5,
  VIEW_LOCATION = 2,
  VIEW_WASTE_ITEM = 1,
  SCAN_ITEM = 10, 
}

class PointsService {
  async addPoints(userId: string, action: PointsAction): Promise<number> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $inc: { points: action } },
        { new: true },
      );

      if (!user) {
        throw new Error("User not found");
      }

      console.log(
        `Added ${action} points to user ${userId}. Total: ${user.points}`,
      );
      return user.points;
    } catch (error) {
      console.error(`Error adding points to user ${userId}: ${error}`);
      throw error;
    }
  }

  async getUserPoints(userId: string): Promise<number> {
    const user = await User.findById(userId);
    return user?.points || 0;
  }

  async getTopUsers(limit: number = 10): Promise<IUser[]> {
    const topUsers = await User.find()
      .sort({ points: -1 })
      .limit(limit)
      .select("name email points createdAt");

    return topUsers;
  }

  async resetUserPoints(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { points: 0 });
    console.log(`Reset points for user ${userId}`);
  }
}

export default new PointsService();
