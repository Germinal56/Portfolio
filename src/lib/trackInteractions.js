import UserModel from './models/User'; // Mongoose model

export const trackInteraction = async ({
  anonId,
  eventType,
  page,
  additionalData = {},
  country = 'n/a',
  ABLabel = 'control', // Default to 'control' if not provided
}) => {
  try {
    // Find user by anonId or create a new one
    let user = await UserModel.findOne({ anonId });
    if (!user) {
      user = new UserModel({ anonId, sessions: [] });
    }

    // Find or create a session within the last 30 minutes
    let session = user.sessions.find(
      (s) => !s.endTime || new Date().getTime() - new Date(s.endTime).getTime() < 30 * 60 * 1000
    );

    if (!session) {
      session = {
        sessionId: `session-${Date.now()}`,
        startTime: new Date(),
        endTime: null,
        interactions: [],
        pagesVisited: [],
        country,
        ABLabel,
        deviceType: additionalData.deviceType || 'unknown',
        browser: additionalData.browser || 'unknown',
        operatingSystem: additionalData.operatingSystem || 'unknown',
        referrer: additionalData.referrer || 'n/a',
        scrollDepth: additionalData.scrollDepth || 0,
        timeOnPage: additionalData.timeOnPage || 0,
      };
      user.sessions.push(session);
    }

    // Update session details
    session.pagesVisited = Array.from(new Set([...session.pagesVisited, page]));
    session.interactions.push({
      eventType,
      additionalData,
      timestamp: new Date(),
    });
    session.endTime = new Date(); // Update session end time to current

    // Save the updated user document
    await user.save();

    console.log(`Interaction logged: ${eventType}, AB Label: ${ABLabel}, for user: ${anonId}`);
  } catch (error) {
    console.error('Error logging interaction:', error);
  }
};
