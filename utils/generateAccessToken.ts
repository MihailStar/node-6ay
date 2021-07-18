import jsonwebtoken from 'jsonwebtoken';

import config from '../config';

type AccessTokenPayload = { id: string; roles: string[] };

function generateAccessToken(
  id: AccessTokenPayload['id'],
  roles: AccessTokenPayload['roles']
): string {
  const payload = { id, roles };

  return jsonwebtoken.sign(payload, config.secret, { expiresIn: '30m' });
}

export { AccessTokenPayload };
export default generateAccessToken;
