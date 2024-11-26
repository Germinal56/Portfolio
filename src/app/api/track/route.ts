import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/lib/models/User'; 
import dbConnect from '@/lib/dbConnect'; 

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure database connection

    const body = await req.json(); // Parse JSON body
    const { anonId, eventType, additionalData, ABLabel, timestamp } = body;

    if (!anonId || !eventType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Find or create the user
    let user = await UserModel.findOne({ anonId });
    if (!user) {
      user = new UserModel({ anonId, sessions: [] });
    }

    // Find or create a session within the last 30 minutes
    let session = user.sessions.find(
      (s: any) => !s.endTime || new Date().getTime() - new Date(s.endTime).getTime() < 30 * 60 * 1000
    );

    if (!session) {
      session = {
        sessionId: `session-${Date.now()}`,
        startTime: new Date(),
        endTime: null,
        interactions: [],
        pagesVisited: [],
        ABLabel,
      };
      user.sessions.push(session);
    }

    // Log interaction
    session.interactions.push({
      eventType,
      timestamp: new Date(timestamp),
      additionalData,
    });

    session.endTime = new Date(); // Update session end time
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
