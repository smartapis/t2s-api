import SessionModel, {
  SESSION_SCOPES,
} from "../datastore/models/Session.model";

export const checkSessionID = async (sessionId) => {
  if (!sessionId) return undefined;
  else {
    let sessionInfo = await SessionModel.scope(
      SESSION_SCOPES.VALID_ONLY
    ).findByPk(sessionId);
    if (sessionInfo) return sessionInfo.toJSON();
    else return undefined;
  }
};
