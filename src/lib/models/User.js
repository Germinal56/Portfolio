import mongoose, { Schema, Document, Model } from 'mongoose';
import crypto from 'crypto';

const InteractionSchema = new Schema<Interaction>({
  eventType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  duration: { type: Number, default: 0 },
  additionalData: { type: Schema.Types.Mixed, default: {} },
});

const SessionSchema = new Schema<Session>({
  sessionId: { type: String, required: true, unique: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  interactions: [InteractionSchema],
  pagesVisited: { type: [String], default: [] },
  ABLabel: { type: String, default: 'control' },
  deviceType: { type: String },
  browser: { type: String },
  operatingSystem: { type: String },
  city: { type: String },
  region: { type: String },
  country: { type: String },
  referrer: { type: String },
  scrollDepth: { type: Number },
  timeOnPage: { type: Number },
  networkInfo: {
    connectionType: { type: String },
    downloadSpeed: { type: Number },
  },
});

const UserSchema = new Schema<User>({
  anonId: { type: String, required: true, unique: true },
  sessions: [SessionSchema],
});

// Pre-save hook for anonId
UserSchema.pre('save', function (next) {
  if (!this.isModified('anonId')) return next();

  const hash = crypto.createHash('sha256');
  const salt = process.env.SALT || 'default_salt';
  const dataToHash = `${this._id}${salt}`;
  this.anonId = hash.update(dataToHash).digest('hex');
  next();
});

const UserModel = mongoose.model<User>('User', UserSchema, 'Analytics');
export default UserModel;
