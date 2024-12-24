import { getGateway } from '../config/gateways';

export const resolveENS = (ensDomain) => {
  const gateway = getGateway();
  
  if (gateway.ENS === 'ens://') {
    return `ens://${ensDomain}`;
  }
  
  return `${gateway.ENS}/${ensDomain}`;
};
  