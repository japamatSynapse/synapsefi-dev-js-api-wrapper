const { expect } = require('chai');

const testHelpersForSubnets = require('../testHelper/testHelpersForSubnets');

describe('get multiple subnets in one node', () => {
  it('returns acc and rout num', async () => {
    const { endUserApiWrapper } = await testHelpersForSubnets.createEndUserWithBaseDoc();
    const { node_id } = await testHelpersForSubnets.createDepositNode({ endUserApiWrapper });
    await testHelpersForSubnets.createSubnet({ endUserApiWrapper, node_id });
    await testHelpersForSubnets.createSubnet({ endUserApiWrapper, node_id });
    await testHelpersForSubnets.createSubnet({ endUserApiWrapper, node_id });

    const { data: dataFromGetSubnets } = await endUserApiWrapper
      .GET_SUBNETS({ node_id })
      .catch(error => {
        console.log('error: ', error.response.data.error.en);
      });

    const { subnets_count } = dataFromGetSubnets;
    expect(subnets_count).to.be.a('number');

    await testHelpersForSubnets.removeEndUser({ endUserApiWrapper });
  });
});
